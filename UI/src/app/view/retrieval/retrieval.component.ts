import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-retrieval',
  templateUrl: './retrieval.component.html',
  styleUrls: ['./retrieval.component.scss']
})
export class RetrievalComponent implements OnInit {

  fieldRetrieval = ''
  photoPath = environment.photoUrl
  khoa : string = this.photoPath + 'khoa.jpg'
  nhien : string = this.photoPath + 'nhien.jpg'
  thanh : string = this.photoPath + 'thanh.jpg'
  hinhnen : string = this.photoPath + 'viewTruyxuat.jpg'
  item : string = this.photoPath + 'khachhang.jfif'
  item1 : string = this.photoPath + 'nongtrai.jfif'
  item2 : string = this.photoPath + 'nhamay.jfif'
  item3 : string = this.photoPath + 'thuonglai.jfif'
  item4 : string = this.photoPath + 'vanchuyen.jfif'
  item5 : string = this.photoPath + 'cuahang.jfif'
  farm: string = this.photoPath + 'smart-farm.png'
  merchant: string = this.photoPath + 'trad.png'
  factory: string = this.photoPath + 'factory.png'
  transport: string = this.photoPath + 'transportation.png'
  store: string = this.photoPath + 'shops.png'
  admin: string = this.photoPath + 'user.png'

  json : any
  changeJson(e: any):void{
    this.json = JSON.parse(e)
    window.location.href = this.json.data
  }

  constructor(private _router: Router,
    private _authService: APIservicesService,
    private _snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }
  add(id: string){
    this._authService.checkInventory(id)
    .subscribe({
      next: (re) => {
        if(re.id === null){
          this.fieldRetrieval = ''
          this._snackBar.open('Không có sản phẩm này', 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 1500,
            panelClass: ['snackbar']
          });
        }else{
          this._router.navigateByUrl('pagelayout/detail/'+ this.fieldRetrieval)
        }
      }
    })
  }

  checkCamera = true

  webcamChange(){
    this.checkCamera = !this.checkCamera
  }

  toPage(id: string){
    this._router.navigateByUrl(id)
  }

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File;

  imageQR = ''
  photoPathName: string = ''

  onChange(input: HTMLInputElement) :void {
    if(input.files !== null)
    {
      const file = input.files[0];
      console.log(file.name)
      this.imageQR = file.name ;
      
      this._authService.readFile(file.name)
      .subscribe({
        next: (re) => {
          if(re !== 'Mã QR này ko tồn tại')
          {
            this.document.location.href = re.toString();
          }
          else{
            console.log('a')
            this._snackBar.open('Không có mã QR này', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 1500,
              panelClass: ['snackbar']
            });
          }
        },
        error: (er) => {
          this._snackBar.open('Lỗi API ảnh', 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 1500,
            panelClass: ['snackbar']
          });
        }
      })
    }
    else
    {
      this._snackBar.open('Lỗi File', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: ['snackbar']
      });
    } 
  }

  qr: string = this.photoPath + 'barcode-scanner.png'
}
