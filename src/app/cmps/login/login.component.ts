import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { UserMsgService } from 'src/app/services/user-msg.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  contact: Contact = new Contact();
  name: string;
  greet = 'Welcome to MrBitcoin';

  constructor(
    private userService: UserService,
    private router: Router,
    private userMsgService: UserMsgService
  ) {}

  ngOnInit(): void {
    console.log(this.userService.checkLoggedIn());
  }
  login() {
    const contact = { ...this.contact, name: this.name };
    if (!this.name) return;
    this.userService.login(contact);
    this.router.navigateByUrl('/');
  }
}
