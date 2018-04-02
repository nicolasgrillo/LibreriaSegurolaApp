export class Sheet {
    sheetID? : number = 0;
    shipDate: Date;

    public static fromJsonArray(json: any): Sheet[] {
      const sheets: Sheet[] = new Array<Sheet>();
      for (const sheet of json) {
          const newSheet: Sheet = new Sheet();      
          newSheet.sheetID = sheet.sheetID;
          newSheet.shipDate = new Date(sheet.shipDate);
          sheets.push(newSheet);
        }
        return sheets;
      }
  
      public static fromJson(json: any): Sheet {
        const Sheets = [ json ];
        return Sheet.fromJsonArray(Sheets)[0];
      }
}
