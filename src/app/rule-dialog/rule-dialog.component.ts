import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IncomeStatementType} from '../Models/IncomeStatementType';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Rule} from '../Models/Rule';
import {environment} from '../../environments/environment';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-rule-dialog',
  templateUrl: './rule-dialog.component.html',
  styleUrls: ['./rule-dialog.component.css']
})
export class RuleDialogComponent implements OnInit {
  formGroup: FormGroup;
  incomeStatementTypeList: IncomeStatementType[];
  alertMessage: string;
  isSuccess: boolean;
  isError: boolean;
  isLoggedIn = false;
  details: string;
  transactionBeneficiaryOrPayerAccount: string;
  transactionBeneficiaryOrPayerName: string;
  header = new HttpHeaders().set('Authorization', this.tokenStorage.getToken());
  type: string;
  types: string[] = ['Contains', 'Begins', 'Ends'];

  constructor(private http: HttpClient, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<RuleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public rule: Rule, private authService: AuthService, private tokenStorage: TokenStorageService,
              @Inject(MAT_DIALOG_DATA) data) {
    if (data) {
      this.details = data.details;
      this.transactionBeneficiaryOrPayerAccount = data.transactionBeneficiaryOrPayerAccount;
      this.transactionBeneficiaryOrPayerName = data.transactionBeneficiaryOrPayerName;
    }
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.createForm();
      this.http.get<IncomeStatementType[]>(environment.apiUrl + 'incomeStatements')
        .subscribe(result => {
          this.incomeStatementTypeList = result;
        }, error => console.log(error));
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null],
      transactionBeneficiaryOrPayerAccount: [this.transactionBeneficiaryOrPayerAccount],
      transactionBeneficiaryOrPayerName: [this.transactionBeneficiaryOrPayerName],
      transactionDetails: [this.details, Validators.required],
      incomeStatementType: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  submit() {
    this.http.post(environment.apiUrl + 'rule',
      this.formGroup.value, {headers: this.header})
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body',
            val);
          this.isSuccess = true;
          this.alertMessage = 'Rule inserted successfully!';
          console.log(this.formGroup.value);
          this.dialogRef.close();
          window.location.reload();
        },
        response => {
          console.log('POST call in error', response);
          this.isError = true;
          this.alertMessage = 'Rule was not inserted. Try again!';
        },
        () => {
          console.log('The POST observable is now completed. ');
        });
  }

  close(): void {
    this.dialogRef.close();
    // window.location.reload();
  }

}
