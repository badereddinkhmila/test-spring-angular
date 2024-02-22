import {createAction, props} from "@ngrx/store";
import { IReservationItem } from "@src/models/app.model";

export enum appActions {
    CREATE_RESERVATION = '[Reservation Action] CreateReservation',
    CREATE_RESERVATION_SUCCESS = '[Reservation Action] CreateReservationSuccess',
    CREATE_RESERVATION_FAILURE = '[Reservation Action] CreateReservationFailure',
    FETCH_RESERVATIONS = '[Reservation Action] FetchReservations',
    FETCH_RESERVATIONS_SUCCESS = '[Reservation Action] FetchReservationsSuccess',
    FETCH_RESERVATIONS_FAILURE = '[Reservation Action] FetchReservationsFailure',
    FETCH_HOTELS = '[Hotel Action] FetchHotels',
    FETCH_HOTELS_SUCCESS = '[Hotel Action] FetchHotelsSuccess',
    FETCH_HOTELS_FAILURE = '[Hotel Action] FetchHotelsFailure',
    CREATE_HOTEL = '[Hotel Action] CreateHotel',
    CREATE_HOTEL_SUCCESS = '[Hotel Action] CreateHotelSuccess',
    CREATE_HOTEL_FAILURE = '[Hotel Action] CreateHotelFailure',
    ADD_RESERVATION_ITEM = '[Cart Action] AddReservationItem',
    REMOVE_RESERVATION_ITEM = '[Cart Action] RemoveReservationItem',
}

export const CreateHotel = createAction(appActions.CREATE_HOTEL, props<{ payload: any }>());
export const CreateHotelSuccess = createAction(appActions.CREATE_HOTEL_SUCCESS, props<{ payload: any }>());
export const CreateHotelFailure = createAction(appActions.CREATE_HOTEL_FAILURE, props<{ payload: any }>());
export const FetchHotels = createAction(appActions.FETCH_HOTELS);
export const FetchHotelsSuccess = createAction(appActions.FETCH_HOTELS_SUCCESS, props<{ payload: any }>());
export const FetchHotelsFailure = createAction(appActions.FETCH_HOTELS_FAILURE, props<{ payload: any }>());

export const CreateReservation = createAction(appActions.CREATE_RESERVATION, props<{ payload: any }>());
export const CreateReservationSuccess = createAction(appActions.CREATE_RESERVATION_SUCCESS, props<{ payload: any }>());
export const CreateReservationFailure = createAction(appActions.CREATE_RESERVATION_FAILURE, props<{ payload: any }>());
export const FetchReservations = createAction(appActions.FETCH_RESERVATIONS);
export const FetchReservationsSuccess = createAction(appActions.FETCH_RESERVATIONS_SUCCESS, props<{ payload: any }>());
export const FetchReservationsFailure = createAction(appActions.FETCH_RESERVATIONS_FAILURE, props<{ payload: any }>());

export const AddReservationItem = createAction(appActions.ADD_RESERVATION_ITEM, props<{ payload: IReservationItem }>());
export const RemoveReservationItem = createAction(appActions.REMOVE_RESERVATION_ITEM, props<{ payload: any }>());
