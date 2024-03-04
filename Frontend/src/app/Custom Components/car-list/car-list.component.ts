// angular
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// custom components
import { CarBoxComponent } from '../car-box/car-box.component';
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// models && DTOs && constants
import { temporar } from '../../Data Transfer Objects/temporar';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    CarBoxComponent
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  tempArray: temporar[] = [];

  constructor(private _componentInteractionService: ComponentInteractionService,
    private _http: HttpClient) {
    _http.get<temporar[]>('http://localhost:5113/car/get')
      .subscribe(
        (res: temporar[]) => {
          this.tempArray = res;
          console.log('success');
          console.log(this.tempArray[0].base64s);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }
}


