package com.fwrt.dashboard.dto;

import lombok.Data;

@Data
public class CategoryFoodItemCountDTO {
    private Long fruits;
    private Long vegetables;
    private Long cannedFoods;
    private Long juices;
    private Long snacks;
    private Long others;
}