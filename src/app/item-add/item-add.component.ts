import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ItemService } from '../entities/item/item.service';
import { ExportItem } from '../entities/item/item';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  bookForm : FormGroup;
  bookFound : ExportItem;
  newBook : ExportItem;
  receiptCode : string;
  datePicked: any = { date: { year: 2018, month: 10, day: 9 } };
  INgxMyDpOptions = {
    // other options...
    jsdate: new Date(),
    dateFormat: 'dd/mm/yyyy'
  };
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

  onSubmit() {
    this.newBook = this.prepareSaveBook();
    this.itemService.saveItem(this.newBook).subscribe(/* error handling */);
    this.rebuildForm();
  }

  getBook(e){
    this.showLoadingSpinner();
    this.itemService.getItemForExport(e).subscribe(
      (respItem: ExportItem) => {
        this.bookFound = respItem;
        this.newBook = respItem;
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
      isbn: ['', Validators.required ],
      title: ['', Validators.required ],
      publisher: ['', Validators.required ],
      price: ['', Validators.required ],
      receipt: ['', Validators.required ],
      sheet: ['', Validators.required ]
    });

    this.bookForm.get('title').disable();
    this.bookForm.get('publisher').disable();
    this.bookForm.get('price').disable();
    this.bookForm.get('receipt').disable();
    this.bookForm.get('sheet').disable();
  }
  
  rebuildForm(){
    this.bookForm = this.fb.group({
      isbn: [this.bookFound.isbn , Validators.required],
      title: [this.bookFound.title , Validators.required],
      publisher: [this.bookFound.publisher , Validators.required],
      price: [this.bookFound.price , Validators.required],
      receipt: [this.receiptCode, Validators.required],
      sheet: [this.datePicked, Validators.required]       
    });
    this.bookForm.get('title').enable();
    this.bookForm.get('publisher').enable();
    this.bookForm.get('price').enable();
    this.bookForm.get('receipt').enable();
    this.bookForm.get('sheet').enable();
  }

  prepareSaveBook() : ExportItem{
    const formModel = this.bookForm.value;
    var formattedDate : String = this.bookForm.controls["sheet"].value.date.day + "/" + this.bookForm.controls["sheet"].value.date.month + "/" + this.bookForm.controls["sheet"].value.date.year;

    const saveBook: ExportItem = {
      title: formModel.title as string,
      publisher: formModel.publisher as string,
      price: formModel.price as number,
      receiptCode: formModel.receipt as string,
      returnDate: formattedDate as string,
      isbn: formModel.isbn as string,
      amount: 1
    };
    return saveBook;
  }

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }

}
