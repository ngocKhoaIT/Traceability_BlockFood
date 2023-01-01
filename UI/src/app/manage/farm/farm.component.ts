import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NoticeDelete } from 'src/app/base/notice-delete/notice-delete.component';
import { District } from 'src/app/models/district.model';
import { Farm } from 'src/app/models/farm.model';
import { FarmView } from 'src/app/models/models-view/farmView.model';
import { Person } from 'src/app/models/person.model';
import { Province } from 'src/app/models/Province.model';
import { Ward } from 'src/app/models/ward.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit {
  displayedColumns: string[] = ['farmId', 'farmName', 'addressFarm',
    'note', 'farmerName', 'system'];

  dataSource = new MatTableDataSource<FarmView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  farms: FarmView[] = [];

  constructor(private testService: APIservicesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public loadService: LoaderService) {

  }

  ngOnInit(): void {
    this.testService.getFarmsbyFilter("Today")
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

  filter(req: string) {
    this.testService.getFarmsbyFilter(req)
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
    const dialogRef = this.dialog.open(popEditFarm, {
      width: '700px',
      height: '555px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  redirectToUpdate(id: string): void {
    const dialogRef = this.dialog.open(popEditFarm, {
      width: '700px',
      height: '555px',
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
        this.testService.deleteFarm(id)
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
  selector: 'popEditFarm',
  templateUrl: 'popEditFarm.html',
  styleUrls: ['./popEditFarm.scss']
})
export class popEditFarm implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<popEditFarm>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private testService: APIservicesService,
    private _snackBar: MatSnackBar
  ) { }

  Persons: Person[] = []
  farms: Farm[] = []
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
      this.testService.getIdFarm(this.data)
        .subscribe({
          next: (re) => {
            this.FarmDetails = re
          }
        })
    }

    this.testService.getProvince()
      .subscribe({
        next: (re) => {
          this.provinces = re
        }
      })

    this.testService.getAllPersonbyDs('farm')
      .subscribe({
        next: (req) => {
          this.Persons = req
        }
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  FarmDetails: Farm = {
    farmId: '',
    farmName: '',
    addressFarm: '',
    note: '',
    farmerId: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  change(event: Event) {
    if (this.data === '') {
      if (this.p === -1 || this.w === -1 || this.d === -1 || this.FarmDetails.farmName === '' || this.FarmDetails.farmerId === '' || this.FarmDetails.addressFarm === '') {
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
                          this.FarmDetails.addressFarm = this.FarmDetails.addressFarm + ', ' + wa.nameW + ', ' + dt.nameD + ', ' + pr.nameP
                          this.FarmDetails._status = 0;
                          this.FarmDetails.farmId = '';
                          this.FarmDetails.date_create = '2022-10-11T07:40:25.49';
                          this.FarmDetails.date_update = '2022-10-11T07:40:25.49';
                          this.testService.addFarm(this.FarmDetails)
                            .subscribe({
                              next: (f) => {
                                console.log(this.FarmDetails.farmId)
                                this.ngOnInit();
                                this.FarmDetails.farmName = '',
                                  this.FarmDetails.addressFarm = '',
                                  this.FarmDetails.note = '',
                                  this.FarmDetails.farmerId = '';
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
      this.testService.updateFarm(this.FarmDetails)
        .subscribe({
          next: (re) => {
            console.log(re),
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