import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Farm } from 'src/app/models/farm.model';
import { FarmRequest } from 'src/app/models/farmRequest.model';
import { FruitHarvest } from 'src/app/models/fruitHarvest.model';
import { FHFView } from 'src/app/models/models-view/FHFView.model';
import { MCFView } from 'src/app/models/models-view/MCFView.model';
import { NoticeData } from 'src/app/models/noticeData.model';
import { Province } from 'src/app/models/Province.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-searchfarmbystore',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchFarmbyStoreComponent implements OnInit {

  displayedColumnsFarm: string[] = ['farmName', 'addressFarm', 'note',
                                      'farmerName', 'phoneNumber', 'email',
                                      'system'];

  dataSourceFarm = new MatTableDataSource<MCFView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  lookFarm = ""
  findLookFarm(id: string) {
    const filterValue = id
    this.dataSourceFarm.filter = filterValue.trim().toLowerCase();
  }

  lookProvince = ""
  findLookProvince(id: string) {
    const filterValue = id
    this.dataSourceFarm.filter = filterValue.trim().toLowerCase();
  }

  Provinces: Province[] = []
  Farm2s: Farm[] = []
  Farms: MCFView[] = [];

  constructor(private testService: APIservicesService,
    public dialog: MatDialog, private route: ActivatedRoute,
    public loadService: LoaderService) {
    this.mcId = ''
  }
  FruitHarvests: FruitHarvest[] = []
  mcId: string
  user = ''

  ngOnInit(): void {
    this.testService.getAllFarmbyMerchants()
      .subscribe({
        next: (f) => {
          this.Farms = f;
          this.dataSourceFarm = new MatTableDataSource(f);
          this.dataSourceFarm.paginator = this.paginator;
          this.dataSourceFarm.sort = this.sort;
        },
        error: (response) => {
          console.log(response);
        }
      });

    this.testService.getAllFarms()
      .subscribe({
        next: (re) => {
          this.Farm2s = re
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
    const dialogRef = this.dialog.open(popUpSearchFarmbyStore, {
      width: '1280px',
      height: 'auto',
      data: { id: this.mcId, f: id , u: this.user},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  cancel() {
    // this.addSearchFarmRequest.SearchFarmName='',
    // this.addSearchFarmRequest.fruitId = '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFarm.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFarm.paginator) {
      this.dataSourceFarm.paginator.firstPage()
    }
  }
}

@Component({
  selector: 'popUpSearchFarmbyStore',
  templateUrl: 'popUpSearch.html',
  styleUrls: ['./popUpSearch.scss']
})
export class popUpSearchFarmbyStore implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<popUpSearchFarmbyStore>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, f: string, u: string },
    private testService: APIservicesService,
    private _snackBar: MatSnackBar, public dialog: MatDialog,
  ) {
    this.farm = ''
    this.mc = ''
    this.btn = ''
  }

  displayedColumnsFruitHarvest: string[] = ['fruitName', 'date_plant', 'date_harvest',
    'weight_harvest', 'unit', 'system'];

  dataSourceFruitHarvest = new MatTableDataSource<FHFView>;

  fruitHarvests: FHFView[] = []

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFruitHarvest.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFruitHarvest.paginator) {
      this.dataSourceFruitHarvest.paginator.firstPage()
    }
  }

  btn: string
  farm: string
  mc: string

  ngOnInit(): void {
    const id = this.data.id;
    const f = this.data.f;

    if (id && f) {
      this.farm = f
      this.mc = id
      this.testService.getIdFruitHarvestbyFarmView(f, id)
        .subscribe({
          next: (fhs) => {
            this.fruitHarvests = fhs,
              this.dataSourceFruitHarvest = new MatTableDataSource(fhs)
            this.dataSourceFruitHarvest.sort = this.sort
            this.dataSourceFruitHarvest.paginator = this.paginator
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

  buyFruit(h: string) {
    const dialogRef = this.dialog.open(popUpBuybyStore, {
      width: '700px',
      height: 'auto',
      data: { id: this.mc, h: h, f: this.farm, u: this.data.u },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });

  }

}

@Component({
  selector: 'popUpBuybyStore',
  templateUrl: 'popUpBuy.html',
  styleUrls: ['./popUpBuy.scss']
})
export class popUpBuybyStore implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<popUpBuybyStore>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, h: string, f: string, u: string},
    private testService: APIservicesService,
    private _snackBar: MatSnackBar, private _formBuilder: FormBuilder
  ) {
    this.formGroup = this._formBuilder.group({})
  }

  formGroup: FormGroup;

  ngOnInit(): void {

    this.formGroup = this._formBuilder.group({
      Ctrl1: ['', Validators.required,],
      Ctrl2: ['', Validators.required],
    })
    const id = this.data.id
    const h = this.data.h
    const f = this.data.f

    this.addDetail.placeId = id
    this.addDetail.farmId = f
    this.addDetail.harvestId = h
  }

  addDetail: FarmRequest = {
    farmId: '',
    harvestId: '',
    status_btn: '',
    placeId: '',
    status_request: '',
    amount: 0,
    unit: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  units: string[] = ['Kg', 'Tấn', 'Tạ', 'Yến']

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
    this.testService.getIdFruitHarvest(this.data.h)
      .subscribe({
        next: (re1) => {
          const hientai = re1.weight_harvest
          this.testService.exChangeFruit(this.addDetail.amount, this.addDetail.unit)
            .subscribe({
              next: (re2) => {
                const nhap = parseFloat(re2.toString())
                if (nhap > hientai) {
                  this._snackBar.open('Không đủ số lượng', 'OK', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 3000,
                    panelClass: ['snackbar']
                  });
                }
                else {
                  this.addDetail._status = 0
                  this.addDetail.status_request = 'Chờ xác nhận'
                  this.addDetail.date_create = '2022-10-11T07:40:25.49'
                  this.addDetail.date_update = '2022-10-11T07:40:25.49'
                  this.addDetail.status_btn = 'Đăng'
                  this.testService.addFarmRequest(this.addDetail)
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
      })
  }
}
