package com.fwrt.dashboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.Date;
@Data
@Table(name="food_items")
@Entity
public class FoodItems {
    @Id
    @Column(name="id")
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;

    @Column(name="food_name")
    private String foodName;

    @Column(name="category")
    private String Category;

    @Temporal(TemporalType.DATE)
    @Column(name="expiry_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date expiryDate;

    @Temporal(TemporalType.DATE)
    @Column(name="warning_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date warningDate;

    @Column(name="quantity")
    private int quantity;

    @Column(name="consumed_quantity")
    private int consumedQuantity;

    @Temporal(TemporalType.DATE)
    @Column(name="updated_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date updatedDate = new Date(System.currentTimeMillis());

    @Temporal(TemporalType.DATE)
    @Column(name="created_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date createdDate = new Date(System.currentTimeMillis());

    @Column(name="user_id", nullable = false)
    private Long userId;

    @Column(name="status") // for showing expiry info , values are {safe,warning,expired}
    private String status;

    @Column(name = "is_warning_notified")
    private Boolean warningNotified;

    @Column(name = "is_expiry_notified")
    private Boolean expiryNotified;
}
