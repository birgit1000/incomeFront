import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {RuleDialogComponent} from '../rule-dialog/rule-dialog.component';
import {IncomeStatementType} from '../Models/IncomeStatementType';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Rule} from '../Models/Rule';
import {Observable} from 'rxjs';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {environment} from '../../environments/environment';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';


@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  rules: Rule[];
  isLoggedIn = false;
  header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.tokenStorage.getToken());
  // tslint:disable-next-line:max-line-length
  constructor(private dialog: MatDialog, private http: HttpClient, private authService: AuthService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.get();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RuleDialogComponent);
  }

  remove(id: any): void {
    this.http.delete<Rule>(environment.apiUrl + 'rule/delete/' + id).subscribe(
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
   console.log(this.header);
   this.http.get<Rule[]>(environment.apiUrl + 'rule/all', {headers: this.header}).subscribe(result => {
      this.rules = result;
    }, error => console.log(error));
  }
}
