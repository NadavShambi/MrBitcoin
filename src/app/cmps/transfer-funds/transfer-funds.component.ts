import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  @Output() onTransfer = new EventEmitter();
  user: Contact;
  amount: number;

  constructor(
    private userService: UserService,
    private contactService: ContactService,
    private utilService: UtilsService,
    private router: Router,
    private cd: ChangeDetectorRef
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
      moves: [transfer, ...moves],
    };
    const contact = {
      ...this.contact,
      coins: this.contact.coins + amount,
      moves: [transfer, ...this.contact.moves],
    };

    this.contactService.saveContact(user);
    this.contactService.saveContact(contact);
    // TODO:FIX IT
    this.onTransfer.emit();
    this.amount = NaN;
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
