import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { BitcoinService } from 'src/app/services/bitcoin.service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private bitcoinService: BitcoinService
  ) {}
  subscription!: Subscription;

  @Input() contactId: string;
  contact: Contact;
  rate: number;
  async ngOnInit() {
    const contact = await lastValueFrom(
      this.contactService.getContactById('5a566402abce24c6bfe4699d')
    );
    this.contact = contact;
    this.bitcoinService.getRate().subscribe((res) => {
      this.rate = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
