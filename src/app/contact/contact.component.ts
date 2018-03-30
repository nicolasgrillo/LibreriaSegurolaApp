import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  lat: number = -34.6247782;
  lng: number = -58.4940921;
  zoom: number = 20;

  ngOnInit() {
  }

}
