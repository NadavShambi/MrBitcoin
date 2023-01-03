import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private bitcoinService: BitcoinService,
    private userService: UserService,
    private router: Router
  ) {}
  subscription!: Subscription;

  @Input() contactId: string;
  contact: Contact;
  rate: number;
  async ngOnInit() {
    const id = this.userService.getLoggedInUserId();

    this.contactService.getContactById(id as string).subscribe((contact) => {
      this.contact = contact;
    });

    this.bitcoinService.getRate().subscribe((res) => {
      this.rate = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }
}
