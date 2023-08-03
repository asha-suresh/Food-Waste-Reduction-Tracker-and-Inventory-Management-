package com.fwrt.dashboard.controller;

import com.fwrt.dashboard.entity.Items;
import com.fwrt.dashboard.service.ShoppingBasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ShoppingBasketController {

    @Autowired
    ShoppingBasketService shoppingBasketService;
    public String createBucket(@RequestBody List<Items> items, @RequestParam Long Userid) {

        return null;
    }

    public String addItems(@RequestBody List<Items> items, @RequestParam Long Userid, @RequestParam Long bucket) {

        return null;
    }

    public String deleteBucket(@RequestParam Long Userid, @RequestParam Long bucketId) {

        return null;
    }

    public String removeItems(@RequestBody List<Items> items, @RequestParam Long Userid, @RequestParam Long bucket) {
        return null;
    }

    public String viewBasket( @RequestParam Long Userid, @RequestParam Long bucket) {
        return null;
    }

    public String updateItem(@RequestBody Items items, @RequestParam Long Userid, @RequestParam Long bucket, @RequestParam Long itemid ) {
        return null;
    }

}
