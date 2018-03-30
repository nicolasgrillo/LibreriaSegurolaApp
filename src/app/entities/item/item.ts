export class Item {
    ItemID: number;
    isbn: string;
    title: string;
    publisher: string;
    amount: number;
    receiptCode: string;
    price: number;
    returnDate: Date;

    public static fromJsonArray(json: any): Item[] {
        const items: Item[] = new Array<Item>();
        for (const item of json) {
          const newItem: Item = new Item();
          newItem.ItemID = item.ItemID;
          newItem.amount = item.Amount;
          newItem.isbn = item.Isbn;
          newItem.price = item.Price;
          newItem.publisher = item.Publisher;
          newItem.receiptCode = item.ReceiptCode;
          newItem.returnDate = item.ReturnDate;
          newItem.title = item.Title;
          items.push(newItem);
        }
        return items;
    }

    public static fromJson(json: any): Item {
      const items = [ json ];
      return Item.fromJsonArray(items)[0];
    }
}
