import { Component, Input, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { IReservationItem } from '@src/models/app.model';
import { AddReservationItem, RemoveReservationItem } from '../store/actions/app.actions';

@Component({
  selector: 'app-hotels-menu-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './hotels-menu-item.component.html',
  styleUrl: './hotels-menu-item.component.scss'
})
export class HotelsMenuItemComponent {
  @Input() cartItem !:IReservationItem|undefined;
  private readonly store = inject(Store);
  addDisabled = computed(() => this.cartItem && this.cartItem.reservedRooms >= this.cartItem.hotel?.availableBeds ? true : false)
  removeDisabled = computed(() => this.cartItem && this.cartItem?.reservedRooms <= 0 ? true : false)

  incrementCount(){
    this.store.dispatch(AddReservationItem({payload: {hotel:this.cartItem?.hotel}as IReservationItem}))
  }
  
  decrementCount(){
    this.store.dispatch(RemoveReservationItem({payload: {hotel:this.cartItem?.hotel}as IReservationItem}))
  }
}
