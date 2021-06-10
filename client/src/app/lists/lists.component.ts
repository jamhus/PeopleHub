import { MemberService } from './../_services/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_modules/Pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;
  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService
      .getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.members = res.result;
        this.pagination = res.pagination;
    });
  }

  pageChanged(event:any) {
    this.pageNumber = event.page;
    this.loadLikes();
  }
}
