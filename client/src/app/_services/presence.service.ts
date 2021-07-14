import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  hubUrl = environment.hubURl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr:ToastrService, private router:Router) { }

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder().withUrl(`${this.hubUrl}presence`,{
      accessTokenFactory: () => user.token
    }).withAutomaticReconnect().build();

    this.hubConnection.start().catch(error=> console.log(error));

    this.hubConnection.on('UserIsOnline',username=> {
      this.toastr.info(`${username} has connected`);
    });
    
    this.hubConnection.on('UserIsOffline',username=> {
      this.toastr.warning(`${username} has disconnected`);
    });

    this.hubConnection.on('GetOnlineUsers',usernames=> {
      this.onlineUsersSource.next(usernames);
    });

    this.hubConnection.on("NewMessageRecieved", sender => {
      this.toastr.info(`${sender.knownAs} has sent you a message!`)
      .onTap.pipe(take(1)).subscribe(()=> this.router.navigateByUrl(`/members/${sender.userName}?tab=3`));
    });
  }

  stopHubConnection(){
    this.hubConnection.stop().catch(error=> console.log(error));
  }
}
