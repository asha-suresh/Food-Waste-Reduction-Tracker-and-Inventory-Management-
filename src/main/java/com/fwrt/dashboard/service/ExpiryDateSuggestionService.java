package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.FoodExpiryDateSuggestionResponseDTO;
import com.fwrt.dashboard.entity.FoodInfo;
import com.fwrt.dashboard.repository.FoodInforepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.desktop.OpenFilesEvent;
import java.time.LocalDate;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ExpiryDateSuggestionService {

    @Autowired
    FoodInforepository foodInforepository;



    public FoodExpiryDateSuggestionResponseDTO suggestExpiryDate(String req) {
        String productName = req.toLowerCase();
        FoodExpiryDateSuggestionResponseDTO responseDTO = new FoodExpiryDateSuggestionResponseDTO();
        try {
            FoodInfo foodInfo = foodInforepository.getFoodInfoByNameandCategory(productName);

            if (foodInfo != null) {
                //from Database we will get the count of expiry dates , we need to calculate into expiry date from that
                LocalDate currentDate = LocalDate.now();
                Date expiryDateResult = Date.valueOf(currentDate.plusDays(foodInfo.getExpiryDay()));

                responseDTO.setCategory(foodInfo.getCategory());
                responseDTO.setExpiryDate(expiryDateResult);
                responseDTO.setExpiryDaysCount(foodInfo.getExpiryDay());

                return responseDTO;
            }
        } catch (Exception e) {
            responseDTO = null;
        }
        return responseDTO;
    }

    public List<String> listAllFoodNameForSuggestion(){
        return foodInforepository.getAllFoodNamesForSuggestion();
    }

    public List<FoodInfo> getAllFoodInfoList(){
        return foodInforepository.findAll();
    }

    public String addOrUpdateFoodInfoDetails(FoodInfo foodInfo,String action){

        if(action.equals("new")){
            foodInforepository.save(foodInfo);
            return "food info added successfully";

        }

        foodInforepository.save(foodInfo);
        return "food info updated successfully";
    }

    public String remoteFoodInfoDetails(Long foodItemId){
        Optional<FoodInfo> foodInfoData = foodInforepository.findById(foodItemId);
        foodInforepository.delete(foodInfoData.get());
        return "food info updated successfully";
    }

}
