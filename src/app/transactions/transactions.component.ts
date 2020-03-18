import { Component, OnInit } from '@angular/core';
import {Transaction} from '../Models/Transaction';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IncomeStatementType} from '../Models/IncomeStatementType';
import 'bootstrap/dist/js/bootstrap.bundle';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {parse} from 'ts-node';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactionList: Transaction[];
  incomeStatementTypeList: IncomeStatementType[];
  formGroup: FormGroup;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      arr: this.formBuilder.array([])
    });
  }

  submit() {
    this.http.post('http://localhost:8080/api/transactions/update',
      this.transactionList
      )
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


    console.log(this.transactionList);
  }

  ngOnInit(): void {      this.http.get<Transaction[]>('http://localhost:8080/api/transactions/all').subscribe(result => {
    this.transactionList = result;
    }, error => console.log(error));

                          this.http.get<IncomeStatementType[]>('http://localhost:8080/api/incomeStatements/all').subscribe(result => {
      this.incomeStatementTypeList = result;
    }, error => console.log(error));
  }
}
