package com.fwrt.dashboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import java.util.Date;

@Data
@Table(name="donations")
@Entity
public class Donations {

    @Id
    @Column(name="id")
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;

    @Column(name="food_name")
    private String foodName;

    @Column(name="category")
    private String Category;

    @Column(name="quantity")
    private int quantity;

    @Temporal(TemporalType.DATE)
    @Column(name="expiry_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date expiryDate;

    @Temporal(TemporalType.DATE)
    @Column(name="created_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date createdDate = new Date(System.currentTimeMillis());

    @Column(name="user_id", nullable = false)
    private Long userId;

    @Column(name = "is_donation_active")
    private Boolean donationActive;

}
