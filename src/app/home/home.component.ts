import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lat: number = -34.6247782;
  lng: number = -58.4940921;
  zoom: number = 20;

  constructor() { }

  ngOnInit() {
  }

}
