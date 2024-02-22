import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HotelsListItemComponent} from "../hotels-list-item/hotels-list-item.component";
import { Store } from '@ngrx/store';
import { appFeature } from '../store/reducers/app.reducers';
import { FetchHotels } from '../store/actions/app.actions';

@Component({
  selector: 'app-hotels-list',
  standalone: true,
    imports: [
        MatIconModule,
        HotelsListItemComponent,
        MatProgressSpinnerModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hotels-list.component.html',
  styleUrl: './hotels-list.component.scss'
})
export class HotelsListComponent {
    private readonly store = inject(Store);
    readonly hotels = this.store.selectSignal(appFeature.selectHotels);
    readonly isLoading = this.store.selectSignal(appFeature.selectIsLoading);

    ngOnInit() {
      this.store.dispatch(FetchHotels());
    }
}
