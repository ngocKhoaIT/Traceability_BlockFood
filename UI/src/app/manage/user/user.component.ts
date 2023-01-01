import { DatePipe, formatDate } from '@angular/common';
import { AfterViewInit, Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { GridAlignRowsStyleBuilder } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, NgModel, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NoticeDelete } from 'src/app/base/notice-delete/notice-delete.component';
import { District } from 'src/app/models/district.model';
import { Factory } from 'src/app/models/factory.model';
import { Farm } from 'src/app/models/farm.model';
import { Merchant } from 'src/app/models/merchant.model';
import { UserView } from 'src/app/models/models-view/userView.model';
import { Person } from 'src/app/models/person.model';
import { Province } from 'src/app/models/Province.model';
import { Store } from 'src/app/models/store.model';
import { Transport } from 'src/app/models/transport.model';
import { User } from 'src/app/models/user.model';
import { Ward } from 'src/app/models/ward.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  photoPath: string = environment.photoUrl
  logo: string = this.photoPath + "logo.png"
  farm: string = this.photoPath + "smart-farm.png"
  factory: string = this.photoPath + "factory.png"
  transport: string = this.photoPath + "transportation.png"
  store: string = this.photoPath + "shops.png"
  chart: string = this.photoPath + "pie-chart.png"
  user: string = this.photoPath + "user.png"
  login: string = this.photoPath + "farmer.png"

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  displayedColumnsPerson: string[] = ['identification', 'lastName', 'firstName',
    'email', 'phoneNumber', 'birthDay',
    'sex', 'addressPerson', 'system'];

  displayedColumnsUser: string[] = ['userName', 'pass', '_role',
    'personName', 'system'];

  dataSourcePerson = new MatTableDataSource<Person>;
  dataSourceUser = new MatTableDataSource<UserView>;

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  @ViewChild(MatPaginator)
  paginatorPerson!: MatPaginator;
  @ViewChild(MatSort)
  sortPerson!: MatSort;

  @ViewChild(MatPaginator)
  paginatorUser!: MatPaginator;
  @ViewChild(MatSort)
  sortUser!: MatSort;

  constructor(private apiService: APIservicesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(LOCALE_ID) public locale: string,
    public loadService: LoaderService) {
  }

  ngOnInit(): void {
    this.filter("Today")
  }

  filter(req: string) {
    if (this.choice === 'Người dùng') {
      this.hideP = true
      this.hideU = false
      this.apiService.getPersonsFilter(req)
        .subscribe({
          next: (p) => {
            this.dataSourcePerson = new MatTableDataSource(p);
            this.dataSourcePerson.paginator = this.paginatorPerson;
            this.dataSourcePerson.sort = this.sortPerson;
          },
          error: (response) => {
            console.log(response);
          }
        });
    }
    else {
      this.hideP = false
      this.hideU = true
      this.apiService.getUsersFilter(req)
        .subscribe({
          next: (u) => {
            this.dataSourceUser = new MatTableDataSource(u);
            this.dataSourceUser.paginator = this.paginatorUser;
            this.dataSourceUser.sort = this.sortUser;
          },
          error: (response) => {
            console.log(response);
          }
        });
    }
  }

  choice = 'Người dùng'
  choices: string[] = ['Người dùng', 'Tài khoản']

  hideP = true
  hideU = false

  add(event: Event): void {
    const dialogRef = this.dialog.open(popUpPerson, {
      width: '700px',
      height: 'auto',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  addU(event: Event): void {
    const dialogRef = this.dialog.open(popUpUser, {
      width: '700px',
      height: 'auto',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  redirectToUpdate(id: number): void {
    const dialogRef = this.dialog.open(popUpPerson, {
      width: '700px',
      height: 'auto',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  redirectToDelete(id: string) {
    const dialogRef = this.dialog.open(NoticeDelete, {
      width: 'auto',
      height: 'auto',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.apiService.deletePerson(id)
          .subscribe({
            next: (re) => {
              this._snackBar.open('Xóa thành công', 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 1500,
                panelClass: ['snackbar']
              });
              this.ngOnInit()
            },
            error: (er) => {
              this._snackBar.open(er, 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 1500,
                panelClass: ['snackbar']
              });
            }
          })
      }
    });
  }

  redirectToUpdateU(id: string): void {
    const dialogRef = this.dialog.open(popUpUser, {
      width: '700px',
      height: 'auto',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  redirectToDeleteU(id: string) {
    const dialogRef = this.dialog.open(NoticeDelete, {
      width: 'auto',
      height: 'auto',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.apiService.deleteUser(id)
          .subscribe({
            next: (re) => {
              this._snackBar.open('Xóa thành công', 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 1500,
                panelClass: ['snackbar']
              });
              this.ngOnInit()
            },
            error: (er) => {
              this._snackBar.open(er, 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 1500,
                panelClass: ['snackbar']
              });
            }
          })
      }
    });
  }

  changeFormatDate(id: string) {
    if (id === '')
      return ""
    else return formatDate(id, 'dd/MM/yyyy', this.locale)
  }

  applyFilterPerson(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePerson.filter = filterValue.trim().toLowerCase();

    if (this.dataSourcePerson.paginator) {
      this.dataSourcePerson.paginator.firstPage();
    }
  }

  applyFilterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceUser.paginator) {
      this.dataSourceUser.paginator.firstPage();
    }
  }
}

@Component({
  selector: 'popUpPerson',
  templateUrl: 'popUpPerson.html',
  styleUrls: ['./popUpPerson.scss']
})
export class popUpPerson implements OnInit {

  checkId: boolean
  sexs: string[] = ['Nam', 'Nữ']
  loginValid = true
  btnChange: string
  btnColor: string

  constructor(
    public dialogRef: MatDialogRef<popUpPerson>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private apiService: APIservicesService,
    private _snackBar: MatSnackBar, private datePipe: DatePipe
  ) {
    this.checkId = true
    this.btnChange = ''
    this.btnColor = ''
  }


  works: { id: string, name: string }[] = [
                                            { id: 'farm', name: 'Nông trại' },
                                            { id: 'merchant', name: 'Thương lái' },
                                            { id: 'factory', name: 'Nhà máy sản xuất' },
                                            { id: 'transport', name: 'Đơn vị vận chuyển' },
                                            { id: 'store', name: 'Cửa hàng' }]

  Persons: Person[] = []

  ngOnInit(): void {
    this.PersonDetails.sex = 'Nam'

    const id = this.data
    if (id !== '') {
      this.checkId = true
      this.btnChange = 'Cập nhật'
      this.btnColor = '#edea16'
      this.apiService.getIdPerson(id)
        .subscribe({
          next: (response) => {
            this.photoPathName = this.photoPath + response.imagePerson
            this.PersonDetails = response;
          }
        }
        )
    }
    else {
      this.checkId = false
      this.btnChange = 'Thêm'
      this.btnColor = '#228B22'
    }
    this.apiService.getProvince()
      .subscribe({
        next: (re) => {
          this.provinces = re
        }
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  PersonDetails: Person = {
    identification: '',
    firstName: '',
    lastName: '',
    birthDay: '',
    imagePerson: '',
    sex: '',
    working: '',
    addressPerson: '',
    email: '',
    phoneNumber: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  change(event: Event) {
    this.loginValid = true;
    const id = this.data;

    if (id !== '') {
      this.loginValid = true;
      let date = new Date(this.PersonDetails.birthDay)
      var d = this.datePipe.transform(date, 'yyyy-MM-dd')

      if (d != null) {
        this.apiService.checkAge(d)
          .subscribe({
            next: (c) => {
              if (c === 'Đã đủ tuổi') {
                this.apiService.updatePerson(this.PersonDetails)
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
    else {
      let date = new Date(this.PersonDetails.birthDay)
      var d = this.datePipe.transform(date, 'yyyy-MM-dd')

      if (d != null) {
        this.apiService.checkAge(d)
          .subscribe({
            next: (c) => {
              if (c === 'Đã đủ tuổi') {
                if (this.p === -1 || this.w === -1 || this.d === -1 || this.PersonDetails.addressPerson === '') {
                  this._snackBar.open('Thông tin chưa đầy đủ', 'OK', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 1500,
                    panelClass: ['snackbar']
                  });
                }
                else {
                  this.apiService.getIdProvince(this.p)
                    .subscribe({
                      next: (pr) => {
                        this.apiService.getIdDistrict(this.d)
                          .subscribe({
                            next: (dt) => {
                              this.apiService.getIdWard(this.w)
                                .subscribe({
                                  next: (wa) => {
                                    this.PersonDetails.addressPerson = this.PersonDetails.addressPerson + ', ' + wa.nameW + ', ' + dt.nameD + ', ' + pr.nameP
                                    this.loginValid = true;
                                    this.PersonDetails._status = 0;
                                    this.PersonDetails.identification = ''
                                    this.PersonDetails.date_create = '2022-10-11T07:40:25.49';
                                    this.PersonDetails.date_update = '2022-10-11T07:40:25.49';
                                    this.apiService.addPerson(this.PersonDetails)
                                      .subscribe({
                                        next: (f) => {
                                          this.ngOnInit();
                                          this.PersonDetails.identification = '',
                                            this.PersonDetails.birthDay = '',
                                            this.PersonDetails.lastName = '',
                                            this.PersonDetails.firstName = '',
                                            this.PersonDetails.addressPerson = '',
                                            this.PersonDetails.email = '',
                                            this.PersonDetails.sex = '',
                                            this.PersonDetails.imagePerson = '',
                                            this.PersonDetails.phoneNumber = '';

                                          this.dialogRef.close();

                                          this._snackBar.open('Thêm thành công', 'OK', {
                                            horizontalPosition: 'center',
                                            verticalPosition: 'top',
                                            duration: 1500,
                                            panelClass: ['snackbar']
                                          });
                                        }
                                      })
                                  }
                                })
                            }
                          })
                      }
                    })
                }
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
    this.apiService.upload(this.file).subscribe({
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
    this.apiService.getDistrict(id)
      .subscribe({
        next: (re) => {
          this.districts = re
        }
      })
  }

  changeD(id: number) {
    this.apiService.getWard(id)
      .subscribe({
        next: (re) => {
          this.wards = re
        }
      })
  }

}

@Component({
  selector: 'popUpUser',
  templateUrl: 'popUpUser.html',
  styleUrls: ['./popUpUser.scss']
})
export class popUpUser implements OnInit, AfterViewInit {

  passrepass = true
  checkId: boolean
  sexs: string[] = ['Nam', 'Nữ']
  loginValid = true
  btnChange: string
  btnColor: string

  identifications: Person[] = []
  _roles: { id: string, name: string }[] = [
  { id: 'farm', name: 'Nông trại' },
  { id: 'merchant', name: 'Thương lái' },
  { id: 'factory', name: 'Nhà máy sản xuất' },
  { id: 'transport', name: 'Đơn vị vận chuyển' },
  { id: 'store', name: 'Cửa hàng' }]
  placeFarm: Farm[] = []
  placeFactory: Factory[] = []
  placeTransport: Transport[] = []
  placeStore: Store[] = []
  placeMerchant: Merchant[] = []

  checkFarm: boolean
  checkFactory: boolean
  checkMerchant: boolean
  checkStore: boolean
  checkTransport: boolean

  hide = true;

  repassword: string

  matcher = new MyErrorStateMatcher();

  DtoPersontoPlace(d: string) {
    this.apiService.getAllPersonbyDs(d)
      .subscribe({
        next: (re) => {
          this.identifications = re
          if (this.UserDetails._role === 'merchant') {
            this.checkFarm = false
            this.checkFactory = false
            this.checkMerchant = true
            this.checkStore = false
            this.checkTransport = false
          }
          if (this.UserDetails._role === 'farm') {
            this.checkFarm = true
            this.checkFactory = false
            this.checkMerchant = false
            this.checkStore = false
            this.checkTransport = false
          }
          if (this.UserDetails._role === 'factory') {
            this.checkFarm = false
            this.checkFactory = true
            this.checkMerchant = false
            this.checkStore = false
            this.checkTransport = false
          }
          if (this.UserDetails._role === 'transport') {
            this.checkFarm = false
            this.checkFactory = false
            this.checkMerchant = false
            this.checkStore = false
            this.checkTransport = true
          }
          if (this.UserDetails._role === 'store') {
            this.checkFarm = false
            this.checkFactory = false
            this.checkMerchant = false
            this.checkStore = true
            this.checkTransport = false
          }
          if (this.UserDetails._role === 'admin') {
            this.UserDetails.workingFor = 'Admin'
            this.checkFarm = false
            this.checkFactory = false
            this.checkMerchant = false
            this.checkStore = false
            this.checkTransport = false
          }

        }
      })
  }

  ngOnInit(): void {

    const id = this.data
    if (id !== '') {
      this.checkId = true
      this.btnChange = 'Cập nhật'
      this.btnColor = '#edea16'

      this.apiService.getIdUser(id)
        .subscribe({
          next: (response) => {
            this.UserDetails = response;
          }
        }
        )
    }
    else {
      this.checkId = false
      this.btnChange = 'Thêm'
      this.btnColor = '#228B22'
    }

    this.apiService.getAllFactorys()
      .subscribe({
        next: (re) => {
          this.placeFactory = re
        }
      })
    this.apiService.getAllFarms()
      .subscribe({
        next: (re) => {
          this.placeFarm = re
        }
      })
    this.apiService.getAllMerchants()
      .subscribe({
        next: (re) => {
          this.placeMerchant = re
        }
      })
    this.apiService.getAllTransports()
      .subscribe({
        next: (re) => {
          this.placeTransport = re
        }
      })

    this.apiService.getAllStores()
      .subscribe({
        next: (re) => {
          this.placeStore = re
        }
      })
  }

  constructor(
    public dialogRef: MatDialogRef<popUpUser>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private apiService: APIservicesService,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.checkId = true
    this.btnChange = ''
    this.btnColor = ''
    this.repassword = ''

    this.checkFarm = false
    this.checkFactory = false
    this.checkMerchant = false
    this.checkStore = false
    this.checkTransport = false
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.DtoPersontoPlace
    }, 0)
  }

  UserDetails: User = {
    userName: '',
    _passwordHash: '',
    _passwordSalt: '',
    _role: '',
    represent: '',
    workingFor: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  change(event: Event) {
    if (this.UserDetails._passwordHash !== this.UserDetails._passwordSalt) {
      this.passrepass = false
      this._snackBar.open('Mật khẩu không khớp', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: ['snackbar']
      });
    }
    else {
      this.passrepass = true
      this.loginValid = true;
      const id = this.data;

      if (id !== '') {
        this.loginValid = true;
        this.apiService.updateUser(this.UserDetails)
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
        this.authService.checkUser(this.UserDetails.userName)
        .subscribe({
          next: (check) => {
            console.log(check.toString())
            if(check.toString() !== 'Chưa tồn tại')
            {
              this._snackBar.open('Tài khoản này đã tồn tại', 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 1500,
                panelClass: ['snackbar']
              });
            }
            else
            {
              this.loginValid = true;
              this.UserDetails._status = 0;
              this.UserDetails.date_create = '2022-10-11T07:40:25.49';
              this.UserDetails.date_update = '2022-10-11T07:40:25.49';
              this.authService.proccedRegister(this.UserDetails)
                .subscribe({
                  next: (f) => {
                    this.ngOnInit();
      
                    this.dialogRef.close();
      
                    this._snackBar.open('Thêm thành công', 'OK', {
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                      duration: 1500,
                      panelClass: ['snackbar']
                    });
                  }
                })
            }
          }
        })
      }
    }
  }

  hide1 = true
  onHide1() {
    this.hide1 = !this.hide1
  }
  hide2 = true
  onHide2() {
    this.hide2 = !this.hide2
  }
  onChangePassword() {
    if (this.UserDetails._passwordHash !== this.UserDetails._passwordSalt) {
      this.errPass = false
    }
    else {
      this.errPass = true
    }
  }
  errPass = true
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}