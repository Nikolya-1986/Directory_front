import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { IContact } from './models/interfaces/contact.interface';
import { ContactService } from './services/contact.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ContactService],
})
export class AppComponent {
  title = 'Directory';
  isEdit = false;
  contactId: string | any;
  contacts$ = this.getContacts();
  contactsForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    isFavorite: new FormControl<boolean>(false),
  })
  private destroyRef = inject(DestroyRef);

  constructor(
    private contactService: ContactService,
  ) {}

  onFormSubmit(): void {
    const newContact = this.contactsForm.getRawValue() as unknown as IContact;
    if (this.isEdit) {
      this.contactService.updateContact(this.contactId, newContact).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (value) => {
          this.contacts$ = this.getContacts();
          this.isEdit = false;
          this.contactsForm.reset();
        }
      })
    } else {
      this.contactService.addContact(newContact).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (value) => {
          console.log(value);
          this.contacts$ = this.getContacts();
          this.contactsForm.reset();
        }
      })
    }
  }

  deleteContact(id: string | any): void {
    this.contactService.deletContact(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => {
        this.contacts$ = this.getContacts();
      }
    })
  }

  editContact(contact: IContact): void {
    this.isEdit = true;
    this.contactId = contact.id;
    this.contactsForm.patchValue({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      isFavorite: contact.isFavorite,
    })
  }

  private getContacts(): Observable<IContact[]> {
    return this.contactService.getContacts();
  }
}
