import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private contactService: ContactService) {}
  private KEY: string = 'LoggedInUser';
  public login(user: Contact) {
    const contactId = this.contactService.saveContact(user);
    contactId ? localStorage.setItem(this.KEY, contactId) : this.logout();
  }
  public logout() {
    localStorage.clear();
  }
  public checkLoggedIn() {
    return !!localStorage.getItem(this.KEY);
  }

  public getLoggedInUserId() {
    return localStorage.getItem(this.KEY);
  }
}
