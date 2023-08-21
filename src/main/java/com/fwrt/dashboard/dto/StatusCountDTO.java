package com.fwrt.dashboard.dto;

import lombok.Data;

@Data
public class StatusCountDTO {
    private Long safeFoodCount;
    private Long donatedCount;
    private Long consumedCount;
    private Long expiredCount;
    private Long warningCount;
}
