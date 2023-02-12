import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ForgotComponent } from '../base/forgot/forgot.component';
import { User } from '../models/user.model';
import { APIservicesService } from '../services/apiservices.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';
  loginValid = true
  hide = true
  photoPath: string = environment.photoUrl 
  anh: string = this.photoPath + "anh.jpg"
  logo: string = this.photoPath + "logo.png"

  fb: string = this.photoPath + "facebook.png"
  ins: string = this.photoPath + "instagram.png"
  ytb: string = this.photoPath + "youtube.png"

  linkFB = "https://www.facebook.com/profile.php?id=100088211470391"
  linkINS = ""
  linkYTB = ""

  responseData : any
  pageLH = "pagelayout/contact"

  toPage(id: string){
    this._router.navigateByUrl(id)
  }

  constructor(private _router: Router,
    private _authService: APIservicesService, private auth: AuthService,
    private _snackBar: MatSnackBar, public loadService: LoaderService, public dialog: MatDialog) { 
      localStorage.clear()
    }

  ngOnInit(): void {
    this.hide = true
  }

  forgot(){
    const dialogRef = this.dialog.open(ForgotComponent, {
      width: 'auto',
      height: 'auto',
      data: "",
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
      console.log('The dialog was closed');
    });
  }

  onSubmit(){
    this.loginAccount.date_create = '2022-10-11T07:40:25.49';
    this.loginAccount.date_update = '2022-10-11T07:40:25.49';
    this.loginAccount.userName = this.username
    this.loginAccount._passwordHash = this.password

    this.auth.proccedLogin(this.loginAccount)
    .subscribe({ 
      next: (result)=>{
      if(result !== 'User not Found or Wrong Password.'){
        this.responseData = result
        localStorage.setItem('token', this.responseData.value)
        this._authService.getIdUser(this.user())
        .subscribe({
          next: (re2) => {
            this.checkUser(re2.userName, re2._role);
          }
        })
        this._snackBar.open('Đăng nhập thành công', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        });
      }else{
        this.loginValid = false;
        this._snackBar.open('Đăng nhập thất bại', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        });
      }
    },
  })
  }

  checkUser(id: string, d: string){
    if (id === null) return this.loginValid = false,
    this._snackBar.open('Đăng nhập thất bại', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: ['snackbar']
      });
    else {
      this.loginValid = true 
      this._snackBar.open('Đăng nhập thành công', 'OK', 
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 1500,
            panelClass: ['snackbar']
          });
      if(d === 'admin'){
        return this._router.navigateByUrl('home/'+this.user())
      }
      else if (d === 'farm'){
        return this._router.navigateByUrl('farmlayout/'+this.user())
      } else if (d === 'merchant'){
        return this._router.navigateByUrl('merchantlayout/'+this.user())
      } else if (d === 'factory'){
        return this._router.navigateByUrl('factorylayout/'+this.user())
      } else if (d === 'transport'){
        return this._router.navigateByUrl('transportlayout/'+this.user())
      } else {
        return this._router.navigateByUrl('storelayout/'+this.user())
      }
    }
  }

  user() : string {
    var logginToken = localStorage.getItem('token') || '';
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken.toString());
    var _finaldata = JSON.parse(_atobData);
    return _finaldata.userName
  }

  onHide(){
    this.hide = !this.hide
  }

  loginAccount : User = {
    userName: '',
    _passwordHash: '',
    _passwordSalt:'',
    _role: '',
    _status: 0,
    date_create: '',
    date_update: '',
    represent: '',
    workingFor: '',
    }
}
