package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.InventoryAnalyticsDTO;
import com.fwrt.dashboard.entity.*;
import com.fwrt.dashboard.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class InventoryService {

    @Autowired
    InventoryRepository inventoryRepository;

    @Autowired
    FoodCollectionService foodCollectionService;


    public Inventory createinventory(User user){
        Inventory inventory = new Inventory();
        inventory.setId(generateId());
        inventoryRepository.save(inventory);
        return inventory;
    }

    public Long newFoodCollection(String collectionName,Long inventoryId){
        Optional<Inventory> inventory = inventoryRepository.findById(inventoryId);
        Collections newCollection = foodCollectionService.createNewCollection(collectionName);
        inventory.get().getCollections().add(newCollection);
        inventoryRepository.save(inventory.get());
        return newCollection.getId();
    }


    public String deleteCollectionByid( Long inventoryId, Long collection_id) {
        Optional<Inventory> inventory = inventoryRepository.findById(inventoryId);
        Collections collection =foodCollectionService.viewCollectionbyId(collection_id);
        foodCollectionService.deletedFoodItems(collection.getId());
        inventory.get().getCollections().remove(collection);
        inventoryRepository.save(inventory.get());
        return "Collection deleted successfully";
    }

    public List<Collections> viewAllCollections( Long inventoryId) {
        Optional<Inventory> inventory = inventoryRepository.findById(inventoryId);
        List<Collections> collections = inventory.get().getCollections();
        return collections;
    }

    public InventoryAnalyticsDTO getInventoryAnalytics(Long userId,Long inventoryId) {
        Optional<Inventory> inventory = inventoryRepository.findById(inventoryId);
        InventoryAnalyticsDTO inventoryAnalyticsDTO = foodCollectionService.generateAnalytics(userId);
        inventoryAnalyticsDTO.setCountOfTotalCollections((long) inventory.get().getCollections().size());
        return inventoryAnalyticsDTO;
    }


    private long generateId(){
        return  inventoryRepository.getInventoryCount() +1;

    }
    public String saveInventory(Inventory request){
        inventoryRepository.save(request);
        return "saved successfully";
    }
}
