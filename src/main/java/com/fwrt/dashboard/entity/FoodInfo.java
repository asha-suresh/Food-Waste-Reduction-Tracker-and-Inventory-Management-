package com.fwrt.dashboard.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
@Data
@Entity(name="foodInfo")
public class FoodInfo {
    @Id
    @Column(name="id")
    private Long id;

    @Column(name="productName")
    private String productName;

    @Column(name="expiryDay")
    private int expiryDay;

    @Column(name="calorie")
    private int calorie;

    @Column(name="protein")
    private int protein;
}
