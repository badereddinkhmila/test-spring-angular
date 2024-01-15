package com.BePrimeTech.technicalTest.repository;

import com.BePrimeTech.technicalTest.model.Reservation;
import com.BePrimeTech.technicalTest.model.ReservationItem;

import java.util.List;

public interface ReservationRepository {
    Reservation save(Reservation reservation);
    Reservation updateOne(Reservation reservation);
    List<Reservation> findAll();
    void delete(Reservation reservation);
}
