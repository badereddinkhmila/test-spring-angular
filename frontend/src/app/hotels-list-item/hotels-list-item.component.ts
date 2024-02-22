import {Component, Input, Signal, computed, inject, signal} from '@angular/core';
import {IHotelModel, IReservationItem} from "@src/models/app.model";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import { Store } from '@ngrx/store';
import { AddReservationItem, RemoveReservationItem } from '../store/actions/app.actions';
import { appFeature } from '../store/reducers/app.reducers';

@Component({
  selector: 'app-hotels-list-item',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './hotels-list-item.component.html',
  styleUrl: './hotels-list-item.component.scss'
})
export class HotelsListItemComponent {
  private readonly store = inject(Store);
  @Input() hotel !:IHotelModel|undefined;
  quantity: Signal<number> = signal(0);
  addDisabled = computed(() => this.hotel && this.quantity() >= this.hotel?.availableBeds ? true : false)
  removeDisabled = computed(() => this.quantity() <= 0 ? true : false)

  ngOnInit(){
    this.quantity = this.store.selectSignal(appFeature.selectCartItemCount(this.hotel ? this.hotel.id:""));
    console.log(this.removeDisabled(), this.addDisabled())
  }

  incrementCount(){
    this.store.dispatch(AddReservationItem({payload: {hotel:this.hotel}as IReservationItem}))
  }
  
  decrementCount(){
    this.store.dispatch(RemoveReservationItem({payload: {hotel:this.hotel}as IReservationItem}))
  }
}
