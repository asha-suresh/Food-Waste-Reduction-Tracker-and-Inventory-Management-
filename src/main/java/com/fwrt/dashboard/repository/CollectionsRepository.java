package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.Collections;
import com.fwrt.dashboard.entity.Donations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionsRepository extends JpaRepository<Collections, Long>  {

    @Query(value = "SELECT COUNT(*) as count FROM collections", nativeQuery = true)
    Long getInventoryCollectionsCount();

    @Query(value = "SELECT collection_id FROM collection_food_items c WHERE c.food_item_id  = :foodid", nativeQuery = true)
    Long getCollectionsDetailsfromFoodId(@Param("foodid")Long foodid);

}
