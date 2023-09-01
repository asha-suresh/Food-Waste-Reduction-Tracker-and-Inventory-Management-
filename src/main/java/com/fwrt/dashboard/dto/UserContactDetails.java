package com.fwrt.dashboard.dto;

import lombok.Data;

@Data
public class UserContactDetails {
    private Long userId;
    private String phoneNo;
    private String houseNo;
    private String streetOrCityName;
    private String pinCode;
    private Boolean updateRequired;
}
