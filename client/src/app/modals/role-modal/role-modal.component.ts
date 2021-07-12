import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css'],
})
export class RoleModalComponent implements OnInit {
  constructor(public bsModalRef: BsModalRef) {}
  title: string;
  list: any;
  closeBtnName: string;
  ngOnInit(): void {}
}
