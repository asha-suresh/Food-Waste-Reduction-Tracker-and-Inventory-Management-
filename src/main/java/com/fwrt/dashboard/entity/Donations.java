package com.fwrt.dashboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
    @JsonFormat(pattern="dd-MMM-yyyy")
    private Date expiryDate;

    @Temporal(TemporalType.DATE)
    @Column(name="created_date")
    @JsonFormat(pattern="dd-MMM-yyyy")
    private Date createdDate = new Date(System.currentTimeMillis());

    // user details for easy access of the donation created user
    @Column(name="user_id", nullable = false)
    private Long userId;

    @Column(name="username")
    private String userName;

    @Column(name="email")
    private String email;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name="house_no")
    private String houseNo;

    @Column(name="street_or_city")
    private String streetOrCityName;

    @Column(name="pin_code")
    private String pinCode;

    @Column(name = "is_donation_active")
    private Boolean donationActive;

    @Column(name = "acceptance_requested_users", length = 1000) // Adjust length as needed
    private String acceptanceRequestedUserIds; // Store serialized array as a string

    // Getter and Setter for useridsSerialized
    // Utility methods to convert List<Long> to string and vice versa
    public void setAcceptanceRequestedUserids(List<Long> userids) {
        // Convert the list to a comma-separated string
        this.acceptanceRequestedUserIds = userids.toString();
    }

    public List<Long> getAcceptanceRequestedUserids() {
        // Convert the string representation back to a List<Long>
        if(acceptanceRequestedUserIds == null){
            return new ArrayList<>();
        }
        String[] idStrings = acceptanceRequestedUserIds.replaceAll("\\[|\\]", "").split(", ");
        return Arrays.stream(idStrings).map(Long::parseLong).collect(Collectors.toList());
    }

}
