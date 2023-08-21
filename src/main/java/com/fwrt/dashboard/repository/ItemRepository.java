package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.dto.CategoryFoodItemCountDTO;
import com.fwrt.dashboard.dto.StatusCountDTO;
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


    @Query(value =
            "SELECT " +
                    "SUM(CASE WHEN f.status = 'safe' THEN 1 ELSE 0 END) as safeCount, " +
                    "SUM(CASE WHEN f.status = 'donated' THEN 1 ELSE 0 END) as donatedCount, " +
                    "SUM(CASE WHEN f.status = 'consumed' THEN 1 ELSE 0 END) as consumedCount, " +
                    "SUM(CASE WHEN f.status = 'expired' THEN 1 ELSE 0 END) as expiredCount, " +
                    "SUM(CASE WHEN f.status = 'warning' THEN 1 ELSE 0 END) as warningCount " +
                    "FROM food_items f WHERE f.user_id = :userid",
            nativeQuery = true)
    List<Object[]> getStatusCounts(@Param("userid") Long userId);


}
