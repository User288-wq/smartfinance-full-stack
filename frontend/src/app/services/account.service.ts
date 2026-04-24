import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Account {
  id: number;
  accountNumber: string;
  client: { id: number; firstName: string; lastName: string };
  balance: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/accounts';
  constructor(private http: HttpClient) {}
  create(clientId: number, accountNumber?: string): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, { clientId, accountNumber });
  }
  getByClient(clientId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/client/${clientId}`);
  }
}
