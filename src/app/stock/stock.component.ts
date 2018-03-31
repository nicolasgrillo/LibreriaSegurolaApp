import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatFormField, MatSort } from '@angular/material';
import { ItemService } from '../entities/item/item.service';
import { Item } from '../entities/item/item';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['isbn', 'title', 'publisher', 'price']
  items: Item[] = [];
  dataSource; 
  public showSpinner: boolean = false;

  constructor(private itemService : ItemService) { }

  ngOnInit() {
    this.getItems()  
  }

  getItems(){
    this.showLoadingSpinner();
    this.itemService.getItems().subscribe(
      (respItems: Item[]) => {
        this.items = respItems;
        this.dataSource = new MatTableDataSource<Item>(this.items);
        this.dataSource.sort = this.sort;
        this.hideLoadingSpinner();
      },
      error => {
        this.hideLoadingSpinner();
        alert(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }

}
