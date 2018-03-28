import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { ExcelImportComponent } from './excel-import/excel-import.component';
import { HelpComponent } from './help/help.component';

const routes : Routes = [
  {path : '', component : HomeComponent},
  {path: 'excel-import', component: ExcelImportComponent},
  {path: 'help', component: HelpComponent},
  {path: '**', redirectTo: ''}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
