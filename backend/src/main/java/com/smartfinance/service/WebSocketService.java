package com.smartfinance.service;

import com.smartfinance.dto.TransactionNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {
    @Autowired private SimpMessagingTemplate messagingTemplate;
    public void sendTransactionNotification(TransactionNotification notification) {
        messagingTemplate.convertAndSend("/topic/transactions", notification);
    }
}
