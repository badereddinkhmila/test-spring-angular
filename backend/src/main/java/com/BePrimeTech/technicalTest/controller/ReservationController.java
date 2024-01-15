package com.BePrimeTech.technicalTest.controller;

import com.BePrimeTech.technicalTest.model.Hotel;
import com.BePrimeTech.technicalTest.model.Reservation;
import com.BePrimeTech.technicalTest.model.ReservationItem;
import com.BePrimeTech.technicalTest.service.Implementation.HotelServiceImpl;
import com.BePrimeTech.technicalTest.service.Implementation.ReservationServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping(path = "/reservations")
public class ReservationController {
    private final Logger logger = Logger.getLogger("Reservation Controller");
    private final ReservationServiceImpl reservationService;

    public ReservationController(ReservationServiceImpl reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<?> getReservations() {
        return ResponseEntity.ok(reservationService.getAllReservation());
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
        Reservation newReservation = new Reservation();
        try {
            newReservation = reservationService.createReservation(reservation);
        }catch (Exception exception) {
            ResponseEntity.badRequest().body(exception.getMessage());
        }
        return ResponseEntity.ok(newReservation);
    }
}
