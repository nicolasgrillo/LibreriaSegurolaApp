import { Component, OnInit } from '@angular/core';
import { ItemService } from '../entities/item/item.service';
import { Item } from '../entities/item/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lat: number = -34.6247782;
  lng: number = -58.4940921;
  zoom: number = 20;
  items: Item[] = [];

  constructor(private itemService : ItemService) { }

  ngOnInit() {
    this.getItems()  
  }

  getItems(){
    this.itemService.getItems().subscribe(
      (respItems: Item[]) => {
        this.items = respItems;
        console.log(respItems);
      },
      error => {
        alert(error);
      }
    );
  }

}
