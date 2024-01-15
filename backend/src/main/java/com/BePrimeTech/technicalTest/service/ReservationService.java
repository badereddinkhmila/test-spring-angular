package com.BePrimeTech.technicalTest.service;

import com.BePrimeTech.technicalTest.model.Hotel;
import com.BePrimeTech.technicalTest.model.Reservation;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface ReservationService {
    Reservation createReservation(Reservation reservation) throws BadRequestException;

    List<Reservation> getAllReservation();
}
