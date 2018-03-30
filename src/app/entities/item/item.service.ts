import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Item } from './item';
import 'rxjs/Rx';

@Injectable()
export class ItemService {

  url = "https://webapilibreriasegurola.azurewebsites.net/api/items"
  constructor(private httpClient: HttpClient) { }

  getItems(): Observable<Item[]> {  
    return this.httpClient.get(this.url)  
    .map((res: Response) => Item.fromJsonArray(res))  
    .catch((error: any) => Observable.throw(error || 'Server error'));  
  }
  
  postItem(item : Item): Observable<Item> {
    let body = JSON.stringify(item);
    return this.httpClient.post(this.url, body)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }     
}
