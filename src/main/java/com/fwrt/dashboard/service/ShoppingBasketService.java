package com.fwrt.dashboard.service;

import com.fwrt.dashboard.entity.Inventory;
import com.fwrt.dashboard.entity.Items;
import com.fwrt.dashboard.entity.ShoppingCart;
import com.fwrt.dashboard.repository.ShoppingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ShoppingBasketService {
    @Autowired
    ShoppingRepository shoppingRepository;

    @Autowired
    UserService userService;

    public String createBucket( List<Items> items, Long Userid) {

        Inventory inventory = userService.retriveInventoryByUserId(Userid);
        Set <ShoppingCart> shoppingCart = new  HashSet<>();
        ShoppingCart cart = new ShoppingCart();
        Set<Items> itemsSet = new HashSet<>();
        itemsSet.addAll(items);
       cart.setCreatedDate(new Date());
        cart.setItems(itemsSet);
        inventory.setCarts(shoppingCart);
        userService.saveInventory(inventory);
        return "saved";
    }

    public String addItems( List<Items> items,  Long Userid,  Long bucket_id) {
        Optional <ShoppingCart> shoppingCart=shoppingRepository.findById(bucket_id);
        if(shoppingCart!=null) {

            Set<Items> itemsSet = new HashSet<>();
            itemsSet.addAll(items);
            shoppingCart.get().setItems(itemsSet);
            shoppingRepository.save(shoppingCart.get());
            return "saved";
        }
        return "not saved";
    }

    public String deleteBucket( Long Userid, Long bucketId) {

        return null;
    }

    public String viewBasket(  Long Userid,  Long bucket) {
        return null;
    }

    public String removeItems(List<Items> items,  Long Userid, Long bucket) {
        return null;
    }

    public String updateItem( Items items, Long Userid, Long bucket,  Long itemid ) {
        return null;
    }






}
