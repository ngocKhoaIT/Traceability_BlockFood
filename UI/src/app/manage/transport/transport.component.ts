import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NoticeDelete } from 'src/app/base/notice-delete/notice-delete.component';
import { District } from 'src/app/models/district.model';
import { TransportView } from 'src/app/models/models-view/transportView.model';
import { Person } from 'src/app/models/person.model';
import { Province } from 'src/app/models/Province.model';
import { Transport } from 'src/app/models/transport.model';
import { Ward } from 'src/app/models/ward.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {

  displayedColumns: string[] = ['transportId', 'transportName', 'addressTransport',
    'note', 'email', 'personInCharge', 'system'];

  dataSource = new MatTableDataSource<TransportView>;

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
    this.testService.getTransportsFilter("Today")
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
    this.testService.getTransportsFilter(req)
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
    const dialogRef = this.dialog.open(popEditTransport, {
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
    const dialogRef = this.dialog.open(popEditTransport, {
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
        this.testService.deleteTransport(id)
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
  selector: 'popEditTransport',
  templateUrl: 'popEditTransport.html',
  styleUrls: ['./popEditTransport.scss']
})
export class popEditTransport implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<popEditTransport>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private testService: APIservicesService,
    private _snackBar: MatSnackBar
  ) { }
  Persons: Person[] = []
  Transports: Transport[] = []
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
      this.testService.getIdTransport(this.data)
        .subscribe({
          next: (response) => {
            this.TransportDetails = response;
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

    this.testService.getAllPersonbyDs('transport')
      .subscribe({
        next: (req) => {
          this.Persons = req
        }
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  TransportDetails: Transport = {
    transportId: '',
    transportName: '',
    addressTransport: '',
    note: '',
    email: '',
    personInCharge: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  change(event: Event) {
    if (this.data === '') {
      if (this.p === -1 || this.w === -1 || this.d === -1 || this.TransportDetails.transportName === '' || this.TransportDetails.personInCharge === '' || this.TransportDetails.addressTransport === '' || this.TransportDetails.email === '') {
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
                          this.TransportDetails.addressTransport = this.TransportDetails.addressTransport + ', ' + wa.nameW + ', ' + dt.nameD + ', ' + pr.nameP
                          this.TransportDetails._status = 0;
                          this.TransportDetails.transportId = '';
                          this.TransportDetails.date_create = '2022-10-11T07:40:25.49';
                          this.TransportDetails.date_update = '2022-10-11T07:40:25.49';
                          this.testService.addTransport(this.TransportDetails)
                            .subscribe({
                              next: (f) => {
                                this.ngOnInit();
                                this.TransportDetails.transportName = '',
                                  this.TransportDetails.addressTransport = '',
                                  this.TransportDetails.note = '',
                                  this.TransportDetails.email = '',
                                  this.TransportDetails.personInCharge = '',

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
      this.testService.updateTransport(this.TransportDetails)
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