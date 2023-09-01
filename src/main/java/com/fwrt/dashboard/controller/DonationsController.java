package com.fwrt.dashboard.controller;

import com.fwrt.dashboard.dto.UserContactDetails;
import com.fwrt.dashboard.entity.DonationStatus;
import com.fwrt.dashboard.entity.Donations;
import com.fwrt.dashboard.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class DonationsController {

    @Autowired
    DonationService donationService;

    @PostMapping(value ="/api/donate/food")
    public String donateFood(@RequestParam Long food_id, @RequestBody UserContactDetails userContactDetails) {
        return donationService.donateFood(food_id,userContactDetails);
    }

    @GetMapping(value ="/api/view/all/donations") //conditions are : all, user
    public List<Donations> viewAllDonationsBasedOnCondition(@RequestParam Long user_id, @RequestParam String filterCondition) {
        return donationService.viewAllDonationsByFilterCondition(user_id,filterCondition);
    }


    @GetMapping(value ="/api/accept/donation")
    public String donationAcceptRequest(@RequestParam Long userId, @RequestParam Long donationId ) {
        return donationService.createDonationAcceptRequest(userId,donationId);
    }

    @GetMapping(value ="/api/view/all/donation/status")
    public List<DonationStatus> viewAllDonationStatus(@RequestParam Long userId, @RequestParam String filterCondition) {
        return donationService.viewAlDonationStatus(userId,filterCondition);
    }

    //status values are requested,granted,collected,completed
    @GetMapping(value ="/api/update/donation/status")
    public String updateDonationStatus(@RequestParam Long donationId, @RequestParam String status) {
        return donationService.updateDonationStatus(donationId,status);
    }

    @GetMapping(value ="/api/get/donation/monthly/analytics")
    public List<Map<String, Object>> getDonationCountsForLastFiveMonths(@RequestParam Long userId) {
        return donationService.getDonationCountsForLastFiveMonths(userId);
    }

}
