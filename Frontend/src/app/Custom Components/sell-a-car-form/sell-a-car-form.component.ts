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
import { FileRemoveEvent, FileSelectEvent, FileUploadModule } from 'primeng/fileupload';

// services
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';

// models && DTOs && constants
import { Car } from '../../Interfaces/Car';
import { CarsListConstant } from '../../Constants/CarsListConstant';


@Component({
  selector: 'app-sell-a-car-form',
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
  templateUrl: './sell-a-car-form.component.html',
  styleUrl: './sell-a-car-form.component.css'
})
export class SellACarFormComponent {

  // members
  sellForm: FormGroup;
  carsList: CarsListConstant = new CarsListConstant();
  images: Set<File> = new Set<File>();
  imagesEmpty: boolean = false;

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService,
    private _formBuilder: FormBuilder,
    private _http: HttpClient) {
    this.sellForm = _formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
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
  onImageSelected(event: FileSelectEvent): void {
    const lastAddedImage = event.files[event.files.length - 1];

    let alreadySelected: boolean = false;
    for (const image of this.images)
      if (image.type == lastAddedImage.type && image.name == lastAddedImage.name && image.size == lastAddedImage.size) {
        alreadySelected = true;
        break;
      }
    if (alreadySelected == false) {
      this.images.add(lastAddedImage);
    }

    this.imagesEmpty = this.images.size === 0 ? true : false;
  }
  onImageRemoved(event: FileRemoveEvent): void {
    this.images.delete(event.file);
    this.imagesEmpty = this.images.size === 0 ? true : false;
  }
  onMakeSelected(): void {
    this.carsList.make = this.sellForm.get('make')!.value;
    this.carsList.UpdateModels();
  }
  submit(): void {
    Object.keys(this.sellForm.controls).forEach(key => {
      const control = this.sellForm.get(key);
      control!.markAsDirty();
    });
    this.imagesEmpty = this.images.size === 0 ? true : false;

    if (!this.imagesEmpty && this.sellForm.valid) {

      const formData: FormData = new FormData();
      let count: number = 0;

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
      for (const image of this.images) { formData.append(`image[${count++}]`, image); }
      formData.append('price', String(this.sellForm.get('price')!.value));

      this._http.post<Car>('http://localhost:5113/car/post', formData)
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
