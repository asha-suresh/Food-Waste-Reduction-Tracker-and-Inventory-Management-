package com.fwrt.dashboard.controller;

import com.fwrt.dashboard.dto.FoodExpiryDateSuggestionResponseDTO;
import com.fwrt.dashboard.entity.FoodInfo;
import com.fwrt.dashboard.service.ExpiryDateSuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class SuggestionController {
    @Autowired
    ExpiryDateSuggestionService expiryDateSuggestionService;

    @GetMapping(value ="/api/get/expiry/suggestion")
    public FoodExpiryDateSuggestionResponseDTO suggestExpiryDate(@RequestParam String foodName){
        return expiryDateSuggestionService.suggestExpiryDate(foodName);
    }

    @GetMapping(value ="/api/get/food/name/suggestion")
    public List<String> listAllFoodItemNameForSuggestion(){
        return expiryDateSuggestionService.listAllFoodNameForSuggestion();
    }

    //admin can view
    @GetMapping(value ="/api/get/all/food/suggestions")
    public List<FoodInfo> listAllFoodSuggestions(){
        return expiryDateSuggestionService.getAllFoodInfoList();
    }

    // admin can edit or add new FoodInfo using this api
    @PostMapping(value ="/api/add/food/suggestions")
    public String addOrUpdateFoodSuggestions(@RequestBody FoodInfo foodInfo, @RequestParam String action){
        return expiryDateSuggestionService.addOrUpdateFoodInfoDetails(foodInfo,action);
    }

    //admin can delete food suggestion using this api
    @GetMapping(value ="/api/delete/food/suggestions")
    public String deleteFoodSuggestion(@RequestParam Long foodInfoId){
        return expiryDateSuggestionService.remoteFoodInfoDetails(foodInfoId);
    }


}
