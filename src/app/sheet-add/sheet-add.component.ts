import { Component, OnInit, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl  } from '@angular/forms';
import { SheetService } from '../entities/sheet/sheet.service';
import { Sheet } from '../entities/sheet/sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sheet-add',
  templateUrl: './sheet-add.component.html',
  styleUrls: ['./sheet-add.component.css']
})
export class SheetAddComponent implements OnInit {

  sheetForm : FormGroup;
  newSheet : Sheet = new Sheet();
  error: string;
  datePicked: any;
  INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy'
  };
  public showSpinner: boolean = false;

  errorMsgShipDate : string;
  validationMsg = 'Tiene que ingresar una fecha para la sábana';
  
  constructor(private fb: FormBuilder,
    private sheetService: SheetService,
    private router: Router) {      
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    if (this.sheetForm.dirty && this.sheetForm.valid){
      this.newSheet = this.prepareSaveSheet();
      this.error = null;
      this.sheetService.saveSheet(this.newSheet)
        .finally(() => {
          this.showSpinner = false;
        })
        .subscribe(
          (res) =>  {
            //Saved!
            console.log("Saved: ");
            console.log(res);
            this.router.navigate(['/sheet-add']);
            this.newSheet = new Sheet();
            this.createForm();
          },
          (err: any) => {
            if (err.status == 409) this.error = "No se puede agregar: La sabana ya existe";
            else this.error = err;
          }
        );
    }
  }

  createForm() {
    this.sheetForm = this.fb.group({
      shipDate: [this.newSheet.shipDate, [Validators.required]]      
    });

    const shipDateControl: AbstractControl = this.sheetForm.get('shipDate');

    shipDateControl.valueChanges.subscribe((v: any) => this.errorMsgShipDate = this.setMessage(shipDateControl));
  }
  
  prepareSaveSheet() : Sheet{    
    this.showSpinner = true;
    const formModel = this.sheetForm.value;
    const date = this.sheetForm.controls.shipDate.value.formatted;
    const saveSheet: Sheet = {
      shipDate: date as Date
    };
    return saveSheet;
  }

  setMessage(control: AbstractControl): string {
		if ((control.touched || control.dirty) && control.errors) {
			return Object.keys(control.errors).map(
        (key: string) => this.validationMsg
      ).join(' ');
		}
		return '';
  }

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }

}
