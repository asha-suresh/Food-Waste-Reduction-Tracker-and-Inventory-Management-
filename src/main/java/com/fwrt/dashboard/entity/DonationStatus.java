package com.fwrt.dashboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import java.util.Date;

@Data
@Table(name="donation_status")
@Entity
public class DonationStatus {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;

    @Column(name = "request_created_by")
    private Long requestCreatedUserID;

    @Temporal(TemporalType.DATE)
    @Column(name = "created_date")
    @JsonFormat(pattern="dd-MMM-yyyy")
    private Date createdDate = new Date(System.currentTimeMillis());

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "donation_id")
    private Donations donationData;

    @Column(name = "status")
    private String donationStatus;

}
