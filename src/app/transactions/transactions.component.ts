import {Component, OnInit} from '@angular/core';
import {Transaction} from '../Models/Transaction';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IncomeStatementType} from '../Models/IncomeStatementType';
import 'bootstrap/dist/js/bootstrap.bundle';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../environments/environment';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {RuleDialogComponent} from '../rule-dialog/rule-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactionList: Transaction[];
  incomeStatementTypeList: IncomeStatementType[];
  formGroup: FormGroup;
  isLoggedIn = false;
  header = new HttpHeaders().set('Authorization', this.tokenStorage.getToken());

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private dialog: MatDialog) {
    this.formGroup = this.formBuilder.group({
      arr: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.getTransactionsByUser();
    } else {
      this.getSessionStorageData();
    }
    this.getIncomeStatementTypes();
  }

  changeIncomeStatementType(t, event: any) {
    const selected = event.target.options[event.target.selectedIndex].text;
    if (this.isLoggedIn) {
      this.http.post(environment.apiUrl + 'transactions/update/' + t.id
        , selected.split(' ')[1])
        .subscribe(
          (val) => {
            console.log('POST call successful value returned in body',
              val);
          },
          response => {
            console.log('POST call in error', response);
          },
          () => {
            console.log('The POST observable is now completed. ');
          });
    }
    const index = this.transactionList.indexOf(t);
    t.incomeStatementType = selected.split(' ')[1];
    this.transactionList[index] = t;
    sessionStorage.setItem('sessionTransactions', JSON.stringify(this.transactionList));
  }

  refresh(): void {
    window.location.reload();
  }

  remove(id: any): void {
    this.http.delete<Transaction>(environment.apiUrl + 'transactions/delete/' + id).subscribe(
      (val) => {
        console.log('DELETE call successful');
        this.getTransactionsByUser();
      },
      response => {
        console.log('DELETE call in error', response);
      },
      () => {
        console.log('The DELETE observable is now completed. ');
      });
  }

  getTransactionsByUser(): void {
    this.http.get<Transaction[]>(environment.apiUrl + 'transactions/all', {headers: this.header}).subscribe(result => {
      this.transactionList = result;
    }, error => console.log(error));
  }

  addRule(beneficiaryOrPayerAccount: string, beneficiaryOrPayerName: string, detailss: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      details: detailss,
      transactionBeneficiaryOrPayerAccount: beneficiaryOrPayerAccount,
      transactionBeneficiaryOrPayerName: beneficiaryOrPayerName
    };

    console.log(beneficiaryOrPayerAccount, beneficiaryOrPayerName, detailss);
    const dialogRef = this.dialog.open(RuleDialogComponent, dialogConfig);
  }

  private getSessionStorageData() {
    this.transactionList = JSON.parse(sessionStorage.getItem('sessionTransactions'));
  }

  private getIncomeStatementTypes() {
    this.http.get<IncomeStatementType[]>(environment.apiUrl + 'incomeStatement/all').subscribe(result => {
      this.incomeStatementTypeList = result;
    }, error => console.log(error));
  }
}
