import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AccountService, Account } from '../../services/account.service';
import { TransactionService, Transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule],
  template: `
    <div class="transactions-container">
      <h1>Opérations sur comptes</h1>
      <div class="form-row">
        <mat-form-field appearance="outline"><mat-label>Compte</mat-label><mat-select [(ngModel)]="selectedAccountId"><mat-option *ngFor="let acc of accounts" [value]="acc.id">{{acc.accountNumber}} ({{acc.client.firstName}} {{acc.client.lastName}}) - Solde: {{acc.balance}} €</mat-option></mat-select></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Montant</mat-label><input matInput type="number" [(ngModel)]="amount"></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Description</mat-label><input matInput [(ngModel)]="description"></mat-form-field>
        <button mat-raised-button color="primary" (click)="deposit()">Dépôt</button>
        <button mat-raised-button color="warn" (click)="withdraw()">Retrait</button>
      </div>
      <div *ngIf="selectedAccountId">
        <h2>Historique du compte</h2>
        <table mat-table [dataSource]="history" class="mat-elevation-z8">
          <ng-container matColumnDef="date"><th mat-header-cell *matHeaderCellDef> Date </th><td mat-cell *matCellDef="let tx"> {{tx.transactionDate | date:'short'}} </td></ng-container>
          <ng-container matColumnDef="type"><th mat-header-cell *matHeaderCellDef> Type </th><td mat-cell *matCellDef="let tx"> {{tx.type}} </td></ng-container>
          <ng-container matColumnDef="amount"><th mat-header-cell *matHeaderCellDef> Montant </th><td mat-cell *matCellDef="let tx"> {{tx.amount | currency:'EUR'}} </td></ng-container>
          <ng-container matColumnDef="description"><th mat-header-cell *matHeaderCellDef> Description </th><td mat-cell *matCellDef="let tx"> {{tx.description}} </td></ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: ['.transactions-container { padding: 20px; } .form-row { display: flex; gap: 10px; margin-bottom: 20px; align-items: center; flex-wrap: wrap; }']
})
export class TransactionsComponent implements OnInit {
  accounts: Account[] = [];
  selectedAccountId = 0;
  amount = 0;
  description = '';
  history: Transaction[] = [];
  displayedColumns: string[] = ['date', 'type', 'amount', 'description'];

  constructor(private accountService: AccountService, private transactionService: TransactionService) {}

  ngOnInit() { this.loadAccounts(); }
  loadAccounts() { this.accountService.getByClient(0).subscribe(data => this.accounts = data); } // need all accounts endpoint
  deposit() { if (this.selectedAccountId && this.amount > 0) this.transactionService.deposit(this.selectedAccountId, this.amount, this.description).subscribe(() => this.refreshHistory()); }
  withdraw() { if (this.selectedAccountId && this.amount > 0) this.transactionService.withdraw(this.selectedAccountId, this.amount, this.description).subscribe(() => this.refreshHistory()); }
  refreshHistory() { if (this.selectedAccountId) this.transactionService.getHistory(this.selectedAccountId).subscribe(data => this.history = data); }
}
