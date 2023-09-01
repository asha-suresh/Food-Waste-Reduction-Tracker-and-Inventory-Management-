package com.fwrt.dashboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;


@Data
@Table(name="users")
@Entity
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name="house_no")
    private String houseNo;

    @Column(name="street_or_city")
    private String streetOrCityName;

    @Column(name="pin_code")
    private String pinCode;

    @Column(name="user_role")
    private String userRole;

    @Temporal(TemporalType.DATE)
    @Column(name = "created_date")
    @JsonFormat(pattern="dd-MMM-yyyy")
    private Date createdDate = new Date(System.currentTimeMillis());

    @OneToOne
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;


    @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_notifications",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "notification_id")
    )
    private List<Notifications> notifications;

}
