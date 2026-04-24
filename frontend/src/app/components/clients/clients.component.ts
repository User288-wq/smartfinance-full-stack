import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService, Client } from '../../services/client.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="clients-container">
      <h1>Gestion des clients</h1>
      <div class="form-row">
        <mat-form-field appearance="outline"><mat-label>Prénom</mat-label><input matInput [(ngModel)]="newClient.firstName"></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Nom</mat-label><input matInput [(ngModel)]="newClient.lastName"></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Email</mat-label><input matInput [(ngModel)]="newClient.email"></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Téléphone</mat-label><input matInput [(ngModel)]="newClient.phone"></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Adresse</mat-label><input matInput [(ngModel)]="newClient.address"></mat-form-field>
        <button mat-raised-button color="primary" (click)="addClient()">Ajouter</button>
      </div>
      <table mat-table [dataSource]="clients" class="mat-elevation-z8">
        <ng-container matColumnDef="id"><th mat-header-cell *matHeaderCellDef> ID </th><td mat-cell *matCellDef="let c"> {{c.id}} </td></ng-container>
        <ng-container matColumnDef="firstName"><th mat-header-cell *matHeaderCellDef> Prénom </th><td mat-cell *matCellDef="let c"> {{c.firstName}} </td></ng-container>
        <ng-container matColumnDef="lastName"><th mat-header-cell *matHeaderCellDef> Nom </th><td mat-cell *matCellDef="let c"> {{c.lastName}} </td></ng-container>
        <ng-container matColumnDef="email"><th mat-header-cell *matHeaderCellDef> Email </th><td mat-cell *matCellDef="let c"> {{c.email}} </td></ng-container>
        <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef> Actions </th><td mat-cell *matCellDef="let c"><button mat-icon-button color="warn" (click)="deleteClient(c.id!)"><mat-icon>delete</mat-icon></button></td></ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .clients-container { padding: 20px; }
    .form-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 20px; }
    mat-form-field { width: 180px; }
    table { width: 100%; }
  `]
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  newClient: Client = { firstName: '', lastName: '', email: '', phone: '', address: '' };
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];

  constructor(private clientService: ClientService) {}

  ngOnInit() { this.loadClients(); }
  loadClients() { this.clientService.getAll().subscribe(data => this.clients = data); }
  addClient() { this.clientService.create(this.newClient).subscribe(() => { this.loadClients(); this.newClient = { firstName: '', lastName: '', email: '', phone: '', address: '' }; }); }
  deleteClient(id: number) { if (confirm('Supprimer ce client ?')) this.clientService.delete(id).subscribe(() => this.loadClients()); }
}
