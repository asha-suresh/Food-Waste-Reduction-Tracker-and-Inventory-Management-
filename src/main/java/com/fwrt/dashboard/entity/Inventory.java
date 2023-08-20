package com.fwrt.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Table(name="inventory")
@Entity
public class Inventory {
    @Id
    @Column(name="id")
    private Long id;

    @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "inventory_collections",
            joinColumns = @JoinColumn(name = "inventory_id"),
            inverseJoinColumns = @JoinColumn(name = "collection_id")
    )
    private List<Collections> collections = new ArrayList<>();

}
