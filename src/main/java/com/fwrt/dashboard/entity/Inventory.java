package com.fwrt.dashboard.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import java.util.Date;
@Data
@Entity(name="inventory")
public class Inventory {
    @Id
    @Column(name="id")
    private Long id;

    @Column(name="userId")
    private Long userId;

    @Column(name="productName")
    private String productName;

    @Column(name="expiryDate")
    private Date expiryDate;

    @Column(name="warningDate")
    private Date warningDate;

    @Column(name="quatity")
    private int quatity;

    @Column(name="updatedDate")
    private Date updatedDate;

    @Column(name="createdDate")
    private Date createdDate;
}
