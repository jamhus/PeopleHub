import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegisterInHome = new EventEmitter();
  model: any = {};

  constructor(
    private AccountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    this.AccountService.register(this.model).subscribe(
      (res) => {
        this.cancel();
      },
      (err) => {
        this.toastr.error(err.error);
        console.log(err);
      }
    );
  }

  cancel() {
    this.cancelRegisterInHome.emit(false);
  }
}
