package com.fwrt.dashboard.entity;

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

    @Column(name="category")
    private String Category;

    @Column(name="food_name")
    private String foodName;

    @Column(name="expiry_date")
    private LocalDate expiryDate;

    @Column(name="warning_date")
    private LocalDate warningDate;

    @Column(name="quantity")
    private int quantity;

    @Column(name="updated_date")
    private Date updatedDate = new Date();

    @Column(name="created_date")
    private Date createdDate = new Date();
}
