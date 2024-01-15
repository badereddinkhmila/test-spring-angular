package com.BePrimeTech.technicalTest.repository.implementation;

import com.BePrimeTech.technicalTest.model.Hotel;
import com.BePrimeTech.technicalTest.repository.HotelRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class HotelRepositoryImpl implements HotelRepository {
    private final MongoTemplate mongoTemplate;

    public HotelRepositoryImpl(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Hotel save(Hotel hotel) {
        return mongoTemplate.save(hotel);
    }

    @Override
    public Hotel updateAvailablePlaces(Hotel hotel) {
        Query query = new Query(Criteria.where("_id").is(hotel.getId()));
        Update update = new Update().set("availableBeds", hotel.getAvailableBeds());

        return mongoTemplate.update(Hotel.class)
                .matching(query)
                .apply(update)
                .findAndModifyValue();
    }

    @Override
    public List<Hotel> findAll() {
        return mongoTemplate.findAll(Hotel.class);
    }
    public Hotel findById(String id) {
        return mongoTemplate.findById(id, Hotel.class);
    }
}
