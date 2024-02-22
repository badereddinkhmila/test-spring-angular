export interface IHotelModel{
    id: string,
    name:string,
    image:string,
    availableBeds:number,
    price: number
}

export interface IReservationModel{
    id: string,
    items:IReservationItem[],
    reservationTotal: number
}

export interface IReservationItem{
    id:string,
    reservedRooms:number,
    itemTotal:number,
    hotel: IHotelModel
}