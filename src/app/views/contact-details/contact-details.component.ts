import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  contact: Contact;
  neighbors: string[];

  subscription: Subscription;

  async ngOnInit() {
    this.subscription = this.route.data.subscribe((data) => {
      this.contact = data['contact'];
      console.log(data);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
