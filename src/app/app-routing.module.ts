import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { ExcelImportComponent } from './excel-import/excel-import.component';

const routes : Routes = [
  {path : '', component : HomeComponent},
  {path: 'excel-import', component: ExcelImportComponent},
  {path: '**', redirectTo: ''}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
