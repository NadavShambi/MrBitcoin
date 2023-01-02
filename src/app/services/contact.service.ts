import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Contact, ContactFilter } from '../models/contact.model';

const CONTACTS = require('../data/contact.json');

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  //mock the server
  private _contactsDb: Contact[] = CONTACTS;

  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this._contacts$.asObservable();

  private _contactFilter$ = new BehaviorSubject<ContactFilter>({ term: '' });
  public contactFilter$ = this._contactFilter$.asObservable();

  constructor() {}

  public loadContacts(): void {
    const filterBy = this._contactFilter$.value;
    let contacts = this._contactsDb;
    if (filterBy && filterBy.term) {
      contacts = this._filter(contacts, filterBy.term);
    }
    this._contacts$.next(this._sort(contacts));
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
    this._contacts$.next(this._contactsDb);
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
    this._contacts$.next(this._sort(this._contactsDb));
  }

  private _addContact(contact: Contact) {
    //mock the server work
    const _id = getRandomId(6);
    const newContact = new Contact(
      _id,
      contact.name,
      contact.email,
      contact.phone
    );
    console.log('newContact:', newContact);
    if (typeof newContact.setId === 'function') newContact.setId(getRandomId());
    this._contactsDb.push(newContact);
    this._contacts$.next(this._sort(this._contactsDb));
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
