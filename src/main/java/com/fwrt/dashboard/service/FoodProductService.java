package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.CategoryFoodItemCountDTO;
import com.fwrt.dashboard.dto.InventoryAnalyticsDTO;
import com.fwrt.dashboard.dto.ProductCreationRequest;
import com.fwrt.dashboard.dto.StatusCountDTO;
import com.fwrt.dashboard.entity.FoodItems;
import com.fwrt.dashboard.entity.Notifications;
import com.fwrt.dashboard.repository.ItemRepository;
import com.fwrt.dashboard.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

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

    public String saveFoodItem(FoodItems foodItem){
        repository.save(foodItem);
        return "saved successfully";
    }


    public String removeItems(List<FoodItems> items) {
        for(FoodItems foodItem : items){
            repository.delete(foodItem);
        }
        return "deleted successfully";
    }

    public String removeItem(Long foodItemId) {
        repository.deleteById(foodItemId);
        return "deleted successfully";
    }

    public List<FoodItems> viewAllFoodItems(Long userId, String searchFilter,String tableFilter) {
        if(searchFilter !=null){
            return repository.listAllFoodItemsFilterByName(userId,searchFilter);
        }
        if(tableFilter != null){
            if(tableFilter.equals("all")){
                return repository.listAllFoodItems(userId);
            }
            else {
                return repository.listAllFoodItemsFilterByTableFilter(userId,tableFilter);
            }
        }
        return repository.listAllFoodItems(userId);
    }

    public FoodItems addOrEditProduct(ProductCreationRequest request, Long Userid, Long foodId){
        FoodItems foodItems = new FoodItems();

        if(foodId != null){
            foodItems = repository.findById(foodId).get();
        }

        foodItems.setFoodName(request.getProductName());
        foodItems.setCategory(request.getCategory());
        foodItems.setQuantity(request.getQuantity());

        if(Userid != null){
            if(request.getExpiryDate() != null){
                foodItems.setExpiryDate(request.getExpiryDate());
            }
            foodItems.setStatus("safe");
            foodItems.setExpiryNotified(false);
            foodItems.setWarningNotified(false);
            foodItems.setUserId(Userid);
            foodItems.setConsumedQuantity(0);
            foodItems.setCreatedDate(new Date());
            foodItems.setUpdatedDate(new Date());
            foodItems.setWarningDate(setWarningDate(foodItems.getCreatedDate(), foodItems.getExpiryDate()));
        }

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
                case "Fruit":
                    dto.setFruits(itemCount);
                    break;
                case "Vegetable":
                    dto.setVegetables(itemCount);
                    break;
                case "Canned Food":
                    dto.setCannedFoods(itemCount);
                    break;
                case "Juice":
                    dto.setJuices(itemCount);
                    break;
                case "Snack":
                    dto.setSnacks(itemCount);
                    break;
                default:
                    dto.setOthers(itemCount);
            }
        }
        return dto;
    }

    public StatusCountDTO getCountByStatus(Long userId) {
        List<Object[]> results = repository.getStatusCounts(userId);

        StatusCountDTO statusCountDTO = new StatusCountDTO();
        if (!results.isEmpty()) {
            Object[] result = results.get(0);
            statusCountDTO.setSafeFoodCount((Long) result[0]);
            statusCountDTO.setDonatedCount((Long) result[1]);
            statusCountDTO.setConsumedCount((Long) result[2]);
            statusCountDTO.setExpiredCount((Long) result[3]);
            statusCountDTO.setWarningCount((Long) result[4]);
        }

        return statusCountDTO;

    }

    public String consumeFood(Long foodId) {
        Optional<FoodItems> item = repository.findById(foodId);
        item.get().setStatus("consumed");
        item.get().setUpdatedDate(new Date(System.currentTimeMillis()));
        repository.save(item.get());
        return "food consumed";
    }

    public InventoryAnalyticsDTO generateFoodItemsCountAnalytics(Long userId){
        List<FoodItems> foodItemsList = repository.listAllFoodItems(userId);
        InventoryAnalyticsDTO inventoryAnalyticsDTO = new InventoryAnalyticsDTO();
        inventoryAnalyticsDTO.setCountOfFoods((long) foodItemsList.size());

        Long totalFoodItemsCount = 0l;
        for(FoodItems foodItem: foodItemsList){
            totalFoodItemsCount = totalFoodItemsCount + (foodItem.getQuantity()-foodItem.getConsumedQuantity());
        }
        inventoryAnalyticsDTO.setCountOfTotalFoodItems(totalFoodItemsCount);
        return inventoryAnalyticsDTO;
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



    //data for dashboard chart
    public List<Map<String, Object>> getDonationCountsForLastFourMonths(Long userId) {
        List<Map<String, Object>> foodCounts = new ArrayList<>();

        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMMM-yyyy");

        for (int i = 0; i < 4; i++) {
            LocalDate startDate = currentDate.minusMonths(i).withDayOfMonth(1);
            LocalDate endDate = startDate.plusMonths(1).minusDays(1);

            String monthLabel = startDate.format(monthFormatter);
            long donatedFoodCount = repository.countFoodItemsAnalyticWithinDateRange(startDate, endDate, userId,"donated");
            long consumedFoodCount = repository.countFoodItemsAnalyticWithinDateRange(startDate, endDate, userId,"consumed");
            long expiredFoodCount = repository.countFoodItemsAnalyticWithinDateRange(startDate, endDate,userId, "expired");

            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", monthLabel);
            monthData.put("donatedFoodCount", donatedFoodCount+consumedFoodCount);
            monthData.put("expiredFoodCount", expiredFoodCount);
            foodCounts.add(monthData);
        }
        java.util.Collections.reverse(foodCounts); // Reverse the list

        return foodCounts;
    }



}
