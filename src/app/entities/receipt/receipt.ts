export class Receipt {
    receiptCode: string;
    sheetId: number;

    public static fromJsonArray(json: any): Receipt[] {
        const Receipts: Receipt[] = new Array<Receipt>();
        for (const Receipt of json) {
          const newReceipt: Receipt = new Receipt();
          newReceipt.receiptCode = Receipt.receiptCode;   
          newReceipt.sheetId = Receipt.ReceiptId;      
          Receipts.push(newReceipt);
        }
        return Receipts;
      }
  
      public static fromJson(json: any): Receipt {
        const Receipts = [ json ];
        return Receipt.fromJsonArray(Receipts)[0];
      }
}
