package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.Collections;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionsRepository extends JpaRepository<Collections, Long>  {

    @Query(value = "SELECT COUNT(*) as count FROM collections", nativeQuery = true)
    Long getInventoryCollectionsCount();

}
