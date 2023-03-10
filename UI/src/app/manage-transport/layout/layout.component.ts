import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/base/change-password/change-password.component';
import { SendComponent } from 'src/app/base/send/send.component';
import { UpdateAccountComponent } from 'src/app/base/update-account/update-account.component';
import { Person } from 'src/app/models/person.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transportlayout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class TransportLayoutComponent implements OnInit {
  photoPath: string = environment.photoUrl 

  logo: string = this.photoPath + "logo.png"
  listM: string = this.photoPath + "list-re.png"
  listO: string = this.photoPath + "list.png"
  listDone: string = this.photoPath + "completed-task.png"
  chart: string = this.photoPath + "pie-chart.png"
  checkout: string = this.photoPath + "check-out.png"
  infor: string = this.photoPath + "info.png"
  notifications: string = this.photoPath + "bell.png"
  sending: string = this.photoPath + "mail.png"
  sended: string = this.photoPath + "send.png"
  key: string = this.photoPath + "key.png"

  changePass(id: string){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '500px',
      height: 'auto',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
      console.log('The dialog was closed');
    });
  }

  iden = ''
  info(id: string){

    const dialogRef = this.dialog.open(InFoTransport, {
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

  idUser = ''
  hidden = false;

  co = 0
  toggleBadgeVisibility() {
    this._router.navigateByUrl('/transportlayout/'+this.idUser+'/notice-receive/' + this.idUser)
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
                  this.apiService.getAllReceiveIdRequest(id,'???? g???i')
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
  }
}

@Component({
  selector: 'info-transport',
  templateUrl: 'info.html',
  styleUrls: ['./info.scss']
})
export class InFoTransport implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<InFoTransport>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private apiService: APIservicesService,
    public dialog: MatDialog
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

  updateInfo(){
    this.onNoClick()
    const dialogRef = this.dialog.open(UpdateAccountComponent, {
      width: 'auto',
      height: 'auto',
      data: this.detail.identification,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
      console.log('The dialog was closed');
    });
  }
}
