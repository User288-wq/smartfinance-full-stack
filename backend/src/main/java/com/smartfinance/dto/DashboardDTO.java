package com.smartfinance.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import com.smartfinance.entity.Transaction;

@Data
public class DashboardDTO {
    private long totalClients;
    private long totalAccounts;
    private BigDecimal totalDepositsToday;
    private BigDecimal totalWithdrawsToday;
    private List<Transaction> recentTransactions;
}
