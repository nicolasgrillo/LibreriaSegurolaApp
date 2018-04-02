import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Sheet } from './sheet';
import 'rxjs/Rx';

@Injectable()
export class SheetService {

  url = "https://webapilibreriasegurola.azurewebsites.net/api/sheets"

  constructor(private httpClient: HttpClient) { }

  getSheets(): Observable<Sheet[]> {  
    return this.httpClient.get(this.url)  
    .map((res: Response) => Sheet.fromJsonArray(res))  
    .catch((error: any) => Observable.throw(error.message || 'Server error'));  
  }

  saveSheet(sheet : Sheet): Observable<Sheet> {    
    let body = JSON.stringify(sheet);
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
    return this.httpClient.post(this.url, body, httpOptions)
    .catch((error:any) => Observable.throw(error.message || 'Server error'));
  }   
}
