package com.BePrimeTech.technicalTest.service.Implementation;

import com.BePrimeTech.technicalTest.model.Hotel;
import com.BePrimeTech.technicalTest.repository.implementation.HotelRepositoryImpl;
import com.BePrimeTech.technicalTest.service.HotelService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelServiceImpl implements HotelService {
    private final HotelRepositoryImpl hotelRepository;

    public HotelServiceImpl(HotelRepositoryImpl hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    @Override
    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @Override
    public Hotel updateHotel(Hotel hotel) {
        return hotelRepository.updateAvailablePlaces(hotel);
    }
    @Override
    public Hotel getHotelById(String id) {
        return hotelRepository.findById(id);
    }
    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }
}
