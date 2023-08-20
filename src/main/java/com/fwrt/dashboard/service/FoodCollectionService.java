package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.CategoryFoodItemCountDTO;
import com.fwrt.dashboard.dto.ProductCreationRequest;
import com.fwrt.dashboard.entity.FoodItems;
import com.fwrt.dashboard.entity.Collections;
import com.fwrt.dashboard.repository.CollectionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class FoodCollectionService {
    @Autowired
    CollectionsRepository collectionsRepository;

    @Autowired
    FoodProductService foodProductService;

    public Collections createNewCollection(String collectionName) {
        Collections collections = new Collections();
        collections.setId(getCollectionsCount());
        collections.setCollectionName(collectionName);
        collections.setCreatedDate(new Date());
        collections.setItems(null);
//        collectionsRepository.save(collections);
        return collections;
    }

    public String addFoodItemsToCollection(List<FoodItems> items, Long collection_id) {
        Optional <Collections> collections =collectionsRepository.findById(collection_id);
        if(collections!=null) {
            Set<FoodItems> foodItemsSet = collections.get().getItems();
            foodItemsSet.addAll(items);
            collections.get().setItems(foodItemsSet);
            collectionsRepository.save(collections.get());
            return "saved";
        }
        return "not saved";
    }

    public String addFoodItemsToExistingCollection(ProductCreationRequest request, Long collection_id, Long userId) {
        Optional <Collections> collections =collectionsRepository.findById(collection_id);
        if(collections!=null) {
            Set<FoodItems> foodItemsSet = collections.get().getItems();
            FoodItems foodItems = foodProductService.addProduct(request,userId);
            foodItemsSet.add(foodItems);
            collections.get().setItems(foodItemsSet);
            collectionsRepository.save(collections.get());
            return "saved";
        }
        return "not saved";
    }

    public String deletedFoodItems( Long collectionId) {
        Optional<Collections> foodCollection = collectionsRepository.findById(collectionId);
        List<FoodItems> foodItemsList = foodCollection.get().getItems().stream().toList();
        foodCollection.get().getItems().removeAll(foodItemsList);
        collectionsRepository.save(foodCollection.get());
        return foodProductService.removeItems(foodItemsList);
    }


    public Collections viewCollectionbyId(Long collection_id) {
        Optional <Collections> collections =collectionsRepository.findById(collection_id);
        return collections.get();
    }

    public String removeItemsfromCollections(Long foodItemId,Long collection_id) {
        Optional <Collections> collections =collectionsRepository.findById(collection_id);
        collections.get().getItems().remove(foodProductService.findFoodItemById(foodItemId));
        collectionsRepository.save(collections.get());
        return "food item removed successfully";
    }

    public CategoryFoodItemCountDTO getCategoryFoodItemCount(Long userId){
        return foodProductService.getCategoryFoodItemCount(userId);
    }

    public List<FoodItems> viewAllFoodItems(Long userId) {
        return foodProductService.viewAllFoodItems(userId);
    }


    private Long getCollectionsCount(){
        return collectionsRepository.getInventoryCollectionsCount() + 1;
    }
}
