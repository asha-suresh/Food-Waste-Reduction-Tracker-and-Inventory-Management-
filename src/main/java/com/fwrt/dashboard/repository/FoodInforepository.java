package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.FoodInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodInforepository extends JpaRepository<FoodInfo,Long> {

    @Query( value = "SELECT * FROM food_info f WHERE f.food_name  = :name", nativeQuery = true)
    FoodInfo getFoodInfoByNameandCategory(@Param("name")String name);

}
