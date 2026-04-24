package com.smartfinance.repository;

import com.smartfinance.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccountIdOrderByTransactionDateDesc(Long accountId);
    List<Transaction> findByTypeAndTransactionDateBetween(String type, LocalDateTime start, LocalDateTime end);
    List<Transaction> findTop5ByOrderByTransactionDateDesc();
}
