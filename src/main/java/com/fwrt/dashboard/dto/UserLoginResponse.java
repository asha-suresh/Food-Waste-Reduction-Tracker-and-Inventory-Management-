package com.fwrt.dashboard.dto;

import lombok.Data;

@Data
public class UserLoginResponse {
    private String userName;
    private Long userId;
    private Long inventoryId;
    private String userRole;
}
