package com.fwrt.dashboard.entity;

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

    @Column(name = "updated_date")
    private Date updatedDate = new Date();

    @Column(name = "created_date")
    private Date createdDate = new Date();

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "collection_food_items",
            joinColumns = @JoinColumn(name = "collection_id"),
            inverseJoinColumns = @JoinColumn(name = "food_item_id")
    )
    private Set<FoodItems> items = new HashSet<>();
}
