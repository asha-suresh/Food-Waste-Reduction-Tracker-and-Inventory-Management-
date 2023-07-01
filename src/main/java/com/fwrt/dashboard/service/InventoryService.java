package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.ProductCreationRequest;
import com.fwrt.dashboard.entity.Inventory;
import com.fwrt.dashboard.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class InventoryService {
    @Autowired
    InventoryRepository repository;


    public String addProduct(ProductCreationRequest request){
        Inventory inventory = new Inventory();
        inventory.setProductName(request.getProductName());
        inventory.setCategory(request.getCategory());
        inventory.setQuatity(request.getQuantity());
        inventory.setExpiryDate(request.getExpiryDate());

        inventory.setCreatedDate(new Date());
        inventory.setUpdatedDate(new Date());
        inventory.setWarningDate(getExpiydate(inventory.getCreatedDate(),inventory.getExpiryDate()));

        //todo:user id is to be fetched later
        inventory.setUserId(null);

       repository.save(inventory);
        return null;
    }
    private LocalDate getExpiydate(Date createdDate, LocalDate expiryDate){

        LocalDate today = createdDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        long daysBetween = DAYS.between(today, expiryDate);
        Long warningDaycount = (daysBetween*80)/100;
        LocalDate currentDate = LocalDate.now();
        LocalDate warningDate= currentDate.plusDays(warningDaycount);
        return warningDate;
    }
}
