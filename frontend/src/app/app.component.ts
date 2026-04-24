import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <span>SmartFinance</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/dashboard" routerLinkActive="active">Dashboard</button>
      <button mat-button routerLink="/clients" routerLinkActive="active">Clients</button>
      <button mat-button routerLink="/accounts" routerLinkActive="active">Comptes</button>
      <button mat-button routerLink="/transactions" routerLinkActive="active">Transactions</button>
      <button mat-button (click)="logout()" *ngIf="authService.isLoggedIn()">Déconnexion</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`.spacer { flex: 1 1 auto; } .active { background-color: rgba(255,255,255,0.2); }`]
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  logout() { this.authService.logout(); window.location.href = '/login'; }
}
