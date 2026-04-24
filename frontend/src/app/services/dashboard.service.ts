import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './transaction.service';

export interface DashboardStats {
  totalClients: number;
  totalAccounts: number;
  totalDepositsToday: number;
  totalWithdrawsToday: number;
  recentTransactions: Transaction[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/dashboard';
  constructor(private http: HttpClient) {}
  getStats(): Observable<DashboardStats> { return this.http.get<DashboardStats>(this.apiUrl); }
}
