import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private userMsgService: UserMsgService
  ) {}

  contact: Contact;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ contact }) => {
      this.contact =
        contact || (this.contactService.getEmptyContact() as Contact);
    });
  }

  onSaveContact() {
    console.log('this.contact:', this.contact);
    this.contactService.saveContact(this.contact);
    this.router.navigateByUrl('/contact');
    this.contact._id
      ? this.userMsgService.setMsg(` ${this.contact.name} Saved!`)
      : this.userMsgService.setMsg(` ${this.contact.name} Added!`);
  }

  onDeleteContact(contactId: string) {
    this.contactService.deleteContact(contactId);
    this.router.navigateByUrl('/contact');
    this.userMsgService.setMsg(`contact ${contactId} removed!`);
  }
}
