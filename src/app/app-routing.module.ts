import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { ExcelImportComponent } from './excel-import/excel-import.component';
import { HelpComponent } from './help/help.component';
import { PolicyComponent } from './policy/policy.component';
import { TermsComponent } from './terms/terms.component';

const routes : Routes = [
  {path : '', component : HomeComponent},
  {path: 'excel-import', component: ExcelImportComponent},
  {path: 'help', component: HelpComponent},
  {path: 'policy', component: PolicyComponent},
  {path: 'terms', component: TermsComponent},
  {path: '**', redirectTo: ''}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
