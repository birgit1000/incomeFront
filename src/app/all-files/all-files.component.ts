import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {CsvFile} from '../Models/CsvFile';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit {
  isLoggedIn = false;
  header = new HttpHeaders().set('Authorization', this.tokenStorage.getToken());
  files: CsvFile[];
  selectedFile: CsvFile;

  constructor(private http: HttpClient, private fb: FormBuilder,
              private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.files = [];
      this.get();
    }
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

  toggle(file: CsvFile) {
    if (this.selectedFile === file) {
      this.selectedFile = null;
    } else {
      this.selectedFile = file;
    }
  }
}
