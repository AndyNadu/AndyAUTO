// angular
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // importul pentru HttpClientModule


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
 
}
