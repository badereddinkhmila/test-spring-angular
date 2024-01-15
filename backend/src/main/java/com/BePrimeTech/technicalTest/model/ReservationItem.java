package com.BePrimeTech.technicalTest.model;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.math.BigDecimal;
import java.util.function.Function;
import java.util.logging.Logger;

@Document("reservation_items")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationItem {

    @Id
    private String id;
    private int reservedRooms;
    @DBRef
    private @NonNull Hotel hotel;

    public BigDecimal getItemTotal() {
        if (hotel.getPrice() == null) return BigDecimal.ZERO;
        return hotel.getPrice().multiply(BigDecimal.valueOf(reservedRooms));
    }
}
