import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt from "jsonwebtoken";
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit{
  loggedUser: any;
  uploadForm;
  allSkills;
  dropdownSettings;
  selectedItems = [];
  token: any;
  bodyClasses = 'hold-transition skin-blue sidebar-collapse sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor(private auth: AuthenticationService, private route: Router) {
    this.auth.getUser();
    this.auth.data.subscribe(res => {
      this.loggedUser = res;
  });
}

  ngOnInit() {
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
    this.body.classList.add('sidebar-collapse');
    this.allSkills = [
      { item_id: 1, item_text: 'Java' },
      { item_id: 2, item_text: 'Angular' },
      { item_id: 3, item_text: 'Node Js' },
      { item_id: 4, item_text: 'Express Js' },
      { item_id: 5, item_text: 'React Js' }
    ];
    this.selectedItems=[
        { item_id: 1, item_text: 'Java' },
        { item_id: 2, item_text: 'Angular' },
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.uploadForm = new FormGroup({
      select: new FormControl(),
      firstname: new FormControl(this.loggedUser.firstname, Validators.required),
      lastname: new FormControl(this.loggedUser.lastname, ),
      role: new FormControl(this.loggedUser.role),
      username: new FormControl(this.loggedUser.username, Validators.required),
      mobile: new FormControl(this.loggedUser.mobile, [Validators.pattern("^[7-9][0-9]{9}$")]),
      email: new FormControl(this.loggedUser.email, [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      gender: new FormControl(this.loggedUser.gender),
    });
  }
  ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('sidebar-mini');
  }

  get username() { return this.uploadForm.get('username'); };
  get firstname() { return this.uploadForm.get('firstname'); };
  get lastname() { return this.uploadForm.get('lastname'); };
  get mobile() { return this.uploadForm.get('mobile'); };
  get email() { return this.uploadForm.get('email'); };
  get gender() { return this.uploadForm.get('gender'); };

  file: any;
  file2: any;

  filesToUpload: Array<File> = [];
  formData: any = new FormData();
  upload() {
    this.file = this.file2;
    const files: Array<File> = this.filesToUpload;
    this.formData.append("uploads[]", files[0], files[0]['name']);
  }
  url;
  fileChangeEvent(fileInput: any) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
      // console.log(this.url);
    }
    reader.readAsDataURL(fileInput.target.files[0]);

    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.file2 = fileInput.target.files[0]['name'];

    console.log(this.file2);
    this.upload();
  }
  private saveToken(token: string, payload: string): void {
    localStorage.setItem('log-token', token);
    localStorage.setItem('log-details', JSON.stringify(payload));
    this.token = token;
  }

  onClick() {
    let form = this.uploadForm.value;
    let credentials;

    if (this.file) {
      credentials = {
        role: form.role,
        username: form.username,
        firstname: form.firstname, lastname: form.lastname,
        email: form.email, mobile: form.mobile, gender: form.gender, profile: this.file,
      }
    } else {
      credentials = {
        role: form.role,
        username: form.username,
        firstname: form.firstname, lastname: form.lastname,
        email: form.email, mobile: form.mobile, gender: form.gender
      }
    }

    console.log(credentials);
    // this.registerForm.reset();

    this.formData.append("jsondata", JSON.stringify(credentials));
    this.auth.editUser(this.loggedUser._id, this.formData).subscribe(res => {
      console.log(res);
      var resp = JSON.parse(JSON.stringify(res));
      this.token = resp.token;
      var decoded = jwt.decode(this.token, { complete: true });
      this.saveToken(this.token, decoded.payload);
      this.auth.getUser();
      // this.auth.userSource.next(decoded.payload);
      this.formData = new FormData();
    });

  }

}
