import { UserParams } from './../_models/userParams';
import { PaginatedResult } from './../_modules/Pagination';
import { map } from 'rxjs/operators';
import { Member } from './../_models/member';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers(userParams:UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params.append('minAge', userParams.minAge.toString());
    params.append('maxAge', userParams.maxAge.toString());
    params.append('gender', userParams.gender);

    return this.getPaginatedResults<Member[]>(`${this.baseUrl}users/`,params);
  }

  private getPaginatedResults<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber : number, PageSize :number){
    let params = new HttpParams();
      params = params.append('pageNumber',pageNumber.toString());
      params = params.append('pageSize', PageSize.toString());
      return params;
  }

  getMember(username: string) {
    const member = this.members.find((x) => x.userName === username);
    if (member !== undefined) {
      return of(member);
    }
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseUrl}users`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(`${this.baseUrl}users/set-main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(`${this.baseUrl}users/delete-photo/${photoId}`, {});
  }
}
