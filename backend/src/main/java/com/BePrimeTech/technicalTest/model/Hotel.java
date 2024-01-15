package com.BePrimeTech.technicalTest.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document("hotels")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Hotel {

    @Id
    private String id;

    private String name;
    private int availableBeds;
    private BigDecimal price;
    private String image;

    public Hotel(String id, String name, String image, int availableBeds, BigDecimal price) {
        super();
        this.id = id;
        this.name = name;
        this.availableBeds = availableBeds;
        this.image = image;
        this.price = price;
    }

    public void updateAvailableBeds(int reservedBeds) {
        availableBeds = availableBeds - reservedBeds;
    }
}