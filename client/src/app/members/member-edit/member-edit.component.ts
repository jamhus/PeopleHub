import { MemberService } from './../../_services/member.service';
import { AccountService } from './../../_services/account.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  // access the browser before refresh and close
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService:AccountService,
    private memberService: MemberService,
    private toastr: ToastrService
    ) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=> this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember () {
    this.memberService.getMember(this.user.username).subscribe(member=> this.member = member);
  }

  updateMember(){
    console.log(this.member)
    this.toastr.success('profile updated successfully')
    this.editForm.reset(this.member);
  }
}
