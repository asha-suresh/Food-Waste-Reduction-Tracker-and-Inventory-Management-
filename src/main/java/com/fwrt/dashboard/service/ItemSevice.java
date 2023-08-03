package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.ProductCreationRequest;
import com.fwrt.dashboard.entity.Items;
import com.fwrt.dashboard.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class ItemSevice {
    @Autowired
    ItemRepository repository;

    public String updateItem( Items items, Long Userid, Long bucket,  Long itemid ) {
        return null;
    }

    public String removeItems(List<Items> items, Long Userid, Long bucket) {
        return null;
    }

    public String addProduct(ProductCreationRequest request){
        Items items = new Items();
        items.setProductName(request.getProductName());
        items.setCategory(request.getCategory());
        items.setQuatity(request.getQuantity());
        items.setExpiryDate(request.getExpiryDate());

        items.setCreatedDate(new Date());
        items.setUpdatedDate(new Date());
        items.setWarningDate(getExpiydate(items.getCreatedDate(),items.getExpiryDate()));


       repository.save(items);
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
