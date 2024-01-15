package com.BePrimeTech.technicalTest.controller;

import com.BePrimeTech.technicalTest.model.Hotel;
import com.BePrimeTech.technicalTest.model.Reservation;
import com.BePrimeTech.technicalTest.service.Implementation.HotelServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.function.Supplier;
import java.util.logging.Logger;

@RestController
@RequestMapping(path = "/hotels")
public class HotelController {
    private final HotelServiceImpl hotelService;

    public HotelController(HotelServiceImpl hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping
    public ResponseEntity<?> getHotels() {
       return ResponseEntity.ok(hotelService.getAllHotels());
    }

    @PostMapping
    public ResponseEntity<?> createHotel(@RequestBody Hotel hotel) {
        Hotel newHotel = new Hotel();
        try {
            newHotel = hotelService.createHotel(hotel);
        }catch (Exception exception) {
            ResponseEntity.badRequest().body("Error creating the reservation");
        }
        return ResponseEntity.ok(newHotel);
    }
}
