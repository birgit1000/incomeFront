import {Component, OnInit} from '@angular/core';
import {Report} from '../Models/Report';
import {Transaction} from '../Models/Transaction';
import {HttpClient} from '@angular/common/http';
import {ReportRow} from '../Models/ReportRow';
import {environment} from '../../environments/environment';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  report: Report;
  selectedRow: ReportRow;
  isLoggedIn = false;

  constructor(private http: HttpClient, private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.http.get<Report>(environment.apiUrl + 'report/new').subscribe(result => {
      this.report = result;
    }, error => console.log(error));
  }

  toggle(row: ReportRow) {
    this.selectedRow = row;
  }
}
