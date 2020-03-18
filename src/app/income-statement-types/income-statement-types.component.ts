import { Component, OnInit } from '@angular/core';
import {IncomeStatementType} from '../Models/IncomeStatementType';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-income-statement-types',
  templateUrl: './income-statement-types.component.html',
  styleUrls: ['./income-statement-types.component.css']
})
export class IncomeStatementTypesComponent implements OnInit {
  incomeStatementTypeList: IncomeStatementType[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<IncomeStatementType[]>('http://localhost:8080/api/incomeStatements/all').subscribe(result => {
      this.incomeStatementTypeList = result;
    }, error => console.log(error));
  }

}
