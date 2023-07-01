package com.fwrt.dashboard.controller;

import com.fwrt.dashboard.dto.ProductCreationRequest;
import com.fwrt.dashboard.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InventoryController {
    @Autowired
    InventoryService inventoryService;

    @PostMapping(value ="/api/add/product")
    public String addProduct(@RequestBody ProductCreationRequest request){
        return inventoryService.addProduct(request);
    }
}
