package com.smartfinance.repository;

import com.smartfinance.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByClientId(Long clientId);
    boolean existsByAccountNumber(String accountNumber);
}
