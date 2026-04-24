package com.smartfinance.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateAccountRequest {
    @NotNull
    private Long clientId;
    private String accountNumber;
}
