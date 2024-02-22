import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {Store} from "@ngrx/store";
import {AppState} from "@src/app/store/reducers/app.reducers";
import {CreateHotel} from "@src/app/store/actions/app.actions";
import {ApplicationService} from "@src/app/app.service";

@Component({
  selector: 'app-new-hotel-form',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './new-hotel-form.component.html',
  styleUrl: './new-hotel-form.component.scss'
})
export class NewHotelFormComponent {
  hotelForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private store:Store<AppState>) {
    this.hotelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      availableBeds: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get f() {
    return this.hotelForm.controls;
  }

  getErrorMessage(field:string, validator:string, message:string) {
    if (this.f[field].hasError(validator)) {
      return message;
    }
    return '';
  }

  onSubmit() {
    if (this.hotelForm.invalid) {
      return;
    }
    // ngrx implementation
    this.store.dispatch(CreateHotel({payload: this.hotelForm.value}))
  }
}
