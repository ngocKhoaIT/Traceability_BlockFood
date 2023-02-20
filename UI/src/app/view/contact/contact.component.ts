import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoticeData } from 'src/app/models/noticeData.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  constructor(private testService: APIservicesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public loadService: LoaderService){

  }

  ngOnInit(): void {
    
  }

  cards : {icon: string, link: string}[] = [{icon: "https://cdn-icons-png.flaticon.com/128/1384/1384005.png", link : ""},
                                            {icon: "https://cdn-icons-png.flaticon.com/128/1384/1384012.png", link : ""},
                                            {icon: "https://cdn-icons-png.flaticon.com/128/25/25657.png", link : ""},
                                            {icon: "https://cdn-icons-png.flaticon.com/128/1384/1384015.png", link : ""},]

  facebook = "https://cdn-icons-png.flaticon.com/128/1384/1384005.png"
  youtube = "https://cdn-icons-png.flaticon.com/128/1384/1384012.png"
  github = "https://cdn-icons-png.flaticon.com/128/25/25657.png"
  instagram = "https://cdn-icons-png.flaticon.com/128/1384/1384015.png"
  // display : any
  // center: google.maps.LatLngLiteral = {lat: 24, lng:12}
  // center: google.maps.LatLngLiteral = {lat: 10.801494, lng:106.634774}
  // zoom =  4

  tenLH = ""
  hovalotLH = ""
  email = ""
  sdt = ""
  noidung = ""

  send(){
    this.sendMessage.content = "Họ và tên: " + this.hovalotLH
    + " " + this.tenLH + ", email: " + this.email + ", SĐT: "+ this.sdt + 
    ", Nội dung: " + this.noidung
    this.sendMessage.id = ""
    this.sendMessage.receiveDate  = "2022-10-11T07:40:25.49"
    this.sendMessage.sendDate  = "2022-10-11T07:40:25.49"
    this.sendMessage.receiveId = "administrator"
    this.sendMessage.sendId = "guestId"
    this.sendMessage.status_request = "Đã gửi"
    this.sendMessage.title = "Liên hệ từ khách hàng" 
    if (this.tenLH === "" || this.hovalotLH === "" || this.email === "" || this.sdt === "" || this.noidung === "")
    {
      this._snackBar.open('Chưa nhập đủ dữ liệu', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: ['snackbar']
      });
    }
    else{
      this.testService.addNotice(this.sendMessage)
      .subscribe({
        next: (re) => {
          this._snackBar.open('Đã gửi', 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 1500,
            panelClass: ['snackbar']
          });
        }
      })
    }
  }

  sendMessage: NoticeData = {
    id : "",
    content: "",
    receiveDate: "",
    receiveId: "",
    sendDate: "",
    sendId: "",
    status_request:"",
    title: "",
  }
}
