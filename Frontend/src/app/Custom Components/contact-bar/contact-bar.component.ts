import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-bar',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './contact-bar.component.html',
  styleUrl: './contact-bar.component.css'
})
export class ContactBarComponent {

  constructor(_library: FaIconLibrary) {
    _library.addIcons(faPhone, faEnvelope, faClock);
  }

}
