import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { District } from 'src/app/models/district.model';
import { Person } from 'src/app/models/person.model';
import { Province } from 'src/app/models/Province.model';
import { Ward } from 'src/app/models/ward.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<UpdateAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private testService: APIservicesService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.testService.getIdPerson(this.data)
      .subscribe({
        next: (re) => {
          this.PersonDetails = re
        }
      })
  }

  onNoClick() {
    this.dialogRef.close()
  }

  PersonDetails : Person = {
    _status : 0,
    addressPerson: '',
    birthDay: '',
    date_create: '',
    date_update: '',
    email: '',
    firstName: '',
    identification: '',
    imagePerson: '',
    lastName: '',
    phoneNumber: '',
    sex: '',
    working: '',
  }

  sexs: string[] = ['Nam', 'Nữ']
  works: { id: string, name: string }[] = [
    { id: 'farm', name: 'Nông trại' },
    { id: 'merchant', name: 'Thương lái' },
    { id: 'factory', name: 'Nhà máy sản xuất' },
    { id: 'transport', name: 'Đơn vị vận chuyển' },
    { id: 'store', name: 'Cửa hàng' }]

  // change(){
  //   this.testService.updatePerson(this.PersonDetail)
  //   .subscribe({
  //     next: (re) => {
  //       if(re !== null)
  //       {

  //       }
  //     }
  //   })
  // }

  change(event: Event) {
    const id = this.data;

    if (id !== '') {
      let date = new Date(this.PersonDetails.birthDay)
      var d = this.datePipe.transform(date, 'yyyy-MM-dd')

      if (d != null) {
        this.testService.checkAge(d)
          .subscribe({
            next: (c) => {
              if (c === 'Đã đủ tuổi') {
                this.testService.updatePerson(this.PersonDetails)
                  .subscribe({
                    next: (re) => {
                      this._snackBar.open('Cập nhật thành công', 'OK', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 1500,
                        panelClass: ['snackbar']
                      });
                      this.dialogRef.close();
                    }
                  })
              }
              else {
                this._snackBar.open('Chưa đủ 18 tuổi', 'OK', {
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
  }

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File;

  photoPath: string = environment.photoUrl
  photoPathName: string = ''

  onChange(event: any) {
    this.file = event.target.files[0];
    this.PersonDetails.imagePerson = this.file.name;
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    this.testService.upload(this.file).subscribe({
      next: (e) => {
        this.photoPathName = this.photoPath + this.file.name
        if (typeof (e) === 'object') {
          this.shortLink = e.link;
          this.loading = false;
        }
        this._snackBar.open('Tải ảnh thành công', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        });
      },
      error: (ex) => {
        console.log(ex);
        this._snackBar.open('Tải ảnh thất bại', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        });
      }
    })
  }

  provinces: Province[] = []
  districts: District[] = []
  wards: Ward[] = []

  p = -1
  d = -1
  w = -1
  changeP(id: number) {
    this.testService.getDistrict(id)
      .subscribe({
        next: (re) => {
          this.districts = re
        }
      })
  }

  changeD(id: number) {
    this.testService.getWard(id)
      .subscribe({
        next: (re) => {
          this.wards = re
        }
      })
  }
}
