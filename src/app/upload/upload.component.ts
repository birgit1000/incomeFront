import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CsvFile} from '../Models/CsvFile';
import {Bank} from '../Models/Bank';
import {environment} from '../../environments/environment';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';

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

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.createForm();
    this.get();
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
    console.log(this.file);
    this.http.post( environment.apiUrl + 'upload/save',
      body
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

  get(): void {
    this.http.get<CsvFile[]>(environment.apiUrl + 'upload/all').subscribe(result => {
      this.files = result;
    }, error => console.log(error));

    this.http.get<Bank[]>(environment.apiUrl + 'bank/all').subscribe(result => {
      this.banks = result;
    }, error => console.log(error));
  }

  remove(id: any): void {
    this.http.delete<CsvFile>(environment.apiUrl + 'upload/delete/' + id).subscribe(
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
}
