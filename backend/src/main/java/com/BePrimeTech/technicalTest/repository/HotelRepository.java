package com.BePrimeTech.technicalTest.repository;

import java.util.List;

import com.BePrimeTech.technicalTest.model.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HotelRepository extends MongoRepository<Hotel, String> {

    public List<Hotel> findAll();
}