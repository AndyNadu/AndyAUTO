// angular
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

// angular material components
import { MatInputModule } from '@angular/material/input';

// primeNG components
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// models && DTOs
import { CarsList } from '../../Constants/CarsList';

@Component({
  selector: 'app-sell-a-car',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,

    DropdownModule,
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

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
    this.sellForm = this.formBuilder.group({
      make: ['', Validators.required]
    });
  }

  // methods
  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }

  submit(): void {
    Object.keys(this.sellForm.controls).forEach(key => {
      const control = this.sellForm.get(key);
      control!.markAsDirty();
    });

  }
}
