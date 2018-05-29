import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent, MatDialog, MatSort } from '@angular/material';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePwdComponent } from '../change-pwd/change-pwd.component';
import * as jwt from 'jsonwebtoken';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  displayedColumns = ['id','profile','firstname','lastname','username','email','mobile','gender','actions'];
  dataSource= new MatTableDataSource();
  page:any;
  size1:any;
  srno:any=0;
  tab:any='user';
  token:any;
  loggedUser=JSON.parse(window.localStorage.getItem("log-details"));
  bodyClasses = 'hold-transition skin-blue sidebar-collapse sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild( MatSort ) sort: MatSort;
  constructor(private auth:AuthenticationService,
             private router:Router, private toastr:ToastrService,
              public dialog: MatDialog) {   
    let payLoad = window.localStorage.getItem('log-details');
      if(payLoad){
      console.log(JSON.parse(payLoad));
      }
  }

  select=new FormGroup({
    control: new FormControl('user'),
  });
 
   logout(){
     this.auth.logout();
   }

  selRole(e:any){
    this.page=1;
    this.size1=3;
    this.srno=(this.page-1)*this.size1;
    console.log(e);
    this.tab=e;
    console.log(this.tab);
    this.refresh();
  }

  sortData(event) {
    console.log(event);
    this.sort=event;
    this.refresh();
  }   
     
  onPaginateChange(event){ 
    this.page=event.pageIndex+1;
    this.srno=(this.page-1)*this.size1;
    this.refresh();
  }

  ngOnInit() {
    this.page=1;
    this.size1=3;
    this.sort.active="";
    this.sort.direction="";
    this.refresh();
 
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
    this.body.classList.add('sidebar-collapse');
}
ngOnDestroy() {
      // remove the the body classes
      this.body.classList.remove('skin-blue');
      this.body.classList.remove('sidebar-mini');
    }

  refresh(){
    this.auth.getUsers(this.page,this.size1,this.sort.active,this.sort.direction,this.tab)
    .subscribe((users:any) => {
      console.log(users);
      this.paginator.length=users.total;
      this.paginator.pageSize=this.size1;
      this.dataSource.data=users.data1;
    });
  }

  add(){
    console.log("Add called");
    const dialogRef = this.dialog.open(AddDialogComponent, {width: '330px', height: '500px'});
    dialogRef.afterClosed()
      .subscribe( selection => {
        if(selection){
        console.log(selection);
        this.auth.addUser(selection)
          .subscribe( res => {
            console.log(res);
            this.refresh();
          });
        }
    });
  }
     
  edit(user){
    console.log("Edit called",user);
    const dialogRef = this.dialog.open(EditDialogComponent, {width: '330px', height: '560px',data:user});
    dialogRef.afterClosed()
      .subscribe(selection => {
          if(selection){
          console.log(selection);
          this.auth.editUser(user._id,selection).subscribe((res:any) => {
            console.log(res.user);
            this.refresh();
          });
        }
    });
  }
  
  delete(i,user){
    console.log("Delete called",user);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {width: '350px', height: '350px',data: user});
    dialogRef.afterClosed()
      .subscribe(selection => {
        if(selection){
        console.log(selection);
        this.auth.deleteUser(selection).subscribe(res => {
          console.log(res);
          this.dataSource.data.splice(i,1);
          this.refresh();
        });
      }
    });
  }
  
view(user){
  console.log("View called");
  const dialogRef = this.dialog.open(ViewDialogComponent, {width: '380px', height: '390px', data:user});
  dialogRef.afterClosed()
    .subscribe(selection => {
      if(selection){
        console.log(selection);
      }
    });
  }
}
