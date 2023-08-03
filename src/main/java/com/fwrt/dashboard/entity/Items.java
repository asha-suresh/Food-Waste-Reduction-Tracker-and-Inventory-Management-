package com.fwrt.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.Date;
@Data
@Table(name="items")
@Entity
public class Items {
    @Id
    @Column(name="id")
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;

    @Column(name="category")
    private String Category;

    @Column(name="productName")
    private String productName;

    @Column(name="expiryDate")
    private LocalDate expiryDate;

    @Column(name="warningDate")
    private LocalDate warningDate;

    @Column(name="quatity")
    private int quatity;

    @Column(name="updatedDate")
    private Date updatedDate;

    @Column(name="createdDate")
    private Date createdDate;
}
