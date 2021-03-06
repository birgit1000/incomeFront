import {Component, OnInit} from '@angular/core';
import {Report} from '../Models/Report';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ReportRow} from '../Models/ReportRow';
import {environment} from '../../environments/environment';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  report: Report;
  selectedRow: ReportRow;
  isLoggedIn = false;
  form: FormGroup;
  rows: ReportRow[];
  header = new HttpHeaders().set('Authorization', this.tokenStorage.getToken());

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.rows = [];
    } else {
      this.getReportForAnon();
    }
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      startDate: null,
      endDate: null,
      rows: null
    });
  }

  toggle(row: ReportRow) {
      if (this.selectedRow === row) {
          this.selectedRow = null;
      } else {
          this.selectedRow = row;
      }
  }

  generateReportForUser() {
    this.http.post(environment.apiUrl + 'report/generate',
      this.form.value, {headers: this.header}
    )
      .subscribe(
        (val: Report) => {
          console.log('POST call successful value returned in body',
            val);
          console.log(this.form.value);
          this.rows = val.rows;
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed. ');
        });
  }

  getReportForAnon() {
    this.http.post(environment.apiUrl + 'report/generate/anon',
      JSON.parse(sessionStorage.getItem('sessionTransactions'))
    )
      .subscribe(
        (val: Report) => {
          console.log('POST call successful value returned in body',
            val);
          this.rows = val.rows;
          sessionStorage.setItem('sessionRows', JSON.stringify(this.rows));
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed. ');
        });
  }
}
