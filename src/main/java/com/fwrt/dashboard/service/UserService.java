package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.UserLoginRequest;
import com.fwrt.dashboard.dto.UserLoginResponse;
import com.fwrt.dashboard.dto.UserRegistrationDto;
import com.fwrt.dashboard.entity.Inventory;
import com.fwrt.dashboard.entity.User;
import com.fwrt.dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;


@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    InventoryService inventoryService;


    //crud
    //login logout
    //forget reset

   public String createAccount(UserRegistrationDto request){

       User user = new User();
       user.setId(generateId());
       user.setUserName(request.getUserName());
       user.setEmail(request.getEmail());
       user.setPassword(request.getPassword());
       user.setCreatedDate(new Date());
       user.setModifiedDate(new Date());
       user.setVerified(Boolean.TRUE);
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



    public Inventory retriveInventoryByUserId(Long id){
        Optional<User> user= retriveUserById(id);
        Inventory inventory = user.get().getInventory();
        return inventory;
    }


    public String saveInventory(Inventory request){
    inventoryService.saveInventory(request);
    return "saved sucessfully";
    }

    public long generateId(){
        return  userRepository.getAllUsersCount() +1;

    }



}
