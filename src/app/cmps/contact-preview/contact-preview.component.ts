import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent {
  @Input() contact!: Contact
  @Output() onDelete = new EventEmitter<string>()



  onDeleteContactId(ev: MouseEvent): void {
    ev.stopPropagation()
    this.onDelete.emit(this.contact._id)
  }

}
