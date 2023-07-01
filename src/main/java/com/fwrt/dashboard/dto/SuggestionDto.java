package com.fwrt.dashboard.dto;

import lombok.Data;

@Data
public class SuggestionDto {
    private String productName;
    private int expiryDay;
    private int calorie;
    private int protein;
}

