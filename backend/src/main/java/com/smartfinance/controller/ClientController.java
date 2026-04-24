package com.smartfinance.controller;

import com.smartfinance.entity.Client;
import com.smartfinance.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {
    @Autowired private ClientService clientService;
    @GetMapping public List<Client> getAll() { return clientService.getAllClients(); }
    @PostMapping @PreAuthorize("hasRole('ADMIN')") public Client create(@RequestBody Client client) { return clientService.saveClient(client); }
    @DeleteMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<?> delete(@PathVariable Long id) { clientService.deleteClient(id); return ResponseEntity.ok().build(); }
}
