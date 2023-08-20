package com.fwrt.dashboard.controller;

import com.fwrt.dashboard.dto.DonationsResponseDTO;
import com.fwrt.dashboard.entity.Donations;
import com.fwrt.dashboard.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DonationsController {

    @Autowired
    DonationService donationService;

    @GetMapping(value ="/api/donate/food")
    public String donateFood(@RequestParam Long food_id, @RequestParam Long user_id ) {
        return donationService.donateFood(food_id,user_id);
    }

    @GetMapping(value ="/api/view/donations")
    public List<Donations> viewAllDonationsByUserID(@RequestParam Long user_id) {
        return donationService.viewAllDonationsByUserID(user_id);
    }

    @GetMapping(value ="/api/view/all/donations")
    public List<DonationsResponseDTO> viewAllActiveDonations() {
        return donationService.viewAllActiveDonations();
    }
}
