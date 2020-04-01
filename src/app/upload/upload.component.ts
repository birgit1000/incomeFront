import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CsvFile} from '../Models/CsvFile';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  file: File;
  form: FormGroup;
  files: CsvFile[];

  constructor(private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit(): void {
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

  // Check for changes in files inputs via a DOMString reprsenting the name of an event
  fileChange(event: any) {
    // Instantiate an object to read the file content
    const reader = new FileReader();
    // when the load event is fired and the file not empty
    if (event.target.files && event.target.files.length > 0) {
      // Fill file variable with the file content
      this.file = event.target.files[0];
    }
  }


  uploadToServer(body: FormData) {
    console.log(this.file);
    this.http.post('http://localhost:8080/api/upload/save',
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
    this.http.get<CsvFile[]>('http://localhost:8080/api/upload/all').subscribe(result => {
      this.files = result;
    }, error => console.log(error));
  }

  remove(id: any): void {
    this.http.delete<CsvFile>('http://localhost:8080/api/upload/delete/' + id).subscribe(
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
