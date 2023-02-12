import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NoticeDelete } from 'src/app/base/notice-delete/notice-delete.component';
import { Seed } from 'src/app/models/seed.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-seed',
  templateUrl: './seed.component.html',
  styleUrls: ['./seed.component.scss']
})
export class SeedComponent implements OnInit {

  constructor(public dialog: MatDialog, private testService: APIservicesService,
    private route: ActivatedRoute, private _snackBar: MatSnackBar,
    public loadService: LoaderService,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.farmId = re.workingFor
                this.testService.getSeedsbyFilters(re.workingFor, 'Today')
                  .subscribe({
                    next: (seed) => {
                      this.dataSource = new MatTableDataSource(seed);
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.sort = this.sort;
                    }
                  })
              }
            })
        }
      }
    })
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['seedId', 'seedName', 'system'];

  dataSource = new MatTableDataSource<Seed>;

  farmId = ''

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  filter(req: string) {
    this.testService.getSeedsbyFilters(this.farmId, req)
      .subscribe({
        next: (seed) => {
          this.dataSource = new MatTableDataSource(seed);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
  }

  add(event: Event) {
    const dialogRef = this.dialog.open(popUpSeed, {
      width: '700px',
      height: 'auto',
      data: { id: 0, farm: this.farmId },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  redirectToUpdate(id: number): void {
    const dialogRef = this.dialog.open(popUpSeed, {
      width: '700px',
      height: 'auto',
      data: { id: id, farm: this.farmId },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  redirectToDelete(id: number) {
    const dialogRef = this.dialog.open(NoticeDelete, {
      width: 'auto',
      height: 'auto',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.testService.deleteSeed(id)
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
  selector: 'popUpSeed',
  templateUrl: 'popUpSeed.html',
  styleUrls: ['./popUpSeed.scss']
})
export class popUpSeed implements OnInit {
  checkId: boolean
  loginValid = true
  btnChange: string
  btnColor: string

  Seeds: Seed[] = []

  ngOnInit(): void {
    this.SeedDetails.farmId = this.data.farm
    const id = this.data.id
    if (id !== 0) {
      this.checkId = true
      this.btnChange = 'Cập nhật'
      this.btnColor = '#edea16'
      this.apiService.getIdSeed(id)
        .subscribe({
          next: (response) => {
            this.SeedDetails = response;
          }
        }
        )
    }
    else {
      this.checkId = true
      this.btnChange = 'Thêm'
      this.btnColor = '#228B22'
    }
  }

  constructor(
    public dialogRef: MatDialogRef<popUpSeed>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, farm: string },
    private apiService: APIservicesService,
    private _snackBar: MatSnackBar,
  ) {
    this.checkId = true
    this.btnChange = ''
    this.btnColor = ''
  }

  SeedDetails: Seed = {
    seedId: 0,
    seedName: '',
    farmId: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  change(event: Event) {
    this.loginValid = true;
    const id = this.data.id;

    if (id !== 0) {
      if (this.SeedDetails.seedName === '') {
        this._snackBar.open('Chưa nhập đủ dữ liệu', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        });
      }
      else {
        this.loginValid = true;
        this.apiService.updateSeed(this.SeedDetails)
          .subscribe({
            next: (re) => {
              console.log(re),
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
    }
    else {
      if (this.SeedDetails.seedName === '') {
        this._snackBar.open('Chưa nhập đủ dữ liệu', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        });
      }
      else {
        if (this.SeedDetails.seedName !== "") {
          this.apiService.checkNameSeed(this.data.farm, this.SeedDetails.seedName)
            .subscribe({
              next: (re) => {
                if (re.toString() == "Đã tồn tại") {
                  this._snackBar.open('Giống cây này đã tồn tại', 'OK', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 1500,
                    panelClass: ['snackbar']
                  });
                }
                else {
                  this.SeedDetails._status = 0;
                  this.SeedDetails.seedId = 0;
                  this.SeedDetails.date_create = '2022-10-11T07:40:25.49';
                  this.SeedDetails.date_update = '2022-10-11T07:40:25.49';
                  this.apiService.addSeed(this.SeedDetails)
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
        else{
          this._snackBar.open('Chưa nhập đủ dữ liệu', 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 1500,
            panelClass: ['snackbar']
          });
        }
      }
    }
  }

}