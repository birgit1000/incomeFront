import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UploadComponent} from './upload/upload.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {IncomeStatementTypesComponent} from './income-statement-types/income-statement-types.component';
import {RulesComponent} from './rules/rules.component';
import {ReportComponent} from './report/report.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ReportDialogComponent} from './all-reports/report-dialog.component';
import {AllFilesComponent} from './all-files/all-files.component';
import {InfoComponent} from './info/info.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'upload', component: UploadComponent},
  { path: 'transactions', component: TransactionsComponent},
  { path: 'incomeStatementTypes', component: IncomeStatementTypesComponent},
  { path: 'rules', component: RulesComponent},
  { path: 'report', component: ReportComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'all-reports', component: ReportDialogComponent },
  { path: 'all-files', component: AllFilesComponent },
  { path: 'info', component: InfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
