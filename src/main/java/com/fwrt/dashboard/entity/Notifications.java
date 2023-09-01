package com.fwrt.dashboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @Temporal(TemporalType.DATE)
    @Column(name = "created_date")
    @JsonFormat(pattern="dd-MMM-yyyy")
    private Date createdDate = new Date(System.currentTimeMillis());

    @Column(name = "priority")
    private String priority;

    @Column(name = "seen_by_user")
    private Boolean readByUser;

    @Column(name = "alert_shown")
    private Boolean alertShown;
}
