package com.smartfinance.service;

import com.smartfinance.dto.DashboardDTO;
import com.smartfinance.repository.AccountRepository;
import com.smartfinance.repository.ClientRepository;
import com.smartfinance.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
public class DashboardService {
    @Autowired private ClientRepository clientRepository;
    @Autowired private AccountRepository accountRepository;
    @Autowired private TransactionRepository transactionRepository;

    public DashboardDTO getStats() {
        DashboardDTO dto = new DashboardDTO();
        dto.setTotalClients(clientRepository.count());
        dto.setTotalAccounts(accountRepository.count());
        LocalDateTime start = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime end = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);
        dto.setTotalDepositsToday(transactionRepository.findByTypeAndTransactionDateBetween("DEPOSIT", start, end)
                .stream().map(tx -> tx.getAmount()).reduce(BigDecimal.ZERO, BigDecimal::add));
        dto.setTotalWithdrawsToday(transactionRepository.findByTypeAndTransactionDateBetween("WITHDRAW", start, end)
                .stream().map(tx -> tx.getAmount()).reduce(BigDecimal.ZERO, BigDecimal::add));
        dto.setRecentTransactions(transactionRepository.findTop5ByOrderByTransactionDateDesc());
        return dto;
    }
}
