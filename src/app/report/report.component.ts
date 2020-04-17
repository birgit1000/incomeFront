import {Component, OnInit} from '@angular/core';
import {Report} from '../Models/Report';
import {HttpClient} from '@angular/common/http';
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

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      startDate: null,
      endDate: null
    });
  }

  toggle(row: ReportRow) {
    this.selectedRow = row;
  }

  upload() {
    this.form.patchValue({
      user: this.tokenStorage.getUserObject()
    }, );
    this.http.post(environment.apiUrl + 'report/get',
      this.form.value
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
  }

  get() {
    this.http.get<Report>(environment.apiUrl + 'report/new' + this.form).subscribe(result => {
      this.report = result;
      this.report.rows = this.rows;
    }, error => console.log(error));
  }
}
