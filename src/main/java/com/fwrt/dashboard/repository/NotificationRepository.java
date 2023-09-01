package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.Notifications;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notifications, Long> {

    @Modifying
    @Transactional
    @Query(value = "update Notifications n set n.readByUser = true, n.alertShown = true where n.id = :notification_id")
    void updateNotificationReadStatus(@Param("notification_id") Long notification_id);


    @Modifying
    @Transactional
    @Query(value = "update Notifications n set n.alertShown = true where n.id = :notification_id")
    void updateNotificationAlertedStatus(@Param("notification_id") Long notification_id);


    @Query (value = "SELECT COUNT(*) as count FROM notifications", nativeQuery = true)
    Integer getAllNotificationsCount();

}

