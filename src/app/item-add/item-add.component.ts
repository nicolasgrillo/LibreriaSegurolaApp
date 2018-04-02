import { Component, OnInit, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl  } from '@angular/forms';
import { ItemService } from '../entities/item/item.service';
import { Item } from '../entities/item/item';
import { Router } from '@angular/router';
import { Receipt } from '../entities/receipt/receipt';
import { ReceiptService } from '../entities/receipt/receipt.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  @ViewChildren('isbnInput') isbnInput : QueryList<ElementRef>;

  bookForm : FormGroup;
  bookFound : Item;
  newBook : Item = new Item();
  receipts : Receipt[] = [];
  selectedReceipt : string;
  error: string;
  datePicked: any;
  INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy'
  };
  public showSpinner: boolean = false;

  errorMsgIsbn : string;
  errorMsgPublisher : string;
  errorMsgPrice : string;
  errorMsgTitle : string;
  errorMsgReceipt : string;
  errorMsgReturnDate : string;
  validationMsg = 'El campo es requerido';
  
  constructor(private fb: FormBuilder,
    private itemService: ItemService,
    private receiptService: ReceiptService,
    private router: Router) {      
  }

  ngOnInit() {
    this.getReceipts();
    this.createForm();
  }

  ngAfterViewInit(): void {
		if (!this.isbnInput.first) {
			this.isbnInput.changes.subscribe(
				(change: any) => this.focusInput()
			)
		}
		else {
			this.focusInput()
		}
	}

  onSubmit() {
    if (this.bookForm.dirty && this.bookForm.valid){
      this.newBook = this.prepareSaveBook();
      this.error = null;
      this.itemService.saveItem(this.newBook)
        .finally(() => {
          this.showSpinner = false;
        })
        .subscribe(
          () =>  {
            //Saved!
            this.router.navigate(['/item-add'])
            this.newBook = new Item();
            this.createForm();
          },
          (err: any) => this.error = err
        );
    }
  }
  getReceipts(){
    this.showLoadingSpinner;
    this.receiptService.getReceipts().subscribe(
      (respReceipts: Receipt[]) => {
        this.receipts = respReceipts;
        this.hideLoadingSpinner();
      },
      err => {
        this.hideLoadingSpinner();
        this.error = err;
      })     
  }

  getBook(e){
    this.showLoadingSpinner();
    this.itemService.getItemForExport(e).subscribe(
      (respItem: Item) => {
        this.bookFound = respItem;
        this.newBook = respItem;
        this.createForm();
        this.hideLoadingSpinner();
        this.enableInputs()
      },
      error => {
        this.hideLoadingSpinner();
        alert(error);
      }
    );
  }

  createForm() {
    this.bookForm = this.fb.group({
      isbn: [this.newBook.isbn, [Validators.required]],
      title: [this.newBook.title, [Validators.required]],
      publisher: [this.newBook.publisher, [Validators.required]],
      price: [this.newBook.price, [Validators.required]],
      receipt: [this.selectedReceipt, [Validators.required]],
      returnDate: [this.newBook.returnDate, [Validators.required]]
    });

    this.bookForm.get('title').disable();
    this.bookForm.get('publisher').disable();
    this.bookForm.get('price').disable();
    this.bookForm.get('returnDate').disable();

    const isbnControl: AbstractControl = this.bookForm.get('isbn');
    const titleControl: AbstractControl = this.bookForm.get('title');
    const publisherControl: AbstractControl = this.bookForm.get('publisher');
    const priceControl: AbstractControl = this.bookForm.get('price');
    const receiptControl: AbstractControl = this.bookForm.get('receipt');
    const returnDateControl: AbstractControl = this.bookForm.get('returnDate');

    isbnControl.valueChanges.subscribe((v: any) => this.errorMsgIsbn = this.setMessage(isbnControl));
    titleControl.valueChanges.subscribe((v: any) => this.errorMsgTitle = this.setMessage(titleControl));
    publisherControl.valueChanges.subscribe((v: any) => this.errorMsgPublisher = this.setMessage(publisherControl));
    priceControl.valueChanges.subscribe((v: any) => this.errorMsgPrice = this.setMessage(priceControl));
    receiptControl.valueChanges.subscribe((v: any) => this.errorMsgReceipt = this.setMessage(receiptControl));
    returnDateControl.valueChanges.subscribe((v: any) => this.errorMsgReturnDate = this.setMessage(returnDateControl));
  }
  
  enableInputs(){
    this.bookForm.get('title').enable();
    this.bookForm.get('publisher').enable();
    this.bookForm.get('price').enable();
    this.bookForm.get('returnDate').enable();
  }

  prepareSaveBook() : Item{    
    this.showSpinner = true;
    const formModel = this.bookForm.value;
    var formattedDate = this.formatDatePicked(this.bookForm);
    var dateString = formattedDate.split('/');

    const saveBook: Item = {
      title: formModel.title as string,
      publisher: formModel.publisher as string,
      price: formModel.price as number,
      receiptCode: formModel.receipt as string,
      returnDate: new Date(parseInt(dateString[2]), parseInt(dateString[1]), parseInt(dateString[0])),
      isbn: formModel.isbn as string,
      amount: 1
    };
    return saveBook;
  }

  private formatDatePicked(bf: any): String {
    var dayPicked = bf.controls["returnDate"].value.date.day;
    dayPicked = parseInt(dayPicked, 10);
    var monthPicked = bf.controls["returnDate"].value.date.month;
    monthPicked = parseInt(monthPicked, 10);
    var yearPicked = bf.controls["returnDate"].value.date.year;
    return dayPicked + "/" + monthPicked +  "/" + yearPicked;
  }

  setMessage(control: AbstractControl): string {
		if ((control.touched || control.dirty) && control.errors) {
			return Object.keys(control.errors).map(
        (key: string) => this.validationMsg
      ).join(' ');
		}
		return '';
  }

  valueChanges(e){
    this.selectedReceipt = e;
    console.log(this.selectedReceipt);
  }
  
  private focusInput(): void {
		this.isbnInput.first.nativeElement.focus();
	}

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }

}
