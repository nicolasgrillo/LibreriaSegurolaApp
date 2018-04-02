import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Item } from './item';
import 'rxjs/Rx';

@Injectable()
export class ItemService {

  url = "https://webapilibreriasegurola.azurewebsites.net/api/items";
    
  constructor(private httpClient: HttpClient) { }

  getItems(): Observable<Item[]> {  
    return this.httpClient.get(this.url)  
    .map((res: Response) => Item.fromJsonArray(res))  
    .catch((error: any) => Observable.throw(error || 'Server error'));  
  }

  getItemForExport(isbn : string): Observable<Item> {  
    return this.httpClient.get(this.url + "/book/" + isbn)    
    .catch((error: any) => Observable.throw(error || 'Server error'));  
  }

  getItem(isbn : string): Observable<Item> {
    return this.httpClient.get(this.url + "/book/" + isbn)
    .catch((error : any) => Observable.throw(error || 'Server error'));
  }
  
  saveItem(item : Item): Observable<Item> {    
    let body = JSON.stringify(item);
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
    return this.httpClient.post(this.url, body, httpOptions)
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }     
}
