package com.fwrt.dashboard.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Table(name="collections")
@Entity
public class Collections {
    @Id
    @Column(name="id")
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;

    @Column(name = "collection_name")
    private String collectionName;

    @Temporal(TemporalType.DATE)
    @Column(name = "updated_date")
    @JsonFormat(pattern="dd-MMM-yyyy")
    private Date updatedDate = new Date(System.currentTimeMillis());

    @Temporal(TemporalType.DATE)
    @Column(name = "created_date")
    @JsonFormat(pattern="dd-MMM-yyyy")
    private Date createdDate = new Date(System.currentTimeMillis());

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "collection_food_items",
            joinColumns = @JoinColumn(name = "collection_id"),
            inverseJoinColumns = @JoinColumn(name = "food_item_id")
    )
    private Set<FoodItems> items = new HashSet<>();
}
