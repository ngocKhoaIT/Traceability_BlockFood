import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmRequest } from 'src/app/models/farmRequest.model';
import { FQView } from 'src/app/models/models-view/FQView.model';
import { NoticeData } from 'src/app/models/noticeData.model';
import { UpToTransport } from 'src/app/models/uptotransport.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-listsubmitstore',
  templateUrl: './listsubmitstore.component.html',
  styleUrls: ['./listsubmitstore.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ListSubmitStoreComponent implements OnInit {

  displayedColumns: string[] = ['fruitName', 'placeName', 'address',
    'farm', 'amount', 'unit', 'system'];

  dataSource = new MatTableDataSource<FQView>;

  add: FarmRequest = {
    farmId: '',
    harvestId: '',
    placeId: '',
    status_request: '',
    status_btn: '',
    amount: 0,
    unit: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  dang = 'Đăng'

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  FR: FarmRequest[] = []

  constructor(private testService: APIservicesService,
    public loadService: LoaderService, private route: ActivatedRoute,
    public dialog: MatDialog,) {
  }

  units: string[] = ['Kg', 'Tấn', 'Tạ', 'Yến']

  user = ''
  place = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.user = id
                this.place = re.workingFor
                this.testService.getAllFarmRequestbyPlaces(re.workingFor, 'Đã xác nhận', 'Today_Đăng')
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
            })
        }
      }
    })
  }

  transfer(id: string, h: string, f: string, w: number, u: string) {
    const dialogRef = this.dialog.open(popUpDetailSFA, {
      width: '700px',
      height: 'auto',
      data: { id: id, h: h, f: f, w: w, u: u, us: this.user },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    })
  }

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  choices: string[] = ["Đăng", "Đang tìm", "Đang vận chuyển", "Đã hoàn tất"]
  choice = ''

  filter(req: string, id: string) {
    this.testService.getAllFarmRequestbyPlaces(this.place, 'Đã xác nhận', req+'_'+id)
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

@Component({
  selector: 'popUpDetail',
  templateUrl: 'popUpDetail.html',
  styleUrls: ['./popUpDetail.scss']
})
export class popUpDetailSFA implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<popUpDetailSFA>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, h: string, f: string, w: number, u: string, us: string },
    private testService: APIservicesService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    const id = this.data.id
    const h = this.data.h
    const f = this.data.f
    const w = this.data.w
    const u = this.data.u

    this.addDetail.toPlace = id
    this.addDetail.placeId = f
    this.addDetail.goodsId = h
    this.addDetail.amount = w
    this.addDetail.unit = u
  }

  addDetail: UpToTransport = {
    billId: '',
    placeId: '',
    goodsId: '',
    toPlace: '',
    amount: 0,
    amountDelivery: 0,
    unit: '',
    status_request: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  units: string[] = ['Kg', 'Tấn', 'Tạ', 'Yến']

  onNoClick(): void {
    this.dialogRef.close();
  }

  change(event: Event) {
    if(this.addDetail.amount <= 0)
    {
      this._snackBar.open('Nhập số lớn hơn 0', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: ['snackbar']
      });
    }
    else
    {
      this.addDetail.billId = ''
      this.addDetail._status = 0
      this.addDetail.amountDelivery = 0
      this.addDetail.status_request = 'Đang tìm'
      this.addDetail.date_create = '2022-10-11T07:40:25.49'
      this.addDetail.date_update = '2022-10-11T07:40:25.49'
      this.testService.addUpToTransport(this.addDetail)
        .subscribe({
          next: (re) => {
            this.dialogRef.close();
            this.testService.updateStatusBnt(this.addDetail.goodsId, this.addDetail.toPlace, 'Đang tìm')
              .subscribe({
                next: (re) => {
                  this.addNotice.sendId = this.data.us
                  this.addNotice.title = "Đăng tìm đơn vị vận chuyển"
                  this.addNotice.content = "Tìm đơn vị vận chuyển để chuyển hàng"
                  this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                  this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                  this.testService.addNoticeAllTransport(this.addNotice)
                    .subscribe({
                      next: (rewq) => {
  
                      }
                    })
                }
              })
            this._snackBar.open('Đã tạo đơn và tìm đơn vị vận chuyển', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 1500,
              panelClass: ['snackbar']
            });
          }
        })
    }
  }

  addNotice: NoticeData = {
    content: '',
    id: '',
    receiveDate: '',
    receiveId: '',
    sendDate: '',
    sendId: '',
    status_request: '',
    title: '',
  }

}
