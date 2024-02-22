import {Component, Signal, inject, signal} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import { HotelsMenuItemComponent } from './hotels-menu-item/hotels-menu-item.component';
import { Store } from '@ngrx/store';
import { appFeature } from './store/reducers/app.reducers';
import { IReservationItem } from '@src/models/app.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterOutlet, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule, MatMenuModule, MatBadgeModule, HotelsMenuItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly store = inject(Store);
  private breakpointObserver = inject(BreakpointObserver);
  nbItems:Signal<number> = signal(0);
  cartItems:Signal<IReservationItem[]>= this.store.selectSignal(appFeature.selectCart)
  cartTotal:Signal<string>= this.store.selectSignal(appFeature.selectCartTotal())

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
      .pipe(
          map(result => result.matches),
          shareReplay()
      );

    ngOnInit(){
        this.nbItems = this.store.selectSignal(appFeature.selectCartItemsCount())
    }

}
