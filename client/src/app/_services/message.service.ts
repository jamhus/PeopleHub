import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getPaginatedResults, getPaginationHeaders } from './paginationHelper';
import { Message } from '../_models/message';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

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
}
