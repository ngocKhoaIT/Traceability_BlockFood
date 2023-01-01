import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NoticeDelete } from 'src/app/base/notice-delete/notice-delete.component';
import { District } from 'src/app/models/district.model';
import { Province } from 'src/app/models/Province.model';
import { Store } from 'src/app/models/store.model';
import { Ward } from 'src/app/models/ward.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  displayedColumns: string[] = ['storeId', 'storeName', 'addressStore',
    'email', 'phoneNumber', 'system'];

  dataSource = new MatTableDataSource<Store>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private testService: APIservicesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public loadService: LoaderService) {

  }

  ngOnInit(): void {
    this.testService.getStoresFilter("Today")
      .subscribe({
        next: (f) => {
          this.dataSource = new MatTableDataSource(f);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (response) => {
          console.log(response);
        }
      });
  }

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  filter(req: string){
    this.testService.getStoresFilter(req)
      .subscribe({
        next: (f) => {
          this.dataSource = new MatTableDataSource(f);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (response) => {
          console.log(response);
        }
      });
  }

  add(event: Event) {
    const dialogRef = this.dialog.open(popEditStore, {
      width: '700px',
      height: 'auto',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  redirectToUpdate(id: string): void {
    const dialogRef = this.dialog.open(popEditStore, {
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
      width: '250px',
      height: '170px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.testService.deleteStore(id)
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

@Component({
  selector: 'popEditStore',
  templateUrl: 'popEditStore.html',
  styleUrls: ['./popEditStore.scss']
})
export class popEditStore implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<popEditStore>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private testService: APIservicesService,
    private _snackBar: MatSnackBar
  ) { }

  Stores: Store[] = []
  btnChange = ''
  btnColor = ''

  ngOnInit(): void {
    if (this.data === '') {
      this.btnChange = 'Thêm'
      this.btnColor = 'green'
    }
    else {
      this.btnChange = 'Cập nhật'
      this.btnColor = 'yellow'
      this.testService.getIdStore(this.data)
        .subscribe({
          next: (response) => {
            this.StoreDetails = response;
          }
        }
        )
    }

    this.testService.getProvince()
      .subscribe({
        next: (re) => {
          this.provinces = re
        }
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  StoreDetails: Store = {
    storeId: '',
    storeName: '',
    addressStore: '',
    email: '',
    phoneNumber: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  change(event: Event) {
    if (this.data === '') {
      if (this.p === -1 || this.w === -1 || this.d === -1 || this.StoreDetails.storeName === '' || this.StoreDetails.email === '' || this.StoreDetails.phoneNumber === '' || this.StoreDetails.addressStore === '') {
        this._snackBar.open('Thông tin chưa đầy đủ', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        });
      }
      else {
        this.testService.getIdProvince(this.p)
          .subscribe({
            next: (pr) => {
              this.testService.getIdDistrict(this.d)
                .subscribe({
                  next: (dt) => {
                    this.testService.getIdWard(this.w)
                      .subscribe({
                        next: (wa) => {
                          this.StoreDetails.addressStore = this.StoreDetails.addressStore + ', ' + wa.nameW + ', ' + dt.nameD + ', ' + pr.nameP
                          this.StoreDetails._status = 0;
                          this.StoreDetails.storeId = '';
                          this.StoreDetails.date_create = '2022-10-11T07:40:25.49';
                          this.StoreDetails.date_update = '2022-10-11T07:40:25.49';
                          this.testService.addStore(this.StoreDetails)
                            .subscribe({
                              next: (f) => {
                                this.ngOnInit();
                                this.StoreDetails.storeName = '',
                                  this.StoreDetails.addressStore = '',
                                  this.StoreDetails.email = '',
                                  this.StoreDetails.phoneNumber = '';

                                this.dialogRef.close()

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
      this.testService.updateStore(this.StoreDetails)
        .subscribe({
          next: (re) => {
            this.dialogRef.close();
            this._snackBar.open('Cập nhật thành công', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 1500,
              panelClass: ['snackbar']
            });
          }
        })
    }


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