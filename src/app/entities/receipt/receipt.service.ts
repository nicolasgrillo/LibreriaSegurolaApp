import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Receipt } from './receipt';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class ReceiptService {

  url = "https://webapilibreriasegurola.azurewebsites.net/api/receipts"

  constructor(private httpClient: HttpClient) { }

  getReceipts(): Observable<Receipt[]> {  
    return this.httpClient.get(this.url)  
    .map((res: Response) => Receipt.fromJsonArray(res))  
    .catch((error: any) => Observable.throw(error.message || 'Server error'));  
  }

  saveReceipt(receipt : Receipt): Observable<Receipt> {    
    let body = JSON.stringify(receipt);
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
    return this.httpClient.post(this.url, body, httpOptions)
    .catch((error:any) => Observable.throw(error.message || 'Server error'));
  }   
}
