package com.smartfinance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class TransactionNotification {
    private String type;
    private Long accountId;
    private String accountNumber;
    private BigDecimal amount;
    private String clientName;
    private LocalDateTime timestamp;
    private String message;
}
