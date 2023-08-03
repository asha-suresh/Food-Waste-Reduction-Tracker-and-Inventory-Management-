package com.fwrt.dashboard.dto;

import lombok.Data;

import java.time.LocalDate;
@Data
public class ProductCreationRequest {
    private String productName;
    private String category;
    private int quantity;
    private LocalDate expiryDate;
}
