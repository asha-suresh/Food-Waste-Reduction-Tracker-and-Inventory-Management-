package com.fwrt.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import java.util.Date;

@Data
@Table(name="notifications")
@Entity
public class Notifications {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;
    @Column(name = "notification_title")
    private String notificationTitle;
    @Column(name = "message")
    private String message;
    @Column(name = "created_date")
    private Date createdDate;
    @Column(name = "priority")
    private String priority;
    @Column(name = "seen_by_user")
    private Boolean readByUser;
}
