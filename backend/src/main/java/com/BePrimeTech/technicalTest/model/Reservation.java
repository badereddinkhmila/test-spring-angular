package com.BePrimeTech.technicalTest.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.math.BigDecimal;
import java.util.List;

@Document("reservations")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Reservation {
    @Id
    private String id;

    @DBRef
    private @NonNull List<ReservationItem> items;

    public BigDecimal getReservationTotal() {
        return items.stream().map(ReservationItem::getItemTotal).reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
