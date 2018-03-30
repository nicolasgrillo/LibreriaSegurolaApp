import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { AgmCoreModule } from '@agm/core';
import { MatPaginatorModule } from '@angular/material/paginator';


import { AppComponent } from './app.component';
import { ExcelImportComponent } from './excel-import/excel-import.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { PolicyComponent } from './policy/policy.component';
import { TermsComponent } from './terms/terms.component';

import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemService } from './entities/item/item.service';
import { ReceiptService } from './entities/receipt/receipt.service';
import { SheetService } from './entities/sheet/sheet.service';
import { ContactComponent } from './contact/contact.component';
import { StockComponent } from './stock/stock.component';

@NgModule({
  declarations: [
    AppComponent,
    ExcelImportComponent,
    HomeComponent,
    HelpComponent,
    PolicyComponent,
    TermsComponent,
    CallbackComponent,
    ProfileComponent,
    ContactComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD0nwEmfpyYQKpj2mBzG6mk62nN8YIJwuQ'
    })
  ],
  providers: [AuthService, 
    HttpClientModule,
    ItemService, 
    ReceiptService, 
    SheetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
