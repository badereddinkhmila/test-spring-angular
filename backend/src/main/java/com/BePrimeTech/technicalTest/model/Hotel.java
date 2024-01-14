package com.BePrimeTech.technicalTest.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document("hotels")
public class Hotel {

    @Id
    private String id;

    private String name;
    private int rooms;
    private BigDecimal price;
    private String image;

    public Hotel(String id, String name, String image, int rooms, BigDecimal price) {
        super();
        this.id = id;
        this.name = name;
        this.rooms = rooms;
        this.image = image;
        this.price = price;
    }
}