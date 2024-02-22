package com.BePrimeTech.technicalTest.service.Implementation;

import com.BePrimeTech.technicalTest.model.Hotel;
import com.BePrimeTech.technicalTest.repository.implementation.HotelRepositoryImpl;
import com.BePrimeTech.technicalTest.service.HotelService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class HotelServiceImpl implements HotelService {
    private final HotelRepositoryImpl hotelRepository;
    private final Logger logger = Logger.getLogger("HotelService");
    public HotelServiceImpl(HotelRepositoryImpl hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    @Override
    public Hotel createHotel(Hotel hotel) {
        logger.info(hotel.getAvailableBeds()+" "+hotel.getPrice()+" "+hotel.getImage());
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
