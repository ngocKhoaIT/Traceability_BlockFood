import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notice } from 'src/app/models/models-view/notice.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notice-view',
  templateUrl: './notice-view.component.html',
  styleUrls: ['./notice-view.component.css']
})
export class NoticeViewComponent implements OnInit {

  photoPath = environment.photoUrl
  constructor(
    public dialogRef: MatDialogRef<NoticeViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private testService: APIservicesService
  ) { 

  }

  onNoClick(){
    this.dialogRef.close()
  }

  detail: Notice = {
    content : '',
    id: '',
    photoReceive: '',
    photoSend: '',
    receiveDate: '',
    receiveId: '',
    receiveName: '',
    roleReceive: '',
    roleSend: '',
    sendDate: '',
    sendId: '',
    sendName: '',
    status_request: '',
    title: '',
    representReiceive: '',
    representSend: '',
    workingForReceive: '',
    workingForSend: '',
  }

  ngOnInit(): void {
    this.testService.getIdNotice(this.data)
    .subscribe({
      next: (re) => {
        this.detail = re[0]
      }
    })
  }

}
