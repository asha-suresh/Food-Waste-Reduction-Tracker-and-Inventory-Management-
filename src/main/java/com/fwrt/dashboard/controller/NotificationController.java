package com.fwrt.dashboard.controller;

import com.fwrt.dashboard.dto.NotificationDto;
import com.fwrt.dashboard.entity.Notifications;
import com.fwrt.dashboard.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
public class NotificationController {

    @Autowired
    NotificationService notificationService;


    @GetMapping(value ="/api/view/notifications")
    public List<Notifications> viewAllNotifications(@RequestParam(required = true) Long userId) {
        return notificationService.viewAllNotifications(userId);
    }


    @GetMapping(value ="/api/view/unread/notifications")
    public List<NotificationDto> viewAllUnReadNotifications(@RequestParam(required = true) Long userId) {
        return notificationService.viewAllUnReadNotifications(userId);
    }


    @GetMapping(value ="/api/update/notifications")
    public String updateNotificationReadStatus(@RequestParam(required = true) Long userId) {
        return notificationService.updateReadStatus(userId);
    }

    @GetMapping(value ="/api/update/all/foods")
    public String  updateAllFoodsAndNotifications(@RequestParam Long userId) {
        return notificationService.updateNotificationsAndFoodStatus(userId);
    }
}
