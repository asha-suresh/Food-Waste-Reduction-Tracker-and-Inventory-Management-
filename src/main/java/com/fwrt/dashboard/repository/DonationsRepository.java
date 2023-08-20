package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.Donations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationsRepository extends JpaRepository<Donations,Long> {

    @Query( value = "SELECT * FROM donations d WHERE d.user_id  = :userid", nativeQuery = true)
    List<Donations> findDonationsByUserId(@Param("userid")Long userid);

    @Query (value = "SELECT COUNT(*) as count FROM donations", nativeQuery = true)
    Long getDonationsCount();

}
