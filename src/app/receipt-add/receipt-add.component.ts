import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Receipt } from '../entities/receipt/receipt';
import { SheetService } from '../entities/sheet/sheet.service';
import { Router } from '@angular/router';
import { ReceiptService } from '../entities/receipt/receipt.service';
import { Sheet } from '../entities/sheet/sheet';

@Component({
  selector: 'app-receipt-add',
  templateUrl: './receipt-add.component.html',
  styleUrls: ['./receipt-add.component.css']
})

export class ReceiptAddComponent implements OnInit {
  
  receiptForm : FormGroup;
  newReceipt : Receipt = new Receipt();
  sheets : Sheet[] = [];
  error: string;
  selectedSheet;
  public showSpinner: boolean = false;

  errorMsgReceiptCode : string;
  errorMsgSheet : string;
  validationMsg = 'Campo requerido';

  constructor(private fb: FormBuilder,
    private sheetService: SheetService,
    private receiptService: ReceiptService,
    private router: Router) {      
  }

  ngOnInit() {
    this.getSheets();
    this.createForm();
  }

  getSheets(): any {
    this.showLoadingSpinner();
    this.sheetService.getSheets().subscribe(
      (respSheets: Sheet[]) => {
        this.sheets = respSheets;
        this.hideLoadingSpinner();
      },
      error => {
        this.hideLoadingSpinner();
        alert(error);
      }
    );
  }

  onSubmit() {
    if (this.receiptForm.dirty && this.receiptForm.valid){
      this.newReceipt = this.prepareSaveReceipt();
      this.error = null;
      this.receiptService.saveReceipt(this.newReceipt)
        .finally(() => {
          this.showSpinner = false;
        })
        .subscribe(
          (res) =>  {
            //Saved!
            console.log("Saved: ");
            console.log(res);
            this.router.navigate(['/receipt-add']);
            this.newReceipt = new Receipt();
            this.createForm();
          },
          (err: any) => this.error = err
        );
    }
  }

  createForm() {
    this.receiptForm = this.fb.group({
      receiptCode: [this.newReceipt.receiptCode, [Validators.required]],
      sheetId: [this.newReceipt.sheetId, [Validators.required]]    
    });

    const receiptCodeControl: AbstractControl = this.receiptForm.get('receiptCode');
    const sheetIdControl: AbstractControl = this.receiptForm.get('sheetId');

    receiptCodeControl.valueChanges.subscribe((v: any) => this.errorMsgReceiptCode = this.setMessage(receiptCodeControl));
    sheetIdControl.valueChanges.subscribe((v: any) => this.errorMsgReceiptCode = this.setMessage(sheetIdControl));
  }
  
  
  prepareSaveReceipt() : Receipt{    
    this.showSpinner = true;
    const formModel = this.receiptForm.value;
    const saveReceipt: Receipt = {
      receiptCode: formModel.receiptCode as string,
      sheetId: this.selectedSheet as number
    };
    return saveReceipt;
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
    this.selectedSheet = e;
  }

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }


}
