package com.fwrt.dashboard.controller;

import com.fwrt.dashboard.dto.CategoryFoodItemCountDTO;
import com.fwrt.dashboard.dto.ProductCreationRequest;
import com.fwrt.dashboard.entity.Collections;
import com.fwrt.dashboard.entity.FoodItems;
import com.fwrt.dashboard.service.FoodCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class FoodCollectionController {

    @Autowired
    FoodCollectionService foodCollectionService;


    @PostMapping(value ="/api/add/foods")   //Todo : need to test
    public String addFoodItemsToCollection(@RequestBody List<FoodItems> items, @RequestParam Long collection_id) {
        return foodCollectionService.addFoodItemsToCollection(items,collection_id);
    }

    @PostMapping(value ="/api/add/new/food")
    public String addFoodItemToExistingCollection(@RequestBody ProductCreationRequest request, @RequestParam Long collection_id, @RequestParam Long userId) {
        return foodCollectionService.addFoodItemsToExistingCollection(request,collection_id, userId);
    }


    @GetMapping(value ="/api/view/collection")
    public Collections viewCollectionById(@RequestParam Long collection_id) {
        return foodCollectionService.viewCollectionbyId(collection_id);
    }

    @GetMapping(value ="/api/remove/food/item")   //Todo: need to test
    public String removeItemsFromCollections(@RequestParam Long foodItemId, @RequestParam Long collectionId) {
        return foodCollectionService.removeItemsfromCollections(foodItemId,collectionId);
    }

    @GetMapping(value ="/api/view/all/foods")
    public List<FoodItems> viewAllFoodItems(@RequestParam Long userId) {
        return foodCollectionService.viewAllFoodItems(userId);
    }

    @GetMapping("/api/analytics/category")
    public CategoryFoodItemCountDTO getCategoryFoodItemCount(@RequestParam Long userId) {
        CategoryFoodItemCountDTO categoryFoodItemCountList = foodCollectionService.getCategoryFoodItemCount(userId);
        return categoryFoodItemCountList;
    }


}
