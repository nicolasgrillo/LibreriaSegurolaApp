import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from '../entities/item/item.service';
import { Item } from '../entities/item/item';

@Component({
  selector: 'app-item-query',
  templateUrl: './item-query.component.html',
  styleUrls: ['./item-query.component.css']
})
export class ItemQueryComponent implements OnInit {

  bookForm : FormGroup;
  bookFound : Item;
  public showSpinner: boolean = false;

  constructor(private fb: FormBuilder,
  private itemService: ItemService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  ngOnChanges(){
    this.rebuildForm();
  }

  getBook(e){
    this.showLoadingSpinner();
    this.itemService.getItem(e).subscribe(
      (respItem: Item) => {
        this.bookFound = respItem;
        this.hideLoadingSpinner();
        this.rebuildForm()
      },
      error => {
        this.hideLoadingSpinner();
        alert(error);
      }
    );
    
  }

  createForm() {
    this.bookForm = this.fb.group({
      isbn: '',
      title: '',
      publisher: '',
      price: ''
    });

    this.bookForm.get('title').disable();
    this.bookForm.get('publisher').disable();
    this.bookForm.get('price').disable();
  }
  
  rebuildForm(){
    this.bookForm.reset({
      isbn: this.bookFound.isbn || '',
      title: this.bookFound.title || '',
      publisher: this.bookFound.publisher || '',
      price: this.bookFound.price || ''      
    });

    this.bookForm.get('title').disable();
    this.bookForm.get('publisher').disable();
    this.bookForm.get('price').disable();
  }

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }
}
