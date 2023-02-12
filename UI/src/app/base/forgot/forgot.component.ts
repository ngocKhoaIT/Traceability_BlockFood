import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ForgotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,){

  }

  ngOnInit(): void {
    
  }  

  email = ""
  sdt = ""

  onNoClick() {
    this.dialogRef.close()
  }

  change(event: Event){

  }
}
