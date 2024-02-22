import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {APP_CONFIG, IAppConfig} from "../app.config";
import {IHotelModel, IReservationItem, IReservationModel} from "../models/app.model";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private apiEndpoint: string =  "http://localhost:8080/api/v1";

    /**************/
    /*** Hotels ***/
    /**************/
    private hotelsSubject = new BehaviorSubject<IHotelModel[]>([]);
    hotels$ = this.hotelsSubject.asObservable();
    /********************/
    /*** Reservations ***/
    /********************/
    private reservationsSubject = new BehaviorSubject<IReservationModel[]>([]);
    reservations$ = this.reservationsSubject.asObservable();

    /********************/
    /*** Reservation ***/
    /********************/
    private reservationItemsSubject = new BehaviorSubject<IReservationItem[]>([]);
    reservationItems$ = this.reservationItemsSubject.asObservable();

    constructor(private http: HttpClient) {
        this.init();
    }
    public init(){
        this.http.get<IHotelModel[]>(this.apiEndpoint + '/hotels').subscribe((hotels)=>{
            this.hotelsSubject.next(hotels);
        });
        this.http.get<IReservationModel[]>(this.apiEndpoint + '/reservations').subscribe((reservations)=>{
            this.reservationsSubject.next(reservations);
        });
    }
    getAllHotels(): Observable<IHotelModel[]|Error> {
        return this.http.get<IHotelModel[]|Error>(this.apiEndpoint + '/hotels')
    }

    getAllReservations(): Observable<IReservationModel[]> {
        return this.reservations$
    }

    createHotel(hotelForm: IHotelModel): Observable<any> {
        return this.http.post(this.apiEndpoint + '/hotels', hotelForm);
    }

    createReservation(reservation: IReservationItem) {
        return this.http.post(this.apiEndpoint + '/reservationss', reservation);
    }

    addToItems(newItem:IReservationItem) {
        console.log("Hitting the service actions")
        const currentItems = this.reservationItemsSubject.value
        let existIdx = currentItems.findIndex(item=> item.hotel.id == newItem.hotel.id)
        console.log(existIdx)
        if (existIdx==-1) {
            console.log("Creating !!!")
            newItem.reservedRooms++;
            console.log(newItem)
            this.reservationItemsSubject.next([...currentItems, newItem])
        }
        console.log("Updating !!!")
        currentItems[existIdx].reservedRooms++;
        this.reservationItemsSubject.next(currentItems)
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return of(result as T);
        };
    }
}