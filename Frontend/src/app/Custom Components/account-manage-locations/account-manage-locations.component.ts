import { Component } from '@angular/core';
import { LocationConstants } from '../../Constants/Value Constants/Location-constants';
import { ButtonModule } from 'primeng/button';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorConstants } from '../../Constants/Text Contants/Error-constants';
import { LocationDTO } from '../../Data Transfer Objects (DTOs)/LocationDTO';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FileRemoveEvent, FileSelectEvent, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-account-manage-locations',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FontAwesomeModule,
    AccordionModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
  ],
  templateUrl: './account-manage-locations.component.html',
  styleUrl: './account-manage-locations.component.css'
})
export class AccountManageLocationsComponent {

  locationForm: FormGroup;
  locations: LocationConstants = new LocationConstants();
  errorConstants: ErrorConstants = new ErrorConstants();
  error: string = '';
  image?: File = undefined;
  imageEmpty: boolean = false;

  employeesList = ['(none)', 'alex velea'];
  
  addLocationLoading: boolean = false;
  deleteLocationLoading: boolean = false;
  
  constructor(private _formBuilder: FormBuilder,
              private _http: HttpClient,
              library: FaIconLibrary) {
    this.locationForm = this._formBuilder.group({
      address: ['', Validators.required,],
      manager: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(?:\\d{4}\\s?\\d{3}\\s?\\d{3}|\\d{10})$')]]
    });

    library.addIcons(faPlus);
    library.addIcons(faTrash);
  }

  onImageSelected(event: FileSelectEvent): void {
    this.image = event.files[0];
    this.imageEmpty = this.image == null ? true : false;
  }
  onImageRemoved(event: FileRemoveEvent): void {
    this.image = undefined;
    this.imageEmpty = true;
  }
  addLocation(): void {
    this.error = this.markAsDirty();

    if (!this.error) {
      this.addLocationLoading = true;
      this.tryHttpRequest();
    }
  }
  deleteLocation(): void {
  }
  markAsDirty(): string {
    let error: string = '';

    if (this.image == null) {
      this.imageEmpty = true;
      error = this.errorConstants.emptyFields;
    }

    Object.keys(this.locationForm.controls).forEach(key => {
      const control: AbstractControl | null = this.locationForm.get(key);

      if (control?.hasError('required')) {
        error = this.errorConstants.emptyFields;
        control.markAsDirty();
      } else if (key === 'phoneNumber' && control?.hasError('pattern') && error == '') {
        error = this.errorConstants.phoneInvalid;
        control.markAsDirty();
      }
    });

    return error;
  }
  tryHttpRequest(): void {
    const formData: FormData = this.buildFormData();

    this._http.post<LocationDTO>('http://localhost:5113/account/manage/add-location', formData)
    .subscribe({
      next: (result: LocationDTO) => {
        setTimeout( () => {
          this.addLocationLoading = false;
        }, 1000)

      },
      error: (error: HttpErrorResponse) => {
        setTimeout( () => {
          this.error = error.status === 0 ? this.errorConstants.unexpectedError : error.error;
          this.addLocationLoading = false;
        }, 1000)
      }
    })
  }
  buildFormData(): FormData {
    const formData: FormData = new FormData();

    formData.append('address', String(this.locationForm.get('address')!.value));
    formData.append('manager', String(this.locationForm.get('manager')!.value));
    formData.append('phoneNumber', String(this.locationForm.get('phoneNumber')!.value));
    formData.append('image', this.image!);

    return formData;
  }
}
