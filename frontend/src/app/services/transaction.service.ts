import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  id: number;
  accountId: number;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAW';
  description: string;
  transactionDate: string;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/transactions';
  constructor(private http: HttpClient) {}
  deposit(accountId: number, amount: number, description: string): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/deposit`, { accountId, amount, description });
  }
  withdraw(accountId: number, amount: number, description: string): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/withdraw`, { accountId, amount, description });
  }
  getHistory(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/account/${accountId}`);
  }
}
