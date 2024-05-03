import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { IContact } from '../models/interfaces/contact.interface';

@Injectable()
export class ContactService {

  private readonly BASE_URL = 'http://localhost:5278/api';
  private httpClient = inject(HttpClient);

  getContacts(): Observable<IContact[]> {
    return this.httpClient.get<IContact[]>(`${this.BASE_URL}/contacts`);
  }

  addContact(data: IContact): Observable<IContact> {
    return this.httpClient.post<IContact>(`${this.BASE_URL}/addContact`, data);
  }

  deletContact(id: string): Observable<IContact> {
    return this.httpClient.delete<IContact>(`${this.BASE_URL}/deleteContact/${id}`);
  }

  updateContact(id: string, contact: IContact): Observable<IContact> {
    return this.httpClient.put<IContact>(`${this.BASE_URL}/updateContact/${id}`, contact);
  }
}
