package com.fwrt.dashboard.dto;

import com.fwrt.dashboard.entity.Donations;
import lombok.Data;

@Data
public class DonationsResponseDTO extends Donations {
    private String userName;
    private String email;
    private String addedOn;
    private String expiresAt;
}
