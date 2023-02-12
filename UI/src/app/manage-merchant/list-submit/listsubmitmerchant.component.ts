import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FarmRequest } from 'src/app/models/farmRequest.model';
import { FQView } from 'src/app/models/models-view/FQView.model';
import { MerchantFarm } from 'src/app/models/merchantFarm.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { Factory } from 'src/app/models/factory.model';
import { Store } from 'src/app/models/store.model';
import { NoticeData } from 'src/app/models/noticeData.model';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-listsubmitmerchant',
  templateUrl: './listsubmitmerchant.component.html',
  styleUrls: ['./listsubmitmerchant.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ListSubmitMerchantComponent implements OnInit {

  displayedColumns: string[] = ['fruitName', 'placeName', 'address',
    'farm', 'amount', 'unit', 'system'];

  dataSource = new MatTableDataSource<FQView>;

  add: FarmRequest = {
    farmId: '',
    harvestId: '',
    placeId: '',
    status_request: '',
    amount: 0,
    unit: '',
    _status: 0,
    status_btn: '',
    date_create: '',
    date_update: '',
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  FR: FarmRequest[] = []

  constructor(private testService: APIservicesService,
    private route: ActivatedRoute,
    public dialog: MatDialog, public loadService: LoaderService) {
  }

  dang = "Đăng"
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
                this.place = re.workingFor
                this.user = id
                this.testService.getAllFarmRequestbyPlaces(re.workingFor, 'Đã xác nhận', 'Last 7 Day_Đăng')
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
    const dialogRef = this.dialog.open(popUpDetail, {
      width: '400px',
      height: '300px',
      data: { id: id, h: h, f: f, w: w, u: u, us: this.user },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    })
  }

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  choices: string[] = ["Đăng", "Đang vận chuyển", "Hoàn tất"]
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
export class popUpDetail implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<popUpDetail>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, h: string, f: string, w: number, u: string, us: string },
    private testService: APIservicesService,
    private _snackBar: MatSnackBar
  ) {
    this.check1 = false
    this.check2 = false
  }
  ngOnInit(): void {
    const id = this.data.id
    const h = this.data.h
    const f = this.data.f
    const w = this.data.w
    const u = this.data.u
    console.log(h)

    this.addDetail.merchantId = id
    this.addDetail.farmId = f
    this.addDetail.harvestId = h
    this.addDetail.weight_mf = w
    this.addDetail.unit = u
  }

  addDetail: MerchantFarm = {
    billId: '',
    farmId: '',
    merchantId: '',
    harvestId: '',
    toPlace: '',
    weight_mf: 0,
    weight_delivery: 0,
    unit: '',
    status_request: '',
    _status: 0,
    date_create: '',
    date_update: '',
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


  units: string[] = ['Kg', 'Tấn', 'Tạ', 'Yến']
  places: string[] = ['Cửa hàng', 'Nhà máy sản xuất']

  toPlace = ""
  toPlaceChange() {
    if (this.toPlace === "Cửa hàng") {
      this.check1 = false
      this.check2 = true
      this.testService.getAllStores()
        .subscribe({
          next: (re) => {
            this.stores = re
          }
        })
    } else {
      this.check2 = false
      this.check1 = true
      this.testService.getAllFactorys()
        .subscribe({
          next: (re) => {
            this.factorys = re
          }
        })
    }
  }

  check1: boolean
  check2: boolean
  stores: Store[] = []
  factorys: Factory[] = []

  onNoClick(): void {
    this.dialogRef.close();
  }

  change(event: Event) {
    this.addDetail.billId = ''
    this.addDetail._status = 0
    this.addDetail.weight_delivery = 0
    this.addDetail.status_request = 'Đang tìm'
    this.addDetail.date_create = '2022-10-11T07:40:25.49'
    this.addDetail.date_update = '2022-10-11T07:40:25.49'
    this.testService.addMerchantFarm(this.addDetail)
      .subscribe({
        next: (re) => {
          this.testService.updateStatusBnt(this.addDetail.harvestId, this.addDetail.merchantId, 'Đang tìm')
            .subscribe({
              next: (re) => {

              }
            })
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
          this.dialogRef.close();
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
