import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, delay } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';

@Injectable({
  providedIn: 'root',
})
export class ContactResolver implements Resolve<Contact> {
  constructor(private contactService: ContactService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Contact> {
    const contactId = route.params['id'];
    return this.contactService.getContactById(contactId).pipe(delay(100));
  }
}
