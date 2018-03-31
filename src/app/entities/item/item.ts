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
        newItem.ItemID = item.itemID;
        newItem.amount = item.amount;
        newItem.isbn = item.isbn;
        newItem.price = item.price;
        newItem.publisher = item.publisher;
        newItem.receiptCode = item.receiptCode;
        newItem.returnDate = item.returnDate;
        newItem.title = item.title;
        items.push(newItem);
      }
      return items;
    }

    public static fromJson(json: any): Item {
      const items = [ json ];
      return Item.fromJsonArray(items)[0];
    }
}

export class ExportItem{
  isbn: string;
  title: string;
  publisher: string;
  amount: number;
  receiptCode: string;
  price: number;
  returnDate: string;
}
