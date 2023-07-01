package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.ExpirydateSuggestionRequest;
import com.fwrt.dashboard.entity.FoodInfo;
import com.fwrt.dashboard.repository.FoodInforepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ExpiryDateSuggestionService {

    @Autowired
    FoodInforepository foodInforepository;



    public LocalDate suggestExpiryDate(ExpirydateSuggestionRequest req){
        String productName = req.getProductName();
        String category = req.getCategory();
        FoodInfo foodInfo = foodInforepository.getFoodInfoByNameandCategory(productName,category);

        //from database we will get the count of expiry dates , we need to calculate into expiry date from that
        LocalDate currentDate = LocalDate.now();
        LocalDate expiryDate= currentDate.plusDays(foodInfo.getExpiryDay());

        return expiryDate;
    }

}
