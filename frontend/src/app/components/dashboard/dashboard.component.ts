import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DashboardService, DashboardStats } from '../../services/dashboard.service';
import { WebSocketService } from '../../services/websocket.service';
import { Chart } from 'chart.js/auto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  template: `
    <div class="dashboard-container">
      <h1>Tableau de bord</h1>
      <div class="stats-cards">
        <mat-card><mat-card-title>Clients</mat-card-title><mat-card-content>{{ stats?.totalClients }}</mat-card-content></mat-card>
        <mat-card><mat-card-title>Comptes</mat-card-title><mat-card-content>{{ stats?.totalAccounts }}</mat-card-content></mat-card>
        <mat-card><mat-card-title>Dépôts aujourd'hui</mat-card-title><mat-card-content>{{ stats?.totalDepositsToday | currency:'EUR' }}</mat-card-content></mat-card>
        <mat-card><mat-card-title>Retraits aujourd'hui</mat-card-title><mat-card-content>{{ stats?.totalWithdrawsToday | currency:'EUR' }}</mat-card-content></mat-card>
      </div>
      <canvas id="dailyChart" width="400" height="200"></canvas>
      <h2>Dernières transactions</h2>
      <table mat-table [dataSource]="stats?.recentTransactions || []" class="mat-elevation-z8">
        <ng-container matColumnDef="date"><th mat-header-cell *matHeaderCellDef> Date </th><td mat-cell *matCellDef="let tx"> {{ tx.transactionDate | date:'short' }} </td></ng-container>
        <ng-container matColumnDef="type"><th mat-header-cell *matHeaderCellDef> Type </th><td mat-cell *matCellDef="let tx"> {{ tx.type }} </td></ng-container>
        <ng-container matColumnDef="amount"><th mat-header-cell *matHeaderCellDef> Montant </th><td mat-cell *matCellDef="let tx"> {{ tx.amount | currency:'EUR' }} </td></ng-container>
        <ng-container matColumnDef="description"><th mat-header-cell *matHeaderCellDef> Description </th><td mat-cell *matCellDef="let tx"> {{ tx.description }} </td></ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 20px; }
    .stats-cards { display: flex; gap: 20px; margin-bottom: 30px; flex-wrap: wrap; }
    mat-card { flex: 1; min-width: 150px; text-align: center; }
    canvas { max-width: 100%; margin-bottom: 30px; }
    table { width: 100%; }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats?: DashboardStats;
  displayedColumns: string[] = ['date', 'type', 'amount', 'description'];
  private wsSubscription?: Subscription;

  constructor(private dashboardService: DashboardService, private wsService: WebSocketService) {}

  ngOnInit() {
    this.loadStats();
    this.wsService.connect();
    this.wsSubscription = this.wsService.getNotifications().subscribe(notif => {
      console.log('Notification reçue:', notif);
      this.loadStats(); // recharge les stats pour mettre à jour le dashboard
    });
  }

  loadStats() {
    this.dashboardService.getStats().subscribe(data => {
      this.stats = data;
      this.createChart();
    });
  }

  createChart() {
    if (!this.stats) return;
    const ctx = document.getElementById('dailyChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: { labels: ['Dépôts', 'Retraits'], datasets: [{ label: 'Montants du jour (€)', data: [this.stats.totalDepositsToday, this.stats.totalWithdrawsToday], backgroundColor: ['#4caf50', '#f44336'] }] }
      });
    }
  }

  ngOnDestroy() {
    this.wsService.disconnect();
    this.wsSubscription?.unsubscribe();
  }
}
