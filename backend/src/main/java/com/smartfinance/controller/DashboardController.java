package com.smartfinance.controller;

import com.smartfinance.dto.DashboardDTO;
import com.smartfinance.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {
    @Autowired private DashboardService dashboardService;
    @GetMapping public DashboardDTO getStats() { return dashboardService.getStats(); }
}
