package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.FoodInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodInforepository extends JpaRepository<FoodInfo,Long> {

    @Query( value = "SELECT * FROM food_info f WHERE f.food_name ILIKE :name", nativeQuery = true)
    FoodInfo getFoodInfoByNameandCategory(@Param("name")String name);

    @Query( value = "SELECT food_name FROM food_info f", nativeQuery = true)
    List<String> getAllFoodNamesForSuggestion();


}
