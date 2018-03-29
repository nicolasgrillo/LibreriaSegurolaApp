import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'ls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Libreria Segurola';

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
  
}
