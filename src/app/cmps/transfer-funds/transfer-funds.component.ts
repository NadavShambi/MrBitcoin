import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { Transfer } from 'src/app/models/transfer';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss'],
})
export class TransferFundsComponent implements OnInit {
  @Input() contact: Contact;
  user: Contact;
  amount!: number;

  constructor(
    private userService: UserService,
    private contactService: ContactService,
    private utilService: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.userService.getLoggedInUserId();
    if (!id) return;
    this.contactService.getContactById(id).subscribe((user) => {
      this.user = user;
    });
  }

  onSubmit() {
    const amount = this.amount;
    const { coins, moves } = this.user;
    if (amount <= 0 || isNaN(amount)) return;

    if (coins < amount) {
      console.log('ya poor');
      return;
    }
    const transfer = this.getTransfer();
    const user = {
      ...this.user,
      coins: coins - amount,
      moves: [...moves, transfer],
    };
    const contact = {
      ...this.contact,
      coins: this.contact.coins + amount,
      moves: [...this.contact.moves, transfer],
    };

    this.contactService.saveContact(user);
    this.contactService.saveContact(contact);
    this.amount = NaN;
    // TODO:FIX IT
    // this.router.navigateByUrl(`/contact`);
  }

  getTransfer() {
    return new Transfer(
      this.amount,
      this.user.name,
      this.contact.name,
      this.utilService.getRandomId()
    );
  }
}
