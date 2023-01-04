import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'contact-index',
  templateUrl: './contact-index.component.html',
  styleUrls: ['./contact-index.component.scss'],
})
export class ContactIndexComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private userMsgService: UserMsgService
  ) {}

  contacts$: Observable<Contact[]>;
  subscription!: Subscription;

  ngOnInit(): void {
    this.contactService.loadContacts();
    this.contacts$ = this.contactService.contacts$;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onDeleteContact(contactId: string) {
    this.contactService.deleteContact(contactId);
    this.userMsgService.setMsg(`contact removed!`);
  }
}
