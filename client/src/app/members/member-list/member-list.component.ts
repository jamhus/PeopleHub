import { MemberService } from './../../_services/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  listOfMembers: Member[];
  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.getListOfMembers();
  }

  getListOfMembers() {
    this.memberService
      .getMembers()
      .subscribe((members) => (this.listOfMembers = members));
  }
}
