import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SendComponent } from 'src/app/base/send/send.component';
import { Person } from 'src/app/models/person.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-merchantlayout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class MerchantLayoutComponent implements OnInit {
  photoPath: string = environment.photoUrl 

  logo: string = this.photoPath + "logo.png"
  harvest: string = this.photoPath + "harvest.png"
  fruit: string = this.photoPath + "sprout.png"
  chart: string = this.photoPath + "pie-chart.png"
  wait: string = this.photoPath + "wait.png"
  done: string = this.photoPath + "sign.png"
  cancel: string = this.photoPath + "cancelled.png"
  history: string = this.photoPath + "world.png"
  checkout: string = this.photoPath + "check-out.png"
  infor: string = this.photoPath + "info.png"
  notifications: string = this.photoPath + "bell.png"
  sended: string = this.photoPath + "mail.png"
  sending: string = this.photoPath + "send.png"

  iden = ''
  info(id: string){
    const dialogRef = this.dialog.open(InFoMerchant, {
      width: '500px',
      height: '330px',
      data: id,
    });
  }

  panelOpenState = false;

  hidden = false;

  co = 0
  toggleBadgeVisibility() {
    this._router.navigateByUrl('/merchantlayout/'+this.idUser+'/notice-receive/' + this.idUser)
  }

  openBottomSheet(id: string): void {
    const a = this._bottomSheet.open(SendComponent, {
      data: id
    });
  }

  idUser = ''
  userName = ''
  imageUrl = ''

  toPage(page: string){
    this._router.navigateByUrl(page)
  }
  
  constructor(private _router: Router, private route:ActivatedRoute,
    private apiService: APIservicesService,public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,) { }
  

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if(id){
          this.apiService.getIdUser(id)
          .subscribe({
            next: (re) => {
              this.idUser = re.userName
              this.apiService.getIdPerson(re.represent)
              .subscribe({
                next: (re2) => {
                  this.iden = re2.identification
                  this.userName = re2.lastName + ' ' + re2.firstName
                  this.imageUrl = this.photoPath + re2.imagePerson
                  this.apiService.getAllReceiveIdRequest(id,'Đã gửi')
                  .subscribe({
                    next: (t) => {
                      if(t.length == 0){
                        this.hidden = true;
                      } 
                      this.co = t.length
                    }
                  });
                }
              });
            }
          })
        }
      },
    })
  }
  open = true
  changeOpen(){
    this.open = !this.open
    this.h1 = true
    this.h2 = true
    this.h3 = true
  }

  h1 = true
  changeDrop1(){
    this.h1 = !this.h1 
    this.open = true
    this.h2 = true
    this.h3 = true
  }

  h2 = true
  changeDrop2(){
    this.h2 = !this.h2 
    this.open = true
    this.h1 = true
    this.h3 = true
  }
  
  h3 = true
  changeDrop3(){
    this.h3 = !this.h3 
    this.open = true
    this.h1 = true
    this.h2 = true
  }
}

@Component({
  selector: 'info-merchant',
  templateUrl: 'info.html',
  styleUrls: ['./info.scss']
})
export class InFoMerchant implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<InFoMerchant>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private apiService: APIservicesService,
  ){}

  photoPath: string = environment.photoUrl 

  img = ''

  detail: Person = {
    _status: 0,
    addressPerson: '',
    birthDay: '',
    date_create: '',
    date_update: '',
    email: '',
    firstName: '',
    identification: '',
    imagePerson: '',
    lastName: '',
    phoneNumber:'',
    sex:'',
    working:'',
  }
  ngOnInit(): void {
    this.apiService.getIdPerson(this.data)
    .subscribe({
      next: (re) => {
        this.detail = re
        this.img = this.photoPath + re.imagePerson 
      }
    })
  }
  onNoClick(){
    this.dialogRef.close()
  }
}