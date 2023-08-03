package com.fwrt.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Data
@Table(name="food_info")
@Entity
public class FoodInfo {
    @Id
    @Column(name="id")
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;

    @Column(name="food_name")
    private String foodName;

    @Column(name="expiry_day")
    private int expiryDay;

    @Column(name="category")
    private String Category;

    @Column(name="calorie")
    private int calorie;

    @Column(name="protein")
    private double protein;
}
