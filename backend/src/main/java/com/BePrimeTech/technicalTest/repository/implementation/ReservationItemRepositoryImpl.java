package com.BePrimeTech.technicalTest.repository.implementation;

import com.BePrimeTech.technicalTest.model.ReservationItem;
import com.BePrimeTech.technicalTest.repository.ReservationItemRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ReservationItemRepositoryImpl implements ReservationItemRepository {
    private final MongoTemplate mongoTemplate;

    public ReservationItemRepositoryImpl(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public ReservationItem save(ReservationItem reservationItem) {
        return mongoTemplate.save(reservationItem);
    }

    @Override
    public ReservationItem updateOne(ReservationItem reservationItem) {
        return null;
    }

    @Override
    public void delete(ReservationItem reservationItem) {

    }
}
