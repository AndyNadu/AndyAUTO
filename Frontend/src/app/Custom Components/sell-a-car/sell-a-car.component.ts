// angular
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

// angular material components
import { MatInputModule } from '@angular/material/input';

// primeNG components
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// data objects
import { CarPost } from '../../Data Objects/CarPost';

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

  // services
  _componentInteractionService: ComponentInteractionService;

  // input variables
  carPost: CarPost = new CarPost();

  // constructor
  constructor(_componentInteractionService: ComponentInteractionService,
              formBuilder: FormBuilder) {
    this._componentInteractionService = _componentInteractionService;
    this.carPost.formGroup = formBuilder.group({
      description: ['']
    });
  }

  // methods
  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }

  submitPost(): void {
    this.carPost.buttonSubmitted = true;
    this.carPost.checkForEmptyInputs();
  }
}
