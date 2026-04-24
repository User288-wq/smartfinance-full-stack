package com.smartfinance.controller;

import com.smartfinance.service.AccountService;
import com.smartfinance.service.ClientService;
import com.smartfinance.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.ByteArrayOutputStream;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:4200")
public class ReportController {
    @Autowired private ClientService clientService;
    @Autowired private AccountService accountService;
    @Autowired private TransactionService transactionService;

    @GetMapping("/clients/pdf")
    public ResponseEntity<byte[]> exportClientsPdf() {
        // Placeholder – tu devras implémenter PdfGenerator
        return ResponseEntity.ok().body("PDF généré".getBytes());
    }
    @GetMapping("/clients/excel")
    public ResponseEntity<byte[]> exportClientsExcel() {
        return ResponseEntity.ok().body("Excel généré".getBytes());
    }
}
