import { Component, OnInit } from '@angular/core';
import {Transaction} from '../Models/Transaction';
import {HttpClient} from '@angular/common/http';
import {IncomeStatementType} from '../Models/IncomeStatementType';
import 'bootstrap/dist/js/bootstrap.bundle';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactionList: Transaction[];
  incomeStatementTypeList: IncomeStatementType[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {      this.http.get<Transaction[]>('http://localhost:8080/api/transactions/all').subscribe(result => {
    this.transactionList = result;
    }, error => console.log(error));

                          this.http.get<IncomeStatementType[]>('http://localhost:8080/api/incomeStatements/all').subscribe(result => {
      this.incomeStatementTypeList = result;
    }, error => console.log(error));
  }
}
