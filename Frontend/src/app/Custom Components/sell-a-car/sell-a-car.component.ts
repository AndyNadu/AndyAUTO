import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


// angular material components
import { MatInputModule } from '@angular/material/input';

// primeNG components
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';


// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-sell-a-car',
  standalone: true,
  imports: [
    FormsModule,

    MatInputModule,

    DropdownModule,
    FileUploadModule,
    HttpClientModule,
    InputTextareaModule
  ],
  templateUrl: './sell-a-car.component.html',
  styleUrl: './sell-a-car.component.css'
})
export class SellACarComponent {

  _componentInteractionService: ComponentInteractionService;

  constructor(_componentInteractionService: ComponentInteractionService) {
    this._componentInteractionService = _componentInteractionService;
  }

  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }


  selectedCity: any | undefined;

  cities: any = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];


}
