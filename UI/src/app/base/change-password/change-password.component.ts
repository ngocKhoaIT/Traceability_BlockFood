import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private testService: APIservicesService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {

  }
  ngOnInit(): void {
    this.testService.getIdUser(this.data)
      .subscribe({
        next: (re) => {
          this.UserDetail = re
        }
      })
  }

  onNoClick() {
    this.dialogRef.close()
  }

  change() {
    if (this.old == '' || this.new == '' || this.cofirmNew =='' || this.new !== this.cofirmNew 
    || this.cofirmNew.length < 8 || this.new.length < 8) {
      this._snackBar.open('Chưa nhập đủ hoặc chưa đúng dữ liệu', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: ['snackbar']
      });
    }
    else {
      this.loginAccount.userName = this.data
      this.loginAccount._passwordHash = this.old
      this.loginAccount.date_create = '2022-10-11T07:40:25.49'
      this.loginAccount.date_update = '2022-10-11T07:40:25.49'
      this.authService.proccedLogin(this.loginAccount)
        .subscribe({
          next: (ew) => {
            if (ew !== 'User not Found or Wrong Password.') {
              this.authService.changePassword(this.data, this.new)
              .subscribe({
                next: (re) =>{
                  if(re === "Đổi mật khẩu thành công")
                  {
                    this._snackBar.open('Đổi Mật khẩu thành công', 'OK', {
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                      duration: 1500,
                      panelClass: ['snackbar']
                    });
                    this.dialogRef.close()
                  }
                  else
                  {
                    this._snackBar.open('Đổi Mật khẩu thất bại', 'OK', {
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                      duration: 1500,
                      panelClass: ['snackbar']
                    });
                  }
                }
              })
            }
            else{
              this._snackBar.open('Mật khẩu hiện tại không đúng', 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 1500,
                panelClass: ['snackbar']
              });
            }
          }
        })
      }
  }

  loginAccount: User = {
    userName: '',
    _passwordHash: '',
    _passwordSalt: '',
    _role: '',
    _status: 0,
    date_create: '',
    date_update: '',
    represent: '',
    workingFor: '',
  }

  UserDetail: User = {
    _passwordHash: '',
    _passwordSalt: '',
    _role: '',
    _status: 0,
    date_create: '',
    date_update: '',
    represent: '',
    userName: '',
    workingFor: ''
  }

  old = ""
  new = ""
  cofirmNew = ""

  hide1 = true
  onHide1() {
    this.hide1 = !this.hide1
  }
  hide2 = true
  onHide2() {
    this.hide2 = !this.hide2
  }
  hide3 = true
  onHide3() {
    this.hide3 = !this.hide3
  }
}
