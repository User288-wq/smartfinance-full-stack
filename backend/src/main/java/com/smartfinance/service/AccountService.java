package com.smartfinance.service;

import com.smartfinance.entity.Account;
import com.smartfinance.entity.Client;
import com.smartfinance.repository.AccountRepository;
import com.smartfinance.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService {
    @Autowired private AccountRepository accountRepository;
    @Autowired private ClientRepository clientRepository;

    public Account createAccount(Long clientId, String accountNumber) {
        Client client = clientRepository.findById(clientId)
            .orElseThrow(() -> new RuntimeException("Client non trouvé"));
        String finalNumber = (accountNumber == null || accountNumber.isBlank())
            ? "ACC" + System.currentTimeMillis() : accountNumber;
        Account account = new Account();
        account.setClient(client);
        account.setAccountNumber(finalNumber);
        account.setBalance(BigDecimal.ZERO);
        return accountRepository.save(account);
    }
    public List<Account> getAccountsByClient(Long clientId) { return accountRepository.findByClientId(clientId); }
    public Account getAccountById(Long id) { return accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Compte non trouvé")); }
}
