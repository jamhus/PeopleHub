import { AccountService } from './../../_services/account.service';
import { UserParams } from './../../_models/userParams';
import { Observable } from 'rxjs';
import { MemberService } from './../../_services/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_modules/Pagination';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user:User;
  constructor(private memberService: MemberService, private accoutService:AccountService) {
    this.accoutService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.userParams).subscribe(response=> {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }
}
