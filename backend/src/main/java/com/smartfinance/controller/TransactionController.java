package com.smartfinance.controller;

import com.smartfinance.dto.TransactionRequest;
import com.smartfinance.entity.Transaction;
import com.smartfinance.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {
    @Autowired private TransactionService transactionService;
    @PostMapping("/deposit") public Transaction deposit(@RequestBody TransactionRequest req) { return transactionService.deposit(req.getAccountId(), req.getAmount(), req.getDescription()); }
    @PostMapping("/withdraw") public Transaction withdraw(@RequestBody TransactionRequest req) { return transactionService.withdraw(req.getAccountId(), req.getAmount(), req.getDescription()); }
    @GetMapping("/account/{accountId}") public List<Transaction> history(@PathVariable Long accountId) { return transactionService.getHistory(accountId); }
}
