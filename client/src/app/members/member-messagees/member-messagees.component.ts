import { NgForm } from '@angular/forms';
import { MessageService } from './../../_services/message.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-member-messagees',
  templateUrl: './member-messagees.component.html',
  styleUrls: ['./member-messagees.component.css']
})
export class MemberMessageesComponent implements OnInit {
  @ViewChild("messageForm") messageForm: NgForm;
  @Input() messages: Message[];
  @Input() userName: string;
  messageContent: string;

  constructor(public messageService:MessageService) { }

  ngOnInit(): void {
  }

  sendMessage(){
    this.messageService.sendMessage(this.userName,this.messageContent).then(()=>{
      this.messageForm.reset();
    })
  }
}
