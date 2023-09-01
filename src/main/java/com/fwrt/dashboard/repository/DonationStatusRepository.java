package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.DonationStatus;
import com.fwrt.dashboard.entity.Donations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationStatusRepository extends JpaRepository<DonationStatus,Long> {


    @Query( value = "SELECT ds.*\n" +
            "FROM donation_status ds\n" +
            "JOIN donations d ON ds.donation_id = d.id\n" +
            "WHERE (d.user_id = :userid or ds.request_created_by = :userid) and ds.status != 'completed' " , nativeQuery = true)
    List<DonationStatus> findDonationStatusByUserId(@Param("userid")Long userid);


    @Query( value = "SELECT ds.*\n" +
            "FROM donation_status ds\n" +
            "JOIN donations d ON ds.donation_id = d.id\n" +
            "WHERE (d.user_id = :userid or ds.request_created_by = :userid) and ds.status = 'completed' ", nativeQuery = true)
    List<DonationStatus> findCompletedDonationStatusByUserId(@Param("userid")Long userid);

}
