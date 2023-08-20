package com.fwrt.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;


@Data
public class FoodExpiryDateSuggestionResponseDTO {
    private String category;

    @JsonFormat(pattern="dd-MM-yyyy")
    private Date expiryDate;

    private int expiryDaysCount;

}
