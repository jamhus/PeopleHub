import { Member } from './../_models/member';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}users/`,httpOptions);
  }

  getMember(username: string) {
    return this.http.get<Member[]>(`${this.baseUrl}users/${username}`,httpOptions);
  }
}
