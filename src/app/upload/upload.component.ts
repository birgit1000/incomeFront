import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CsvFile} from '../Models/CsvFile';
import {Bank} from '../Models/Bank';
import {environment} from '../../environments/environment';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {Transaction} from '../Models/Transaction';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  file: File;
  form: FormGroup;
  files: CsvFile[];
  banks: Bank[];
  isLoggedIn = false;
  header = new HttpHeaders().set('Authorization', this.tokenStorage.getToken());
  sessionTransactions: Transaction[];
  isUploadFailed = false;
  errorMessage: string;

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.get();
    }
    this.http.get<Bank[]>(environment.apiUrl + 'banks').subscribe(result => {
      this.banks = result;
    }, error => console.log(error));
  }

  createForm() {
    this.form = this.fb.group({
      file_upload: null
    });
  }

  upload() {
    const body = new FormData();
    body.append('file', this.file);

    console.log(body);
    this.uploadToServer(body);
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }


  uploadToServer(body: FormData) {
    if (this.isLoggedIn) { this.uploadWithUser(body); } else { this.uploadWithoutUser(body); }
  }

  get(): void {
    this.http.get<CsvFile[]>(environment.apiUrl + 'upload', {headers: this.header}).subscribe(result => {
      this.files = result;
    }, error => console.log(error));
  }

  remove(id: any): void {
    this.http.delete<CsvFile>(environment.apiUrl + 'upload/' + id).subscribe(
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

  uploadWithUser(body: FormData) {
    this.http.post( environment.apiUrl + 'upload',
      body, {headers: this.header})
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body',
            val);
          this.router.navigate(['/transactions']);
        },
        response => {
          console.log('POST call in error', response);
          this.isUploadFailed = true;
          this.errorMessage = response.error.message;
        },
        () => {
          console.log('The POST observable is now completed. ');
        });
  }

  private uploadWithoutUser(body: FormData) {
    this.http.post( environment.apiUrl + 'upload/anon',
      body)
      .subscribe(
        (val: Transaction[]) => {
          console.log('POST call successful value returned in body',
            val);
          this.sessionTransactions = val;
          sessionStorage.setItem('sessionTransactions', JSON.stringify(val));
          this.router.navigate(['/transactions']);
        },
        response => {
          console.log('POST call in error', response);
          this.isUploadFailed = true;
          this.errorMessage = response.error.message;
        },
        () => {
          console.log('The POST observable is now completed. ');
        });
  }
}
