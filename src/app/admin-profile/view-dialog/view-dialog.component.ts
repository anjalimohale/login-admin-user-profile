import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.css']
})
export class ViewDialogComponent{

  constructor(public dialogRef: MatDialogRef<ViewDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  onClick(){
      this.dialogRef.close();
  }

  onClickClose(){
    this.dialogRef.close();
  }
  
}
