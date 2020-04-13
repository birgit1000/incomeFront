import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { IncomeStatementTypesComponent } from './income-statement-types/income-statement-types.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './rules/rules.component';
import { ReportComponent } from './report/report.component';
import { RuleDialogComponent } from './rule-dialog/rule-dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StorageServiceModule} from 'angular-webstorage-service';
import {environment} from '../environments/environment';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'upload', component: UploadComponent},
  { path: 'transactions', component: TransactionsComponent},
  { path: 'incomeStatementTypes', component: IncomeStatementTypesComponent},
  { path: 'rules', component: RulesComponent},
  { path: 'report', component: ReportComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    HomeComponent,
    NavbarComponent,
    UploadComponent,
    TransactionsComponent,
    IncomeStatementTypesComponent,
    RulesComponent,
    ReportComponent,
    RuleDialogComponent
  ],
  entryComponents: [RuleDialogComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
      CommonModule,
      MatDialogModule,
      BrowserAnimationsModule
    ],
  providers: [{ provide: 'BASE_API_URL', useValue: environment.apiUrl }],
  bootstrap: [AppComponent]
})
export class AppModule { }
