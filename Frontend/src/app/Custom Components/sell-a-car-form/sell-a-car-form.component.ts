import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileRemoveEvent, FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { Car } from '../../Interfaces/Car';
import { ErrorConstants } from '../../Constants/Text Contants/Error-constants';
import { CarService } from '../../Services/CarService/car.service';
import { CarDetails } from '../../Interfaces/Car-details';

@Component({
  selector: 'app-sell-a-car-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    InputTextareaModule,
    InputNumberModule,
    HttpClientModule,
    FileUploadModule,
    InputTextModule,
    DropdownModule,
    DialogModule
  ],
  templateUrl: './sell-a-car-form.component.html',
  styleUrl: './sell-a-car-form.component.css'
})
export class SellACarFormComponent {

  sellForm: FormGroup;
  images: Set<File> = new Set<File>();
  imagesEmpty: boolean = false;
  carDetails: CarDetails = this._carService.getCarDetails();
  errorConstants: ErrorConstants = new ErrorConstants();
  error: string = '';
  submitLoading: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private _carService: CarService,
              private _http: HttpClient,
              private _router: Router) {
    this.sellForm = this._formBuilder.group({
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
      price: ['', [Validators.required, Validators.pattern('^[0-9]{1,8}$')]]
    });
  }

  onMakeSelected(): void {
    this.carDetails.models = this._carService.getCarModelsForOneSelectedMake(this.sellForm.get('make')!.value);
  }
  onImageSelected(event: FileSelectEvent): void {
    const lastAddedImage: File = event.files[event.files.length - 1];
    this.imageAlreadySelected(lastAddedImage) ? null : this.images.add(lastAddedImage);
    this.imagesEmpty = this.images.size === 0 ? true : false;
  }
  imageAlreadySelected(image: File): boolean {
    for (const image of this.images)
      if (image.type == image.type && image.name == image.name && image.size == image.size) 
        return true;

    return false;
  }
  onImageRemoved(event: FileRemoveEvent): void {
    this.images.delete(event.file);
    this.imagesEmpty = this.images.size === 0 ? true : false;
  }
  submit(): void {
    this.error = this.markAsDirty();

    if (!this.error) {
      this.submitLoading = true;
      this.tryHttpRequest();
    }
  }
  tryHttpRequest(): void {
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
      .subscribe({
        next: (car: Car) => {
          setTimeout( () => {
            this.submitLoading = false;
            this._router.navigateByUrl('/account/my-cars');
          }, 1000)
        },
        error: (error: HttpErrorResponse) => {
          setTimeout( () => {
            this.error = error.status === 0 ? this.errorConstants.unexpectedError : error.error;
            this.submitLoading = false;
          }, 1000)
        }});
  }
  markAsDirty(): string {
    let error: string = '';

    this.imagesEmpty = this.images.size === 0 ? true : false;

    if (this.imagesEmpty) 
      error = this.errorConstants.emptyFields;

    Object.keys(this.sellForm.controls).forEach(key => {
      const control: AbstractControl | null = this.sellForm.get(key);

      if (control?.hasError('required')) {
        error = this.errorConstants.emptyFields;
        control.markAsDirty();
      } else if (key === 'year' && control?.hasError('pattern') && error == '') {
        error = this.errorConstants.yearInvalid;
        control.markAsDirty();
      } else if (key === 'mileage' && control?.hasError('pattern') && error == '') {
        error = this.errorConstants.mileageInvalid;
        control.markAsDirty();
      } else if (key === 'cubicCapacity' && control?.hasError('pattern') && error == '') {
        error = this.errorConstants.cubicCapacityInvalid;
        control.markAsDirty();
      } else if (key === 'power' && control?.hasError('pattern') && error == '') {
        error = this.errorConstants.powerInvalid;
        control.markAsDirty();
      } else if (key === 'price' && control?.hasError('pattern') && error == '') {
        error = this.errorConstants.priceInvalid;
        control.markAsDirty();
      }
    });

    return error;
  }
}
