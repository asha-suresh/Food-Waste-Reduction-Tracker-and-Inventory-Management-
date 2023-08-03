package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.ProductCreationRequest;
import com.fwrt.dashboard.entity.FoodItems;
import com.fwrt.dashboard.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class FoodProductService {
    @Autowired
    ItemRepository repository;

    public Optional<FoodItems> findFoodItemById(Long foodItemId )
        {
        return repository.findById(foodItemId);
        }

    public String updateItem(FoodItems foodItems, Long Userid, Long bucket, Long itemid ) {
        return null;
    }

    public String removeItems(List<FoodItems> items, Long Userid, Long bucket) {
        return null;
    }

    public FoodItems addProduct(ProductCreationRequest request){
        FoodItems foodItems = new FoodItems();
        foodItems.setFoodName(request.getProductName());
        foodItems.setCategory(request.getCategory());
        foodItems.setQuantity(request.getQuantity());
        foodItems.setExpiryDate(request.getExpiryDate());

        foodItems.setCreatedDate(new Date());
        foodItems.setUpdatedDate(new Date());
        foodItems.setWarningDate(getExpiydate(foodItems.getCreatedDate(), foodItems.getExpiryDate()));


//       repository.save(foodItems);
        return foodItems;
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
