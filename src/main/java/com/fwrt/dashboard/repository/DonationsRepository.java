package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.dto.YourDonationAnalyticsDto;
import com.fwrt.dashboard.entity.Donations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DonationsRepository extends JpaRepository<Donations,Long> {

    @Query( value = "SELECT * FROM donations d WHERE d.user_id  = :userid", nativeQuery = true)
    List<Donations> findDonationsByUserId(@Param("userid")Long userid);

    @Query( value = "SELECT * FROM donations d WHERE d.user_id  != :userid AND d.is_donation_active =true", nativeQuery = true)
    List<Donations> findAllActiveDonations(@Param("userid")Long userid);

    @Query (value = "SELECT COUNT(*) as count FROM donations", nativeQuery = true)
    Long getDonationsCount();


    @Query(value = "SELECT COUNT(d) FROM donations d WHERE d.created_date BETWEEN :startDate AND :endDate AND d.is_donation_active = :active AND d.user_id = :userId",nativeQuery = true)
    long countDonationsWithinDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("userId") Long userId, @Param("active") boolean active);

}
