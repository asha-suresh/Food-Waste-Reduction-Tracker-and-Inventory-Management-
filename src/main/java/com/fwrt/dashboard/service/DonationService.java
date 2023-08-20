package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.DonationsResponseDTO;
import com.fwrt.dashboard.entity.Donations;
import com.fwrt.dashboard.entity.FoodItems;
import com.fwrt.dashboard.entity.User;
import com.fwrt.dashboard.repository.DonationsRepository;
import com.fwrt.dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DonationService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    DonationsRepository donationsRepository;

    @Autowired
    FoodProductService foodProductService;


    public String donateFood(Long food_id, Long user_id ) {
        Donations donation = new Donations();
        donation.setId(generateId());
        donation.setUserId(user_id);

        Optional<FoodItems> foodItem = foodProductService.donateFood(food_id);
        donation.setFoodName(foodItem.get().getFoodName());
        donation.setQuantity(foodItem.get().getQuantity() - foodItem.get().getConsumedQuantity());
        donation.setCategory(foodItem.get().getCategory());
        donation.setCreatedDate(foodItem.get().getCreatedDate());
        donation.setExpiryDate(foodItem.get().getExpiryDate());
        donation.setDonationActive(true);

        donationsRepository.save(donation);
        return "donated successfully";
    }

    public List<Donations> viewAllDonationsByUserID(Long user_id) {
        List<Donations> donations = donationsRepository.findDonationsByUserId(user_id);
        return donations;
    }

    public List<DonationsResponseDTO> viewAllActiveDonations() {
        List<Donations> donations = donationsRepository.findAll();

        List<DonationsResponseDTO> donationsResponseDTO = new ArrayList<>();
        for(Donations donation : donations){
            User userDetails = getUserDetails(donation.getUserId());
            DonationsResponseDTO responseDTO = new DonationsResponseDTO();
            responseDTO.setId(donation.getId());
            responseDTO.setFoodName(donation.getFoodName());
            responseDTO.setCategory(donation.getCategory());
            responseDTO.setQuantity(donation.getQuantity());
            responseDTO.setAddedOn(donation.getCreatedDate().toString());
            responseDTO.setExpiresAt(donation.getExpiryDate().toString());
            responseDTO.setUserId(donation.getUserId());
            responseDTO.setDonationActive(donation.getDonationActive());

            responseDTO.setUserName(userDetails.getUserName());
            responseDTO.setEmail(userDetails.getEmail());

            donationsResponseDTO.add(responseDTO);
        }
        return donationsResponseDTO;
    }


    private User getUserDetails(Long userId){
        Optional<User> user = userRepository.findById(userId);
        return user.get();
    }

    private long generateId(){
        return  donationsRepository.getDonationsCount() +1;
    }

}
