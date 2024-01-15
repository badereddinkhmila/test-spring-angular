package com.BePrimeTech.technicalTest.service.Implementation;

import com.BePrimeTech.technicalTest.model.Hotel;
import com.BePrimeTech.technicalTest.model.Reservation;
import com.BePrimeTech.technicalTest.model.ReservationItem;
import com.BePrimeTech.technicalTest.repository.ReservationItemRepository;
import com.BePrimeTech.technicalTest.repository.ReservationRepository;
import com.BePrimeTech.technicalTest.service.HotelService;
import com.BePrimeTech.technicalTest.service.ReservationService;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReservationServiceImpl implements ReservationService {
    private final ReservationRepository reservationRepository;
    private final ReservationItemRepository reservationItemRepository;
    private final HotelService hotelService;

    public ReservationServiceImpl(ReservationRepository reservationRepository, ReservationItemRepository reservationItemRepository, HotelService hotelService) {
        this.reservationRepository = reservationRepository;
        this.reservationItemRepository = reservationItemRepository;
        this.hotelService = hotelService;
    }
    @Override
    public Reservation createReservation(Reservation reservation) throws BadRequestException {
        if (reservation.getItems().isEmpty()) throw new BadRequestException("Reservation without items!");

        // Group Items with same hotel
        List<ReservationItem> reservationItems = reservation.getItems();
        for (int i = 0; i < reservationItems.size(); i++) {
            for (int j = i+1; j < reservationItems.size() ; j++) {
                if (Objects.equals(reservationItems.get(i).getHotel().getId(),reservationItems.get(j).getHotel().getId())){
                    reservationItems.get(i).setReservedRooms(reservationItems.get(i).getReservedRooms() + reservationItems.get(j).getReservedRooms());
                    reservationItems.remove(j);
                }
            }
        }

        List<ReservationItem> items = reservationItems.stream()
                .map(this::saveReservationItem).map(reservationItemRepository::save).toList();
        reservation.setItems(items);
        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    public ReservationItem saveReservationItem(ReservationItem item) {
        Hotel dbHotel = hotelService.getHotelById(item.getHotel().getId());
        // TODO Check number of reserved to be less than available rooms
        dbHotel.updateAvailableBeds(item.getReservedRooms());
        hotelService.updateHotel(dbHotel);
        item.setHotel(dbHotel);
        return reservationItemRepository.save(item);
    }
}
