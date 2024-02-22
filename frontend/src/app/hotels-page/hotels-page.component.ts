import { Component } from '@angular/core';
import {HotelsListComponent} from "../hotels-list/hotels-list.component";

@Component({
  selector: 'app-hotels-page',
  standalone: true,
    imports: [
        HotelsListComponent
    ],
  templateUrl: './hotels-page.component.html',
  styleUrl: './hotels-page.component.scss'
})
export class HotelsPageComponent {
}
