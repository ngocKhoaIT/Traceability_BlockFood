import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Factory } from 'src/app/models/factory.model';
import { FactoryRequest } from 'src/app/models/factoryRequest.model';
import { PSView } from 'src/app/models/models-view/PSView.model';
import { NoticeData } from 'src/app/models/noticeData.model';
import { Province } from 'src/app/models/Province.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-searchStore',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchStoreComponent implements OnInit {

  displayedColumnsFactory: string[] = ['factoryId', 'factoryName', 'email', 'addressFactory',
    'personInCharge', 'note', 'system'];

  dataSourceFactory = new MatTableDataSource<Factory>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  lookFarm = ""
  findLookFarm(id: string) {
    const filterValue = id
    this.dataSourceFactory.filter = filterValue.trim().toLowerCase();
  }

  lookProvince = ""
  findLookProvince(id: string) {
    const filterValue = id
    this.dataSourceFactory.filter = filterValue.trim().toLowerCase();
  }

  Provinces: Province[] = []
  Factory2s: Factory[] = []
  Factorys: Factory[] = [];

  constructor(private testService: APIservicesService,
    public dialog: MatDialog, private route: ActivatedRoute,
    public loadService: LoaderService) {
    this.mcId = ''
  }

  mcId: string
  user = ''

  ngOnInit(): void {
    this.testService.getAllFactorybyProducts()
      .subscribe({
        next: (f) => {
          this.Factorys = f;
          this.dataSourceFactory = new MatTableDataSource(f);
          this.dataSourceFactory.paginator = this.paginator;
          this.dataSourceFactory.sort = this.sort;
        },
        error: (response) => {
          console.log(response);
        }
      });

    this.testService.getAllFactorys()
      .subscribe({
        next: (re) => {
          this.Factory2s = re
        }
      })

    this.testService.getProvince()
      .subscribe({
        next: (re) => {
          this.Provinces = re
        }
      })

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.user = id
                this.mcId = re.workingFor
              }
            });
        }
      }
    });
  }

  view(id: string) {
    const dialogRef = this.dialog.open(popUpSearchProduct, {
      width: '1280px',
      height: '570px',
      data: { id: this.mcId, f: id, u: this.user },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  cancel() {
    // this.addSearchStoreRequest.SearchStoreName='',
    // this.addSearchStoreRequest.fruitId = '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFactory.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFactory.paginator) {
      this.dataSourceFactory.paginator.firstPage()
    }
  }
}

@Component({
  selector: 'popUpSearchProduct',
  templateUrl: 'popUpSearch.html',
  styleUrls: ['./popUpSearch.scss']
})
export class popUpSearchProduct implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<popUpSearchProduct>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, f: string, us: string },
    private testService: APIservicesService,
    private _snackBar: MatSnackBar, public dialog: MatDialog,
  ) {
    this.factory = ''
    this.p = ''
    this.btn = ''
  }

  displayedColumnsFactory: string[] = ['productId', 'productName', 'typeProductId',
    'factoryName', 'addressFactory',
    'mfg_date', 'exp_date', 'net_weight', 'system'];

  dataSourceFactory = new MatTableDataSource<PSView>;

  products: PSView[] = []

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFactory.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFactory.paginator) {
      this.dataSourceFactory.paginator.firstPage()
    }
  }

  p: string
  btn: string
  factory: string

  ngOnInit(): void {
    const id = this.data.id;
    const f = this.data.f;

    if (id && f) {
      this.p = id
      this.factory = f
      this.testService.getAllProductbyFactoryViews(f, id)
        .subscribe({
          next: (p) => {
            this.products = p,
              this.dataSourceFactory = new MatTableDataSource(p)
            this.dataSourceFactory.sort = this.sort
            this.dataSourceFactory.paginator = this.paginator
          },
          error: (response) => {
            console.log(response);
          }
        });
    }


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buyProduct(h: string, u: string) {
    const dialogRef = this.dialog.open(popUpBuyProduct, {
      width: '620px',
      height: '225px',
      data: { id: this.p, h: h, f: this.factory, u: u, us: this.data.us },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'popUpBuyProduct',
  templateUrl: 'popUpBuy.html',
  styleUrls: ['./popUpBuy.scss']
})
export class popUpBuyProduct implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<popUpBuyProduct>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, h: string, f: string, u: string, us: string },
    private testService: APIservicesService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    const id = this.data.id
    const h = this.data.h
    const f = this.data.f
    const u = this.data.u

    this.addDetail.placeId = id
    this.addDetail.factoryId = f
    this.addDetail.productId = h
    this.addDetail.unit = u
  }

  addDetail: FactoryRequest = {
    factoryId: '',
    placeId: '',
    productId: '',
    amount: 0,
    unit: '',
    _status: 0,
    status_btn: '',
    date_create: '',
    date_update: '',
    status_request: ''
  }

  units: string[] = ['Hộp', 'Cái', 'Phần']

  onNoClick(): void {
    this.dialogRef.close();
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
      this.testService.getIdProduct(this.data.h)
      .subscribe({
        next: (re1) => {
          if (this.addDetail.amount > re1.amountProduct) {
            this._snackBar.open('Không đủ số lượng', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 1500,
              panelClass: ['snackbar']
            });
          }
          else {
            this.addDetail._status = 0
            this.addDetail.status_request = 'Chờ xác nhận'
            this.addDetail.status_btn = 'Đăng'
            this.addDetail.date_create = '2022-10-11T07:40:25.49'
            this.addDetail.date_update = '2022-10-11T07:40:25.49'
            this.testService.addFactoryRequest(this.addDetail)
              .subscribe({
                next: (re) => {
                  this.addNotice.sendId = this.data.u
                  this.addNotice.receiveId = this.data.f
                  this.addNotice.title = "Gửi yêu cầu"
                  this.addNotice.content = "Mong muốn được nông trại xác nhận giao hàng"
                  this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                  this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                  this.testService.addNoticeFarm(this.addNotice)
                    .subscribe({
                      next: (rew) => {

                      }
                    })
                  this.dialogRef.close();
                  this._snackBar.open('Đã gửi yêu cầu', 'OK', {
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
