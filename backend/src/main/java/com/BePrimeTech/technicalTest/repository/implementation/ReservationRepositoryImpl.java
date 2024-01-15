package com.BePrimeTech.technicalTest.repository.implementation;

import com.BePrimeTech.technicalTest.model.Reservation;
import com.BePrimeTech.technicalTest.repository.ReservationRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReservationRepositoryImpl implements ReservationRepository {
    private final MongoTemplate mongoTemplate;
    public ReservationRepositoryImpl(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }
    @Override
    public Reservation save(Reservation reservation) {
        return mongoTemplate.save(reservation);
    }

    @Override
    public Reservation updateOne(Reservation reservation) {
        return null;
    }

    @Override
    public List<Reservation> findAll() {
        return mongoTemplate.findAll(Reservation.class);
    }

    @Override
    public void delete(Reservation reservation) {

    }
}
