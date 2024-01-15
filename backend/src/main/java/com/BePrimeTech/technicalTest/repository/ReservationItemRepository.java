package com.BePrimeTech.technicalTest.repository;

import com.BePrimeTech.technicalTest.model.ReservationItem;

public interface ReservationItemRepository {
    ReservationItem save(ReservationItem reservationItem);
    ReservationItem updateOne(ReservationItem reservationItem);
    void delete(ReservationItem reservationItem);
}
