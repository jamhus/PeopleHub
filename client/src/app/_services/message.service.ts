import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getPaginatedResults, getPaginationHeaders } from './paginationHelper';
import { Message } from '../_models/message';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubURl;
  private hubConnection: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message []>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private http: HttpClient) {}

  createHubConnection(user: User, otherUserName :string){
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(`${this.hubUrl}message?user=${otherUserName}`,{
      accessTokenFactory: () => user.token
    }).withAutomaticReconnect().build();
    this.hubConnection.start().catch(err=> console.log(err));

    this.hubConnection.on("RecieveMessageThread",thread=>{
      this.messageThreadSource.next(thread);
    })

    this.hubConnection.on("NewMessage",message=> {
      this.messageThread$.pipe(take(1)).subscribe(messages=> {
        this.messageThreadSource.next([...messages,message])
      })
    })
  }

  stopHubConnection(){
    if(this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  getMessages(pageNumber, pageSize, container) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);

    return getPaginatedResults<Message[]>(
      `${this.baseUrl}messages/`,
      params,
      this.http
    );
  }

  getMessageThread(recipient: string) {
    return this.http.get<Message[]>(`${this.baseUrl}messages/thread/${recipient}`);
  }

  async sendMessage(recipientUsername:string , content:string) {
    return this.hubConnection.invoke("SendMessage",{recipientUsername,content}).catch(error=> console.log(error));
  }

  deleteMessage(id:number){
    return this.http.delete(`${this.baseUrl}messages/${id}`);
  }
}
