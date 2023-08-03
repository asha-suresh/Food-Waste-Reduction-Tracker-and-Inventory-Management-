package com.fwrt.dashboard.service;

import com.fwrt.dashboard.entity.Notifications;
import com.fwrt.dashboard.entity.User;
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



    public List<Notifications> viewAllNotifications(Long user_id){
        Optional<User> user = userService.retriveUserById(user_id);
        List<Notifications> notifications = user.get().getNotifications();

        // Sort the notifications list based on the createdDate in descending order
        Collections.sort(notifications, Comparator.comparing(Notifications::getCreatedDate).reversed());
        return notifications;
    }



    public List<Notifications> viewAllUnReadNotifications(Long user_id){
        Optional<User> user = userService.retriveUserById(user_id);
        List<Notifications> notificationsList = new ArrayList<>();
        if(user.get().getNotifications() != null) {
            for (Notifications notifications : user.get().getNotifications()) {
                if (notifications.getReadByUser() != true) {
                    notificationsList.add(notifications);
                }
            }
        }
        return notificationsList;
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

    public String generateExpiryDateWarningNotifications(Long user_id){
        return null;
    }
}
