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

  constructor(private AccountService: AccountService) {}

  ngOnInit(): void {}

  register() {
    this.AccountService.register(this.model).subscribe(
      (res) => {
        this.cancel();
      },
      (err) => console.log(err)
    );
  }

  cancel() {
    this.cancelRegisterInHome.emit(false);
  }
}
