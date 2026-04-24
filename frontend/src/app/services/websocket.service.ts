import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

export interface TransactionNotification {
  type: string;
  accountId: number;
  accountNumber: string;
  amount: number;
  clientName: string;
  timestamp: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private client: Client;
  private notificationSubject = new Subject<TransactionNotification>();

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      debug: (str) => console.log(str)
    });
  }

  connect(): void {
    this.client.activate();
    this.client.onConnect = () => {
      console.log('WebSocket connecté');
      this.client.subscribe('/topic/transactions', (message: Message) => {
        const notification: TransactionNotification = JSON.parse(message.body);
        this.notificationSubject.next(notification);
      });
    };
  }

  disconnect(): void { if (this.client.active) this.client.deactivate(); }
  getNotifications() { return this.notificationSubject.asObservable(); }
}
