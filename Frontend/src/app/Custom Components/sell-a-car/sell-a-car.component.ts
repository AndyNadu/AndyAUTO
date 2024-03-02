// angular
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

// angular material components
import { MatInputModule } from '@angular/material/input';

// primeNG components
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileRemoveEvent, FileSelectEvent, FileUploadModule, UploadEvent } from 'primeng/fileupload';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// models && DTOs && constants
import { CarsList } from '../../Constants/CarsList';
import { Car } from '../../Data Transfer Objects/Car';

@Component({
  selector: 'app-sell-a-car',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,

    DropdownModule,
    InputTextModule,
    FileUploadModule,
    HttpClientModule,
    InputNumberModule,
    InputTextareaModule
  ],
  templateUrl: './sell-a-car.component.html',
  styleUrl: './sell-a-car.component.css'
})
export class SellACarComponent {

  // variables
  sellForm: FormGroup;
  carsList: CarsList = new CarsList();
  photos: Set<File> = new Set<File>();
  photosEmpty: boolean = false;

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
    this.sellForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      mileage: ['', [Validators.required, Validators.pattern('^[0-9]{1,7}$')]],
      description: ['', Validators.required],
      fuel: ['', Validators.required],
      cubicCapacity: ['', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]],
      power: ['', [Validators.required, Validators.pattern('^[0-9]{1,5}$')]],
      transmission: ['', Validators.required],
      traction: ['', Validators.required],
      body: ['', Validators.required],
      wheel: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]]
    });
  }

  // methods
  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }

  makeSelected(): void {
    this.carsList.updateModels(this.sellForm.get('make')!.value);
  }

  onPhotoSelected(event: FileSelectEvent): void {
    const lastAddedImage = event.files[event.files.length - 1];

    if (!this.photos.has(lastAddedImage))
      this.photos.add(lastAddedImage);
  }

  onPhotoRemoved(event: FileRemoveEvent): void {
    this.photos.delete(event.file);
    this.photosEmpty = this.photos.size === 0 ? true : false;
  }

  submit(): void {
    Object.keys(this.sellForm.controls).forEach(key => {
      const control = this.sellForm.get(key);
      control!.markAsDirty();
    });
    this.photosEmpty = this.photos.size === 0 ? true : false;

    if (!this.photosEmpty && this.sellForm.valid) {

      const formData: FormData = new FormData();
      let count: number = 0;

      for (const photo of this.photos) {
        console.log(photo.name);
        console.log(this.photos.size);
      }

      formData.append('make', String(this.sellForm.get('make')!.value));
      formData.append('model', String(this.sellForm.get('model')!.value));
      formData.append('year', String(this.sellForm.get('year')!.value));
      formData.append('mileage', String(this.sellForm.get('mileage')!.value));
      formData.append('description', String(this.sellForm.get('description')!.value));
      formData.append('fuel', String(this.sellForm.get('fuel')!.value));
      formData.append('cubicCapacity', String(this.sellForm.get('cubicCapacity')!.value));
      formData.append('power', String(this.sellForm.get('power')!.value));
      formData.append('transmission', String(this.sellForm.get('transmission')!.value));
      formData.append('traction', String(this.sellForm.get('traction')!.value));
      formData.append('body', String(this.sellForm.get('body')!.value));
      formData.append('wheel', String(this.sellForm.get('wheel')!.value));
      for (const photo of this.photos) { formData.append(`photo[${count++}]`, photo); }
      formData.append('price', String(this.sellForm.get('price')!.value));

      this.http.post<Car>('http://localhost:5113/car/post', formData)
        .subscribe(
          (res: Car) => {
            console.log('succes');
          },
          (err: HttpErrorResponse) => {
            console.log(err);
          }
        );
    }
  }
 
}
