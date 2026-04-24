import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService, Client } from '../../services/client.service';
import { AccountService, Account } from '../../services/account.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="accounts-container">
      <h1>Comptes bancaires</h1>
      <div class="form-row">
        <mat-form-field appearance="outline"><mat-label>Client</mat-label><mat-select [(ngModel)]="selectedClientId"><mat-option *ngFor="let client of clients" [value]="client.id">{{client.firstName}} {{client.lastName}}</mat-option></mat-select></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Numéro de compte (optionnel)</mat-label><input matInput [(ngModel)]="accountNumber"></mat-form-field>
        <button mat-raised-button color="primary" (click)="createAccount()">Créer un compte</button>
      </div>
      <mat-form-field appearance="outline" style="width:300px;"><mat-label>Filtrer par client</mat-label><mat-select [(ngModel)]="filterClientId"><mat-option [value]="0">Tous</mat-option><mat-option *ngFor="let client of clients" [value]="client.id">{{client.firstName}} {{client.lastName}}</mat-option></mat-select></mat-form-field>
      <table mat-table [dataSource]="filteredAccounts" class="mat-elevation-z8">
        <ng-container matColumnDef="accountNumber"><th mat-header-cell *matHeaderCellDef> Numéro </th><td mat-cell *matCellDef="let acc"> {{acc.accountNumber}} </td></ng-container>
        <ng-container matColumnDef="client"><th mat-header-cell *matHeaderCellDef> Client </th><td mat-cell *matCellDef="let acc"> {{acc.client.firstName}} {{acc.client.lastName}} </td></ng-container>
        <ng-container matColumnDef="balance"><th mat-header-cell *matHeaderCellDef> Solde </th><td mat-cell *matCellDef="let acc"> {{acc.balance | currency:'EUR'}} </td></ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: ['.accounts-container { padding: 20px; } .form-row { display: flex; gap: 10px; margin-bottom: 20px; align-items: center; }']
})
export class AccountsComponent implements OnInit {
  clients: Client[] = [];
  accounts: Account[] = [];
  selectedClientId = 0;
  accountNumber = '';
  filterClientId = 0;
  displayedColumns: string[] = ['accountNumber', 'client', 'balance'];

  constructor(private clientService: ClientService, private accountService: AccountService) {}

  ngOnInit() { this.clientService.getAll().subscribe(data => this.clients = data); }
  createAccount() { if (this.selectedClientId) this.accountService.create(this.selectedClientId, this.accountNumber).subscribe(() => { this.accountNumber = ''; this.loadAccounts(); }); }
  loadAccounts() { if (this.filterClientId) this.accountService.getByClient(this.filterClientId).subscribe(data => this.accounts = data); else this.accounts = []; }
  get filteredAccounts() { if (this.filterClientId === 0) return []; return this.accounts; }
}
