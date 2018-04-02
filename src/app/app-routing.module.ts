import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { ExcelImportComponent } from './excel-import/excel-import.component';
import { HelpComponent } from './help/help.component';
import { PolicyComponent } from './policy/policy.component';
import { TermsComponent } from './terms/terms.component';
import { ContactComponent } from './contact/contact.component';

import { AuthGuard } from './auth/auth.guard';
import { StockComponent } from './stock/stock.component';
import { ItemQueryComponent } from './item-query/item-query.component';
import { ItemAddComponent } from './item-add/item-add.component';
import { SheetAddComponent } from './sheet-add/sheet-add.component';
import { ReceiptAddComponent } from './receipt-add/receipt-add.component';
import { CallbackComponent } from './callback/callback.component';

const routes : Routes = [
  {path: '', component : HomeComponent},
  {path: 'stock', component: StockComponent},
  {path: 'excel-import', component: ExcelImportComponent, canActivate: [AuthGuard]},
  {path: 'item-query', component: ItemQueryComponent, canActivate: [AuthGuard]},
  {path: 'item-add', component: ItemAddComponent, canActivate: [AuthGuard]},
  {path: 'sheet-add', component: SheetAddComponent, canActivate: [AuthGuard]},
  {path: 'receipt-add', component: ReceiptAddComponent, canActivate: [AuthGuard]},
  {path: 'contact', component: ContactComponent},
  {path: 'help', component: HelpComponent},
  {path: 'policy', component: PolicyComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'callback', component: CallbackComponent},
  {path: '**', redirectTo: ''}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
