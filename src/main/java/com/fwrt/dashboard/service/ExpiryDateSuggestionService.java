package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.FoodExpiryDateSuggestionResponseDTO;
import com.fwrt.dashboard.entity.FoodInfo;
import com.fwrt.dashboard.repository.FoodInforepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.sql.Date;

@Service
public class ExpiryDateSuggestionService {

    @Autowired
    FoodInforepository foodInforepository;



    public FoodExpiryDateSuggestionResponseDTO suggestExpiryDate(String req){
        String productName = req.toLowerCase();
        FoodInfo foodInfo = foodInforepository.getFoodInfoByNameandCategory(productName);

        if(foodInfo != null){
            //from Database we will get the count of expiry dates , we need to calculate into expiry date from that
            LocalDate currentDate = LocalDate.now();
            Date expiryDateResult = Date.valueOf(currentDate.plusDays(foodInfo.getExpiryDay()));

            FoodExpiryDateSuggestionResponseDTO responseDTO = new FoodExpiryDateSuggestionResponseDTO();
            responseDTO.setCategory(foodInfo.getCategory());
            responseDTO.setExpiryDate(expiryDateResult);
            responseDTO.setExpiryDaysCount(foodInfo.getExpiryDay());

            return responseDTO;
        }
        return null;
    }

}
