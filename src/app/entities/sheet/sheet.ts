export class Sheet {
    shipDate: Date;

    public static fromJsonArray(json: any): Sheet[] {
        const Sheets: Sheet[] = new Array<Sheet>();
        for (const Sheet of json) {
          const newSheet: Sheet = new Sheet();
          newSheet.shipDate = Sheet.ShipDate;          
          Sheets.push(newSheet);
        }
        return Sheets;
      }
  
      public static fromJson(json: any): Sheet {
        const Sheets = [ json ];
        return Sheet.fromJsonArray(Sheets)[0];
      }
}
