import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {RuleDialogComponent} from '../rule-dialog/rule-dialog.component';
import {IncomeStatementType} from '../Models/IncomeStatementType';
import {HttpClient} from '@angular/common/http';
import {Rule} from '../Models/Rule';


@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  rules: Rule[];

  constructor(private dialog: MatDialog, private http: HttpClient) {
  }

  ngOnInit(): void {    this.http.get<Rule[]>('http://localhost:8080/api/rule/all').subscribe(result => {
    this.rules = result;
  }, error => console.log(error));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RuleDialogComponent);
  }

  remove(id: any) {
    this.http.delete<Rule>('http://localhost:8080/api/rule/delete/' + id).subscribe(result => {
    }, error => console.log(error));
  }
}
