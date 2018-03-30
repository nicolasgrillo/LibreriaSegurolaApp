import { Component, OnInit } from '@angular/core';
import { ItemService } from '../entities/item/item.service';
import { Item } from '../entities/item/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
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
