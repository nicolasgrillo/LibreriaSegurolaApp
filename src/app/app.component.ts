import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Libreria Segurola';
  routeLinks:any[];
  activeLinkIndex = 0;
  constructor(private router: Router) {
    this.routeLinks = [
    {label: 'Home', link: '/home'},
    {label: 'Excel', link: '/excel-import'}];

  }
  
}
