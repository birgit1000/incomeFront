import {Component, OnInit} from '@angular/core';
import {Transaction} from '../Models/Transaction';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IncomeStatementType} from '../Models/IncomeStatementType';
import 'bootstrap/dist/js/bootstrap.bundle';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Rule} from '../Models/Rule';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactionList: Transaction[];
  incomeStatementTypeList: IncomeStatementType[];
  formGroup: FormGroup;


  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      arr: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.get();
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


  changeIncomeStatementType(t, event: any) {
    const selected = event.target.options[event.target.selectedIndex].text;
    console.log(t, selected);
    this.http.post('http://localhost:8080/api/transactions/update/' + t.id
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

  refresh(): void {
    window.location.reload();
  }

  remove(id: any): void {
    this.http.delete<Transaction>('http://localhost:8080/api/transactions/delete/' + id).subscribe(
      (val) => {
        console.log('DELETE call successful');
        this.get();
      },
      response => {
        console.log('DELETE call in error', response);
      },
      () => {
        console.log('The DELETE observable is now completed. ');
      });
  }

  get(): void {
    this.http.get<Transaction[]>('http://localhost:8080/api/transactions/all').subscribe(result => {
      this.transactionList = result;
    }, error => console.log(error));
    this.http.get<IncomeStatementType[]>('http://localhost:8080/api/incomeStatements/all').subscribe(result => {
      this.incomeStatementTypeList = result;
    }, error => console.log(error));
  }
}
