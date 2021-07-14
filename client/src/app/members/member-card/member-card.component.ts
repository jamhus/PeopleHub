import { PresenceService } from './../../_services/presence.service';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from './../../_services/member.service';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  constructor(
    private membersService: MemberService,
    private toastr: ToastrService,
    public presence : PresenceService
  ) {}

  ngOnInit(): void {}

  addLike(member: Member) {
    this.membersService.addLike(member.userName).subscribe(() => {
      this.toastr.success(`You have liked ${member.knownAs}`);
    });
  }
}
