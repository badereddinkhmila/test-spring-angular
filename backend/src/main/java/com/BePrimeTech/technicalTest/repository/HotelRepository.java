package com.BePrimeTech.technicalTest.repository;

import java.util.List;

import com.BePrimeTech.technicalTest.model.Hotel;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface HotelRepository {
    Hotel save(Hotel hotel);
    Hotel updateAvailablePlaces(Hotel hotel);
    List<Hotel> findAll();
}