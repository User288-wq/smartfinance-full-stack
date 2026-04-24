package com.smartfinance.controller;

import com.smartfinance.dto.CreateAccountRequest;
import com.smartfinance.entity.Account;
import com.smartfinance.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:4200")
public class AccountController {
    @Autowired private AccountService accountService;
    @PostMapping public Account create(@RequestBody CreateAccountRequest req) { return accountService.createAccount(req.getClientId(), req.getAccountNumber()); }
    @GetMapping("/client/{clientId}") public List<Account> getByClient(@PathVariable Long clientId) { return accountService.getAccountsByClient(clientId); }
}
