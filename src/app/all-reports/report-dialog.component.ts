import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {environment} from '../../environments/environment';
import {Report} from '../Models/Report';
import {ReportRow} from '../Models/ReportRow';

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
  selectedRow: ReportRow;

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
      console.log(result);
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

  toggle(r: any) {
    if (this.selectedRow === r) {
      this.selectedRow = null;
    } else {
      this.selectedRow = r;
    }
  }

}
