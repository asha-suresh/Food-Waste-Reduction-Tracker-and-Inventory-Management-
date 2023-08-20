package com.fwrt.dashboard.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class ProductCreationRequest {
    private String productName;
    private String category;
    private int quantity;
    private Date expiryDate;
}
