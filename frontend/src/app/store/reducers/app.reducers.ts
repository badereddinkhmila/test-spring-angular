import { IHotelModel, IReservationItem, IReservationModel } from "@src/models/app.model";

import {
    CreateHotel,
    CreateHotelSuccess,
    CreateHotelFailure,
    CreateReservation,
    CreateReservationSuccess,
    CreateReservationFailure,
    FetchHotels,
    FetchReservations, FetchHotelsSuccess, FetchReservationsSuccess, AddReservationItem, RemoveReservationItem
} from "@src/app/store/actions/app.actions";
import {ActionReducerMap, MetaReducer, createFeature, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import { isDevMode } from "@angular/core";
import { state } from "@angular/animations";

export interface AppState {
    isLoading: boolean;
    hotels: IHotelModel[];
    reservations: IReservationModel[];
    cart: IReservationItem[];
    errorMessage: string | null;
}

export const initialState: AppState = {
    isLoading: false,
    hotels: [],
    reservations: [],
    cart: [],
    errorMessage: null
}

export const appReducer = createReducer(initialState,
    on(FetchHotels, FetchReservations, (state) => {
        return {
            ...state,
            isLoading: true,
        }
    }),
    on(FetchHotelsSuccess, (state, {payload}) => {
        return {
            ...state,
            hotels:payload,
            isLoading: false,
        }
    }),
    on(FetchReservationsSuccess, (state, {payload}) => {
        return {
            ...state,
            isLoading: false,
            reservations:payload
        }
    }),
    on(CreateReservationFailure, CreateHotelFailure, (state, {payload}) => {
        return {
            ...state,
            isLoading: false,
            errorMessage: payload
        }
    }),
    on(CreateHotelSuccess, (state, {payload}) => {
        return {
            ...state,
            isLoading: false,
            hotels: [payload, ...state.hotels]
        }
    }),
    on(CreateReservationSuccess, (state, {payload}) => {
        return {
            ...state,
            isLoading: false,
            reservations: [payload, ...state.reservations]
        }
    }),
    on(AddReservationItem,(state, {payload})=> {
        let existIdx = state.cart.findIndex(item=> item.hotel.id == payload.hotel.id)
        if (existIdx == -1) {
            const item:IReservationItem = {
                ...payload,
                reservedRooms: 1
            }
            return {
                ...state,
                cart: [...state.cart, item]
            };
        }
        let item:IReservationItem = state.cart[existIdx];
        let items = state.cart.filter(v => v.hotel.id != item.hotel.id);
        items = [...items, {
            ...item,
            reservedRooms: item.reservedRooms+1
        }]
        return {
            ...state,
            cart:items
        };
    }),
    on(RemoveReservationItem, (state, {payload})=>{
        let existIdx = state.cart.findIndex(item=> item.hotel.id == payload.hotel.id)
        let item:IReservationItem = state.cart[existIdx];
        let items = state.cart.filter(v => v.hotel.id != item.hotel.id);
        if (item.reservedRooms > 1){
            console.log(item.reservedRooms)
            items = [...items, {
                ...item,
                reservedRooms: item.reservedRooms-1
            }]
            
            return {
                ...state,
                cart: items
            }    
        }        
        return {
            ...state,
            cart: items
        }
    }),
)

export interface State {
    appState: AppState,
}

export const reducers:ActionReducerMap<State> = {
    appState: appReducer,
}

export const selectLoadingState = (state: State) => state.appState.isLoading;

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];


export const appFeature = createFeature({
    name: 'hotels',reducer:appReducer, extraSelectors: ({selectCart}) => ({
        selectCartItemCount: (ID: string) => {
            return createSelector(
                selectCart,
                cart => {
                    const item = cart.find(item => item.hotel.id == ID)
                    return item ? item.reservedRooms : 0;
                }
            )
        },
        selectCartTotal: () => {
            return createSelector(
                selectCart,
                cart => {
                    const sum = cart.reduce((total,item) => item.hotel.price ? item.hotel.price*item.reservedRooms + total : total, 0)
                    return sum.toFixed(2)
                }
            )
        },
        selectCartItemsCount: () => {
            return createSelector(
                selectCart,
                cart => cart.length
            )
        }
    })
});