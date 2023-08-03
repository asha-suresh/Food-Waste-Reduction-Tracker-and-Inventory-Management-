package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.FoodItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<FoodItems, Long> {


}
