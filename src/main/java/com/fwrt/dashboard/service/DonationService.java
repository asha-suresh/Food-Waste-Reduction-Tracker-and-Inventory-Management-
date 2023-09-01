package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.UserContactDetails;
import com.fwrt.dashboard.dto.YourDonationAnalyticsDto;
import com.fwrt.dashboard.entity.DonationStatus;
import com.fwrt.dashboard.entity.Donations;
import com.fwrt.dashboard.entity.FoodItems;
import com.fwrt.dashboard.entity.User;
import com.fwrt.dashboard.repository.DonationStatusRepository;
import com.fwrt.dashboard.repository.DonationsRepository;
import com.fwrt.dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class DonationService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    DonationsRepository donationsRepository;

    @Autowired
    FoodProductService foodProductService;

    @Autowired
    DonationStatusRepository donationStatusRepository;

    @Autowired
    NotificationService notificationService;


    public String donateFood(Long food_id, UserContactDetails userContactDetails ) {
        Donations donation = new Donations();
        //basic details
        donation.setId(generateId());
        donation.setDonationActive(true);

        //food details
        Optional<FoodItems> foodItem = foodProductService.donateFood(food_id);
        donation.setFoodName(foodItem.get().getFoodName());
        donation.setQuantity(foodItem.get().getQuantity() - foodItem.get().getConsumedQuantity());
        donation.setCategory(foodItem.get().getCategory());
        donation.setCreatedDate(foodItem.get().getCreatedDate());
        donation.setExpiryDate(foodItem.get().getExpiryDate());

        //address and contact
        donation.setUserId(userContactDetails.getUserId());
        donation.setPhoneNo(userContactDetails.getPhoneNo());
        donation.setHouseNo(userContactDetails.getHouseNo());
        donation.setStreetOrCityName(userContactDetails.getStreetOrCityName());
        donation.setPinCode(userContactDetails.getPinCode());

        // user details
        Optional<User> user = userRepository.findById(userContactDetails.getUserId());
        donation.setUserName(user.get().getUserName());
        donation.setEmail(user.get().getEmail());

        //update user address
        if(userContactDetails.getUpdateRequired()){
            user.get().setHouseNo(userContactDetails.getHouseNo());
            user.get().setStreetOrCityName(userContactDetails.getStreetOrCityName());
            user.get().setPinCode(userContactDetails.getPinCode());
            user.get().setPhoneNo(userContactDetails.getPhoneNo());
            userRepository.save(user.get());
        }


        donationsRepository.save(donation);
        return "donated successfully";
    }

    public List<Donations> viewAllDonationsByFilterCondition(Long user_id, String filterCondition) {
        List<Donations> donations;

        if(filterCondition.equals("user")) {
            donations = donationsRepository.findDonationsByUserId(user_id);
        } else {
            donations = donationsRepository.findAllActiveDonations(user_id);
        }
        Collections.reverse(donations); // Reverse the list

        return donations;
    }


    public List<Map<String, Object>> getDonationCountsForLastFiveMonths(Long userId) {
        List<Map<String, Object>> donationCounts = new ArrayList<>();

        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMMM-yyyy");

        for (int i = 0; i < 4; i++) {
            LocalDate startDate = currentDate.minusMonths(i).withDayOfMonth(1);
            LocalDate endDate = startDate.plusMonths(1).minusDays(1);

            String monthLabel = startDate.format(monthFormatter);
            long activeCount = donationsRepository.countDonationsWithinDateRange(startDate, endDate, userId,true);
            long inactiveCount = donationsRepository.countDonationsWithinDateRange(startDate, endDate,userId, false);

            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", monthLabel);
            monthData.put("activeDonation", activeCount);
            monthData.put("inactive", inactiveCount);
            donationCounts.add(monthData);
        }
        Collections.reverse(donationCounts); // Reverse the list

        return donationCounts;
    }



        public String createDonationAcceptRequest(Long userId, Long donationId){
            Donations donation = donationsRepository.findById(donationId).get();
            List<Long> acceptanceRequestedUsers = donation.getAcceptanceRequestedUserids();
            boolean userExists = acceptanceRequestedUsers.contains(userId);
            if (!userExists) {
                //we need to update if user is not sent request for acceptance of donations.
                acceptanceRequestedUsers.add(userId);
                donation.setAcceptanceRequestedUserids(acceptanceRequestedUsers);
                donationsRepository.save(donation);

                DonationStatus donationStatus = new DonationStatus();
                donationStatus.setRequestCreatedUserID(userId);
                donationStatus.setDonationStatus("requested");
                donationStatus.setDonationData(donationsRepository.findById(donationId).get());
                donationStatusRepository.save(donationStatus);
                generateNotificationsForDonationStatusUpdate(userId,"requested",donationStatus.getDonationData());
                return "donation request created successfully";
            }
            return "user already requested";
    }

    public List<DonationStatus> viewAlDonationStatus(Long userId,String filterCondition){
        if(filterCondition.equals("completed")){
            return donationStatusRepository.findCompletedDonationStatusByUserId(userId);
        }
        return donationStatusRepository.findDonationStatusByUserId(userId);

    }

    public String updateDonationStatus(Long donationStatusId, String status){
        DonationStatus donationStatus = donationStatusRepository.findById(donationStatusId).get();
        donationStatus.setDonationStatus(status);
        donationStatusRepository.save(donationStatus);
        if (status.equals("completed")) {
            Optional<Donations> donation = donationsRepository.findById(donationStatus.getDonationData().getId());
            donation.get().setDonationActive(false);
        }
        generateNotificationsForDonationStatusUpdate(donationStatus.getRequestCreatedUserID(),status,donationStatus.getDonationData());
        return "status updated successfully";
    }

    private void generateNotificationsForDonationStatusUpdate(Long userId, String status,Donations donations){
        String message = null;
        if (status.equals("requested")) {
            message = "Hey, The user is requested for accepting your donation of"+ donations.getFoodName();
            notificationService.createNewNotification(donations.getUserId(),message,"high","Action Required");
        } else if (status.equals("granted")) {
            message = "Hey, Your request for accepting" +donations.getQuantity()+donations.getFoodName()+ " is granted. Please collect";
            notificationService.createNewNotification(userId,message,"high","Action Required");
        } else if (status.equals("collected")) {
            message = "Hey, Donation of"+donations.getQuantity()+donations.getFoodName()+ "has been completed.. Please mark as completed";
            notificationService.createNewNotification(donations.getUserId(),message,"high","Action Required");
        } else if (status.equals("completed")) {
            message = "Hey, Donation of"+donations.getQuantity()+donations.getFoodName()+ "has been completed. Thankyou !!";
            notificationService.createNewNotification(donations.getUserId(),message,"medium","Donation Completed");
            notificationService.createNewNotification(userId,message,"medium","Donation Completed");
        }
    }


    private User getUserDetails(Long userId){
        Optional<User> user = userRepository.findById(userId);
        return user.get();
    }

    private long generateId(){
        return  donationsRepository.getDonationsCount() +1;
    }

}
