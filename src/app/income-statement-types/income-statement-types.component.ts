import {Component, OnInit} from '@angular/core';
import {IncomeStatementType} from '../Models/IncomeStatementType';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-income-statement-types',
  templateUrl: './income-statement-types.component.html',
  styleUrls: ['./income-statement-types.component.css']
})
export class IncomeStatementTypesComponent implements OnInit {
  incomeStatementTypeList: IncomeStatementType[];
  isLoggedIn = false;

  constructor(private http: HttpClient, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.http.get<IncomeStatementType[]>(environment.apiUrl + 'incomeStatement/all')
      .subscribe(result => {
      this.incomeStatementTypeList = result;
    }, error => console.log(error));
  }
}
