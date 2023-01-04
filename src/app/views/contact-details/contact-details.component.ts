import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private userMsgService: UserMsgService
  ) {}

  contact: Contact;

  subscription: Subscription;

  async ngOnInit() {
    this.subscription = this.route.data.subscribe((data) => {
      this.contact = data['contact'];
    });
  }

  onTransfer() {
    const id = this.contact._id;
    if (!id) return;
    this.contactService.getContactById(id).subscribe(({ moves }) => {
      this.contact.moves = moves;

      this.userMsgService.setMsg('Transfer Approved');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
