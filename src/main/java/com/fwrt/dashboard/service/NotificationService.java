package com.fwrt.dashboard.service;

import com.fwrt.dashboard.dto.NotificationDto;
import com.fwrt.dashboard.entity.FoodItems;
import com.fwrt.dashboard.entity.Notifications;
import com.fwrt.dashboard.entity.User;
import com.fwrt.dashboard.repository.ItemRepository;
import com.fwrt.dashboard.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NotificationService {

    @Autowired
    UserService userService;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    ItemRepository foodItemRepository;



    public List<Notifications> viewAllNotifications(Long user_id){
        Optional<User> user = userService.retriveUserById(user_id);
        List<Notifications> notifications = user.get().getNotifications();

        // Sort the notifications list based on the createdDate in descending order
        Collections.sort(notifications, Comparator.comparing(Notifications::getCreatedDate).reversed());
        return notifications;
    }



    public List<NotificationDto> viewAllUnReadNotifications(Long user_id){
        Optional<User> user = userService.retriveUserById(user_id);
        List<NotificationDto> notificationsToDisplay = new ArrayList<>();
        if(user.get().getNotifications() != null) {
            for (Notifications notifications : user.get().getNotifications()) {
                if (notifications.getReadByUser() != true) {
                    NotificationDto notificationDto = new NotificationDto();
                    notificationDto.setImage("");
                    notificationDto.setMessage(notifications.getMessage());
                    notificationDto.setReceivedTime(notifications.getCreatedDate().toString());
                    notificationDto.setDetailPage("/cart");
                    notificationsToDisplay.add(notificationDto);
                }
            }
        }
        return notificationsToDisplay;
    }



    //when user reads a notification, then the notification status should be updated.
    public String updateReadStatus(Long user_id){
        Optional<User> user = userService.retriveUserById(user_id);
        if(user.get().getNotifications() != null) {
            for (Notifications notifications : user.get().getNotifications()) {
                if (notifications.getReadByUser() != true) {
                    notificationRepository.updateNotificationReadStatus(notifications.getId());
                }
            }
        }
        return "notification status updated";
    }


    public String updateNotificationsAndFoodStatus(Long userId){
        List<FoodItems> foodItemsList = foodItemRepository.listAllUnNotifiedFoodItems(userId);
        List<Notifications> notifications = updateFoodItems(foodItemsList);
        List<Notifications> updatedNotificationsWithId = new ArrayList<>();
        if(notifications.size() >0 && !notifications.isEmpty()){
            long notificationId = generateNotifcationId();
            for(Notifications notification : notifications){
                if(notification.getId() == null){
                    notification.setId(notificationId);
                    notificationId = notificationId+1;
                    updatedNotificationsWithId.add(notification);
                }
            }
            return userService.updateFoodItemsAndNotifications(userId,updatedNotificationsWithId);
        }
        return "status of foods are updated";
    }



    private List<Notifications> updateFoodItems(List<FoodItems> foods){
        List<Notifications> notifications = new ArrayList<>();
        for (FoodItems foodItem : foods){
            Notifications notification = updateFoodItemStatusAndGenerateNotifications(foodItem);
            if (notification != null){
                notifications.add(notification);
            }
        }
        return notifications;
    }


    private Notifications updateFoodItemStatusAndGenerateNotifications(FoodItems foodItem) {
        if (foodItem.getStatus() != "consumed" || foodItem.getStatus() != "expired") {
            if (foodItem.getExpiryDate().before(new Date())) {
                foodItem.setStatus("expired");
                foodItem.setExpiryNotified(true);
                foodItemRepository.save(foodItem);
                return generateExpiryDateWarningNotifications(foodItem,"expiry");
            } else if (foodItem.getQuantity() <= foodItem.getConsumedQuantity()) {
                foodItem.setStatus("consumed");
                foodItemRepository.save(foodItem);
            } else if (foodItem.getWarningDate().before(new Date()))  {
                foodItem.setStatus("warning");
                foodItem.setWarningNotified(true);
                foodItemRepository.save(foodItem);
                return generateExpiryDateWarningNotifications(foodItem,"warning");
            }
        }
        return null;
    }


    private Notifications generateExpiryDateWarningNotifications(FoodItems food, String notificationType){
        Notifications notification = new Notifications();
        if(notificationType == "expiry"){
            notification.setNotificationTitle("Expired");
            notification.setMessage("The Food item : "+ food.getFoodName() + " you bought or added on "+food.getUpdatedDate()+" is expired.");
            notification.setPriority("high");
            notification.setReadByUser(false);
        }
        if(notificationType == "warning"){
            notification.setNotificationTitle("Warning");
            notification.setMessage("The Food item : "+ food.getFoodName() + " you bought or added on "+food.getUpdatedDate()+" is expiring soon. Please use by before "+food.getExpiryDate());
            notification.setPriority("medium");
            notification.setReadByUser(false);
        }
        return notification;
    }


    private long generateNotifcationId(){
        return  notificationRepository.getAllNotificationsCount() +1;
    }

}
