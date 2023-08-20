package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.CategoryFoodItemCountDTO;
import com.fwrt.dashboard.dto.ProductCreationRequest;
import com.fwrt.dashboard.entity.FoodItems;
import com.fwrt.dashboard.entity.Notifications;
import com.fwrt.dashboard.repository.ItemRepository;
import com.fwrt.dashboard.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
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

    public Optional<FoodItems> donateFood(Long foodItemId ) {
        Optional<FoodItems> foodItem = repository.findById(foodItemId);
        foodItem.get().setStatus("donated");
        repository.save(foodItem.get());
        return foodItem;
    }


    public String removeItems(List<FoodItems> items) {
        for(FoodItems foodItem : items){
            repository.delete(foodItem);
        }
        return "deleted successfully";
    }

    public List<FoodItems> viewAllFoodItems(Long userId) {
        return repository.listAllFoodItems(userId);
    }

    public FoodItems addProduct(ProductCreationRequest request, Long Userid){
        FoodItems foodItems = new FoodItems();
        foodItems.setFoodName(request.getProductName());
        foodItems.setCategory(request.getCategory());
        foodItems.setQuantity(request.getQuantity());
        foodItems.setExpiryDate(request.getExpiryDate());
        foodItems.setUserId(Userid);
        foodItems.setStatus("safe");
        foodItems.setConsumedQuantity(0);
        foodItems.setExpiryNotified(false);
        foodItems.setWarningNotified(false);

        foodItems.setCreatedDate(new Date());
        foodItems.setUpdatedDate(new Date());
        foodItems.setWarningDate(setWarningDate(foodItems.getCreatedDate(), foodItems.getExpiryDate()));


//       repository.save(foodItems);
        return foodItems;
    }

    public CategoryFoodItemCountDTO getCategoryFoodItemCount(Long userId) {
        List<Object[]> results = repository.getCategoryFoodItemCountByUserId(userId);
        CategoryFoodItemCountDTO dto = new CategoryFoodItemCountDTO();

        for (Object[] result : results) {
            String category = (String) result[0];
            Long itemCount = (Long) result[1];

            switch (category) {
                case "fruits":
                    dto.setFruits(itemCount);
                    break;
                case "vegetables":
                    dto.setVegetables(itemCount);
                    break;
                case "cannedFoods":
                    dto.setCannedFoods(itemCount);
                    break;
                case "juices":
                    dto.setJuices(itemCount);
                    break;
                default:
                    dto.setOthers(itemCount);
            }
        }
        return dto;
    }


        public String updateFoodItem(FoodItems foodItems, Long quan, Long bucket, Long itemid ) {
        return null;
    }


    private Date setWarningDate(Date createdDate, Date expiryDate){

        LocalDate today = createdDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        long daysBetween = DAYS.between(today, expiryDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        Long warningDaycount = (daysBetween*80)/100;
        LocalDate currentDate = LocalDate.now();
        LocalDate warningDate= currentDate.plusDays(warningDaycount);
        return java.util.Date.from(warningDate.atStartOfDay()
                .atZone(ZoneId.systemDefault())
                .toInstant());
    }


}
