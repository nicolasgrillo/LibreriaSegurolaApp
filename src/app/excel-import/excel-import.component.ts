import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-excel-import',
  templateUrl: './excel-import.component.html',
  styleUrls: ['./excel-import.component.css']
})
export class ExcelImportComponent implements OnInit {

  search : string = "";
  private index: string | number;
  data;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'Diferencia.xlsx';

  constructor() { }

  ngOnInit() {
  }

  updateIsbn (evt : any){
    this.index = this.data.findIndex(item => item[0] == this.search);
    this.data[this.index][3] -= 1;
    this.data = this.data.filter(item => (item[3] > 0) || (item[3] == "CANTIDAD"));
    this.index = ''; 
    this.search =  '';
  }

  onFileChange (evt: any) {

		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Seleccione 1 solo archivo.');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1, raw: true}));
		};
    reader.readAsBinaryString(target.files[0]);  
  }
  
  export(): void {
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Diferencias');

		/* save to file */
		XLSX.writeFile(wb, this.fileName);
	}

}
