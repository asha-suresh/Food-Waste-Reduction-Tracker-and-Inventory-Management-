package com.fwrt.dashboard.controller;

import com.fwrt.dashboard.dto.ExpirydateSuggestionRequest;
import com.fwrt.dashboard.dto.SuggestionDto;
import com.fwrt.dashboard.service.ExpiryDateSuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
public class SuggestionController {
    @Autowired
    ExpiryDateSuggestionService expiryDateSuggestionService;

    @GetMapping(value="/api/get/suggestion/list")
    public SuggestionDto getFoodInfo(){

        return null; //list all suggestion


    }
    @PostMapping(value ="/api/get/suggestion/expirydate")
    public LocalDate suggestExpiryDate( @RequestBody ExpirydateSuggestionRequest  request){

        return expiryDateSuggestionService.suggestExpiryDate(request);
    }




}
