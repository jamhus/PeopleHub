import { MessageService } from './../../_services/message.service';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-member-messagees',
  templateUrl: './member-messagees.component.html',
  styleUrls: ['./member-messagees.component.css']
})
export class MemberMessageesComponent implements OnInit {
  @Input() messages: Message[];
  
  constructor() { }

  ngOnInit(): void {
  }
}
