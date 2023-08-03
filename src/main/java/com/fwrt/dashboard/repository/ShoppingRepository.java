package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingRepository extends JpaRepository<ShoppingCart, Long>  {

//    @Modifying
//    @Transactional
//    @Query(value = "update ChatMessage set status = :status where senderId = :senderId and recipientId = :recipientId")
//    Integer updateStatus(@Param("senderId") String senderId, @Param("recipientId") String recipientId, @Param("status") String status);

}
