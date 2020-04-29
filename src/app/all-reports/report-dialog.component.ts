import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Rule} from '../Models/Rule';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {environment} from '../../environments/environment';
import {Report} from '../Models/Report';
import {ReportComponent} from '../report/report.component';
import {CsvFile} from '../Models/CsvFile';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent implements OnInit {
  isLoggedIn = false;
  form: FormGroup;
  header = new HttpHeaders().set('Authorization', this.tokenStorage.getToken());
  allReports: Report[];

  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.allReports = [];
      this.getAll();
    }
  }

  getAll(): void {
    this.http.get<Report[]>(environment.apiUrl + 'report/all', {headers: this.header}).subscribe(result => {
      this.allReports = result;
    }, error => console.log(error));
  }

  remove(id: string) {
    this.http.delete<Report>(environment.apiUrl + 'report/' + id).subscribe(
      (val) => {
        console.log('DELETE call successful');
        this.getAll();
      },
      response => {
        console.log('DELETE call in error', response);
      },
      () => {
        console.log('The DELETE observable is now completed. ');
      });
  }
}
