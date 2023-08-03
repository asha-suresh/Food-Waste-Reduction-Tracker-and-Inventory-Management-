package com.fwrt.dashboard.controller;

import com.fwrt.dashboard.dto.CollectionCreationRequest;
import com.fwrt.dashboard.dto.UserRegistrationDto;
import com.fwrt.dashboard.entity.Collections;
import com.fwrt.dashboard.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InventoryController {

    @Autowired
    InventoryService inventoryService;


    @PostMapping(value ="/api/new/collection")
    public Long createNewCollection(@RequestBody CollectionCreationRequest request, @RequestParam Long inventory_id) {
        return inventoryService.newFoodCollection(request.getCollectionName(),inventory_id);
    }

    @GetMapping(value ="/api/remove/collection")
    public String deleteCollectionByid( @RequestParam Long inventory_id, @RequestParam Long collection_id) {
        return inventoryService.deleteCollectionByid(inventory_id,collection_id);
    }

    @GetMapping(value ="/api/all/collections")
    public List<Collections> viewAllCollections(@RequestParam Long inventory_id) {
        return inventoryService.viewAllCollections(inventory_id);
    }
}
