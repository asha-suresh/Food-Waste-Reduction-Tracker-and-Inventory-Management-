package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    @Query (value = "SELECT COUNT(*) as count FROM inventory", nativeQuery = true)
    Long getInventoryCount();
}
