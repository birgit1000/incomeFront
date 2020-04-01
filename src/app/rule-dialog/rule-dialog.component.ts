import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IncomeStatementType} from '../Models/IncomeStatementType';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Rule} from '../Models/Rule';

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

  constructor(private http: HttpClient, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<RuleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public rule: Rule) {
     this.createForm();
  }

  ngOnInit(): void {
    this.http.get<IncomeStatementType[]>('http://localhost:8080/api/incomeStatements/all').subscribe(result => {
      this.incomeStatementTypeList = result;
    }, error => console.log(error));
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null],
      transactionBeneficiaryOrPayerAccount: [null],
      transactionBeneficiaryOrPayerName: [null],
      transactionDetails: [null, Validators.required],
      incomeStatementType: [null, Validators.required]
    });
  }

  submit() {
    this.http.post('http://localhost:8080/api/rule/insert',
      this.formGroup.value
    )
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body',
            val);
          this.isSuccess = true;
          this.alertMessage = 'Rule inserted successfully!';
        },
        response => {
          console.log('POST call in error', response);
          this.isError = true;
          this.alertMessage = 'Rule was not inserted. Try again!';
        },
        () => {
          console.log('The POST observable is now completed. ');
        });
    console.log(this.formGroup.value);
  }

  close(): void {
    this.dialogRef.close();
    window.location.reload();
  }

}
