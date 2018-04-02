export class Receipt {
    receiptId? : number = 0;
    receiptCode: string;
    sheetId: number;

    public static fromJsonArray(json: any): Receipt[] {
        const receipts: Receipt[] = new Array<Receipt>();
        for (const receipt of json) {
          const newReceipt: Receipt = new Receipt();
          newReceipt.receiptId = receipt.receiptID;
          newReceipt.receiptCode = receipt.receiptCode;   
          newReceipt.sheetId = receipt.sheetId;      
          receipts.push(newReceipt);
        }
        return receipts;
      }
  
      public static fromJson(json: any): Receipt {
        const Receipts = [ json ];
        return Receipt.fromJsonArray(Receipts)[0];
      }
}
