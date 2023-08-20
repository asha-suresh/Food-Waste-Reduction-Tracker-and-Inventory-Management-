package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.dto.CategoryFoodItemCountDTO;
import com.fwrt.dashboard.entity.FoodItems;
import com.fwrt.dashboard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<FoodItems, Long> {

    @Query( value = "SELECT * FROM food_items f WHERE f.user_id  = :userid and f.is_expiry_notified = false", nativeQuery = true)
    List<FoodItems> listAllUnNotifiedFoodItems(@Param("userid")Long userid);


    @Query( value = "SELECT * FROM food_items f WHERE f.user_id  = :userid", nativeQuery = true)
    List<FoodItems> listAllFoodItems(@Param("userid")Long userid);

    @Query(value = "SELECT f.category, COUNT(f.id) " +
            "FROM food_items f WHERE f.user_id = :userid GROUP BY f.category", nativeQuery = true)
    List<Object[]> getCategoryFoodItemCountByUserId(@Param("userid") Long userId);

}
