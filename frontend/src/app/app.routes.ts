import { Routes } from '@angular/router';
import {HotelsPageComponent} from "./hotels-page/hotels-page.component";
import {NewHotelFormComponent} from "./new-hotel-form/new-hotel-form.component";

export const routes: Routes = [
    {path: '', component: HotelsPageComponent},
    {path: 'hotels/create', component: NewHotelFormComponent},

];
