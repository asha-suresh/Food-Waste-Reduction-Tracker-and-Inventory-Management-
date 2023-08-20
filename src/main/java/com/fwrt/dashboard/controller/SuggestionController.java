package com.fwrt.dashboard.controller;

import com.fwrt.dashboard.dto.FoodExpiryDateSuggestionResponseDTO;
import com.fwrt.dashboard.service.ExpiryDateSuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SuggestionController {
    @Autowired
    ExpiryDateSuggestionService expiryDateSuggestionService;

    @GetMapping(value ="/api/get/expiry/suggestion")
    public FoodExpiryDateSuggestionResponseDTO suggestExpiryDate(@RequestParam String foodName){
        return expiryDateSuggestionService.suggestExpiryDate(foodName);
    }


}
