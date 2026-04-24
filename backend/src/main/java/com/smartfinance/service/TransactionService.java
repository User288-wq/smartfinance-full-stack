package com.smartfinance.service;

import com.smartfinance.entity.Account;
import com.smartfinance.entity.Transaction;
import com.smartfinance.repository.AccountRepository;
import com.smartfinance.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {
    @Autowired private TransactionRepository transactionRepository;
    @Autowired private AccountRepository accountRepository;

    @Transactional
    public Transaction deposit(Long accountId, BigDecimal amount, String description) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Compte non trouvé"));
        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);
        Transaction tx = new Transaction();
        tx.setAccount(account); tx.setAmount(amount); tx.setType("DEPOSIT"); tx.setDescription(description);
        return transactionRepository.save(tx);
    }

    @Transactional
    public Transaction withdraw(Long accountId, BigDecimal amount, String description) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Compte non trouvé"));
        if (account.getBalance().compareTo(amount) < 0) throw new RuntimeException("Solde insuffisant");
        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);
        Transaction tx = new Transaction();
        tx.setAccount(account); tx.setAmount(amount); tx.setType("WITHDRAW"); tx.setDescription(description);
        return transactionRepository.save(tx);
    }

    public List<Transaction> getHistory(Long accountId) {
        return transactionRepository.findByAccountIdOrderByTransactionDateDesc(accountId);
    }
}
