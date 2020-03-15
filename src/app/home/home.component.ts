import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Transaction} from '../Models/Transaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  transactionList: Transaction[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.http.get<Transaction[]>('http://localhost:8080/api/transactions/all').subscribe(result => {
        this.transactionList = result;
      }, error => console.log(error));
  }
}
