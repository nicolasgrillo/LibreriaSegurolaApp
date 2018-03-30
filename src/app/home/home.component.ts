import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatFormField, MatSort } from '@angular/material';
import { ItemService } from '../entities/item/item.service';
import { Item } from '../entities/item/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns = ['isbn', 'title', 'publisher', 'price']

  items: Item[] = [];
  dataSource; 

  constructor(private itemService : ItemService) { }

  ngOnInit() {
    this.getItems()  
  }

  ngAfterViewInit() {    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getItems(){
    this.itemService.getItems().subscribe(
      (respItems: Item[]) => {
        this.items = respItems;
        this.dataSource = new MatTableDataSource<Item>(this.items);
        this.dataSource.sort = this.sort;
        console.log(respItems);
      },
      error => {
        alert(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
