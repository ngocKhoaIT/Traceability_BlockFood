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
  selector: 'app-farmlayout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class FarmLayoutComponent implements OnInit {
  photoPath: string = environment.photoUrl 

  logo: string = this.photoPath + "logo.png"
  seed: string = this.photoPath + "seed.png"
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
  sending: string = this.photoPath + "mail.png"
  sended: string = this.photoPath + "send.png"

  iden = ''
  info(id: string){

    const dialogRef = this.dialog.open(InFoFarm, {
      width: '500px',
      height: '330px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
      console.log('The dialog was closed');
    });
  }

  panelOpenState = false;

  hidden = false;

  co = 0
  toggleBadgeVisibility() {
    this._router.navigateByUrl('/farmlayout/'+this.place+'/notice-receive/' + this.place)
  }

  openBottomSheet(id: string): void {
    const a = this._bottomSheet.open(SendComponent, {
      data: id
    });
  }

  userName = ''
  imageUrl = ''

  toPage(page: string){
    this._router.navigateByUrl(page)
  }
  
  constructor(private _router: Router, private route:ActivatedRoute,
    private apiService: APIservicesService,public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet) 
    { }
    place =''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if(id){
          this.apiService.getIdUser(id)
          .subscribe({
            next: (re) => {
              this.place = re.userName
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
  selector: 'info-farm',
  templateUrl: 'info.html',
  styleUrls: ['./info.scss']
})
export class InFoFarm implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<InFoFarm>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private apiService: APIservicesService,
    private _snackBar: MatSnackBar,
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
