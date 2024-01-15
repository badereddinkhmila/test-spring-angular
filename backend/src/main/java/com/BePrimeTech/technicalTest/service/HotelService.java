package com.BePrimeTech.technicalTest.service;

import com.BePrimeTech.technicalTest.model.Hotel;

import java.util.List;

public interface HotelService {
    Hotel createHotel(Hotel hotel);
    Hotel updateHotel(Hotel hotel);

    Hotel getHotelById(String id);

    List<Hotel> getAllHotels();
}
