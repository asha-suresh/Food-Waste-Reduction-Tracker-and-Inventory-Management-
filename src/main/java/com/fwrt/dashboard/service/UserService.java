package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.UserLoginRequest;
import com.fwrt.dashboard.dto.UserLoginResponse;
import com.fwrt.dashboard.dto.UserRegistrationDto;
import com.fwrt.dashboard.entity.FoodItems;
import com.fwrt.dashboard.entity.Inventory;
import com.fwrt.dashboard.entity.Notifications;
import com.fwrt.dashboard.entity.User;
import com.fwrt.dashboard.repository.NotificationRepository;
import com.fwrt.dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    InventoryService inventoryService;


   public String createAccount(UserRegistrationDto request){
       User user = new User();
       user.setId(generateId());
       user.setUserName(request.getUserName());
       user.setEmail(request.getEmail());
       user.setPassword(request.getPassword());
       user.setCreatedDate(new Date());
       user.setInventory(inventoryService.createinventory(user));
       userRepository.save(user);
       return "success";
   }


   public Optional<User> retriveUserById(Long id){
       return userRepository.findById(id);
   }

    public UserLoginResponse retrieveUserByUserNameAndPassword(UserLoginRequest request){
        Optional<User> user = userRepository.findByUserNameAndPassword(request.getUserName(),request.getPassword());
        UserLoginResponse userLoginResponse = new UserLoginResponse();
        userLoginResponse.setUserId(user.get().getId());
        userLoginResponse.setUserName(user.get().getUserName());
        userLoginResponse.setInventoryId(user.get().getInventory().getId());
        return userLoginResponse;
    }


    public String updateFoodItemsAndNotifications(Long userId, List<Notifications> notifications) {
        Optional<User> user = retriveUserById(userId);
        user.get().getNotifications().addAll(notifications);
        userRepository.save(user.get());
        return "saved sucessfully";
    }


    public String saveInventory(Inventory request){
    inventoryService.saveInventory(request);
    return "saved sucessfully";
    }

    private long generateId(){
        return  userRepository.getAllUsersCount() +1;

    }


}
