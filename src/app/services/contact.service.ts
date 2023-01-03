import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Contact, ContactFilter } from '../models/contact.model';

const CONTACTS = require('../data/contact.json');

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  //mock the server
  private KEY: string = 'ContactDb';
  private _contactsDb: Contact[] = this._loadFromStorage() || CONTACTS;

  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this._contacts$.asObservable();

  private _contactFilter$ = new BehaviorSubject<ContactFilter>({ term: '' });
  public contactFilter$ = this._contactFilter$.asObservable();

  public loadContacts(): void {
    const filterBy = this._contactFilter$.value;

    let contacts = this._contactsDb;
    if (filterBy && filterBy.term) {
      contacts = this._filter(contacts, filterBy.term);
    }
    this._contacts$.next(this._sort(this._filterLoggedin(contacts)));
  }

  public getEmptyContact() {
    return { name: '', coins: 100, email: '', phone: '', moves: [] };
  }

  public getContactById(id: string): Observable<Contact> {
    //mock the server work
    const contact = this._contactsDb.find((contact) => contact._id === id);

    //return an observable
    return contact
      ? of(contact)
      : throwError(() => `Contact id ${id} not found!`);
  }

  public deleteContact(id: string) {
    //mock the server work
    this._contactsDb = this._contactsDb.filter((contact) => contact._id !== id);
    // change the observable data in the service - let all the subscribers know

    if (this._contactsDb.length <= 1) {
      this._contactsDb = CONTACTS;
      this._saveToStorage();
      this._contacts$.next(this._filterLoggedin(this._contactsDb));
      return;
    }
    this._contacts$.next(this._filterLoggedin(this._contactsDb));
    this._saveToStorage();
  }

  public saveContact(contact: Contact) {
    return contact._id
      ? this._updateContact(contact)
      : this._addContact(contact);
  }

  public setFilter(contactFilter: ContactFilter) {
    this._contactFilter$.next(contactFilter);
    this.loadContacts();
  }

  private _updateContact(contact: Contact) {
    //mock the server work
    this._contactsDb = this._contactsDb.map((c) =>
      contact._id === c._id ? contact : c
    );
    // change the observable data in the service - let all the subscribers know
    this._contacts$.next(this._sort(this._filterLoggedin(this._contactsDb)));
    this._saveToStorage();

    return contact._id;
  }

  private _addContact(contact: Contact) {
    //mock the server work
    const _id = '';
    const newContact = new Contact(
      _id,
      contact.name,
      contact.email,
      contact.phone
    );
    if (typeof newContact.setId === 'function') newContact.setId(getRandomId());
    this._contactsDb.push(newContact);
    this._contacts$.next(this._sort(this._contactsDb));
    this._saveToStorage();

    return newContact._id;
  }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    });
  }

  private _filter(contacts: Contact[], term: string) {
    term = term.toLocaleLowerCase();
    return contacts.filter((contact) => {
      return (
        contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term)
      );
    });
  }

  private _filterLoggedin(contacts: Contact[]) {
    const contactId = localStorage.getItem('LoggedInUser') || '';
    return contacts.filter((contact) => contact._id !== contactId);
  }
  private _saveToStorage() {
    localStorage.setItem(this.KEY, JSON.stringify(this._contactsDb));
  }
  private _loadFromStorage() {
    const val = localStorage.getItem(this.KEY);
    return val ? JSON.parse(val) : null;
  }
}

function getRandomId(length = 8): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
