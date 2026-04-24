package com.smartfinance.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class TransactionRequest {
    @NotNull
    private Long accountId;

    @NotNull
    @DecimalMin(value = "0.01")
    private BigDecimal amount;

    private String description;
}
