import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { MFView } from 'src/app/models/models-view/MFView.model';
import { Inventory } from 'src/app/models/inventory.model';
import { environment } from 'src/environments/environment';
import { popUpReceiveFruit } from '../receive-goods/final.component';
import { NoticeData } from 'src/app/models/noticeData.model';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-inventorymerchantbystore',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class InventoryMerchantbyStoreComponent implements OnInit {

  displayedColumnsFactory: string[] = ['billId', 'fruitName', 'farmName', 'addressFarm',
    'merchantName', 'addressMerchant', 'weight',
    'unit', 'system'];

  dataSourceFactory = new MatTableDataSource<MFView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  mcId: string
  MerchantFarms: MFView[] = [];

  constructor(private testService: APIservicesService,
    public dialog: MatDialog, private route: ActivatedRoute,
    private _snackBar: MatSnackBar, public loadService: LoaderService) {
    this.mcId = ''
  }

  user = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.user = id
                this.mcId = re.workingFor
                this.testService.getAllMerchantFarmbyFactorys(this.mcId, 'Đang vận chuyến')
                  .subscribe({
                    next: (f) => {
                      this.MerchantFarms = f;
                      this.dataSourceFactory = new MatTableDataSource(f);
                      this.dataSourceFactory.paginator = this.paginator;
                      this.dataSourceFactory.sort = this.sort;
                    },
                    error: (response) => {
                      console.log(response);
                    }
                  });
              }
            });
        }
      }
    });
  }

  addHarvest: Inventory = {
    id: '',
    goodsId: '',
    storeId: '',
    amount: 0,
    unit: '',
    imageQR: '',
    status_request: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File;

  photoPath: string = environment.photoUrl
  photoPathName: string = ''

  onChange(event: any) {
    this.file = event.target.files[0];
    this.addHarvest.imageQR = this.file.name
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

  receive(id: string, a: number, u: string, mci: string, mc: string, f: string) {
    const dialogRef = this.dialog.open(popUpReceiveFruit, {
      width: '620px',
      height: '225px',
      data: { a: a, h: id, f: this.mcId, u: u, b: mci },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Đã xong') {
        this.testService.updateStatusBnt(id, mc, 'Đã hoàn tất')
          .subscribe({
            next: (re1) => {
            }
          })
        this.testService.updateStatusPtoP(mci)
          .subscribe({
            next: (e) => {
              this.ngOnInit()
              this.addNotice.sendId = this.user
              this.addNotice.receiveId = e.transportId
              this.addNotice.title = "Đã nhận hàng"
              this.addNotice.content = "Đã vận chuyển từ nông trại tới cửa hàng"
              this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
              this.addNotice.sendDate = '2022-10-11T07:40:25.49'
              this.testService.addNoticeTransport(this.addNotice)
                .subscribe({
                  next: (rew) => {
                    this.addNotice3.sendId = this.user
                    this.addNotice3.receiveId = mc
                    this.addNotice3.title = "Đã nhận trái"
                    this.addNotice3.content = "Đã vận chuyển từ nông trại tới cừa hàng"
                    this.addNotice3.receiveDate = '2022-10-11T07:40:25.49'
                    this.addNotice3.sendDate = '2022-10-11T07:40:25.49'
                    this.testService.addNoticeMerchant(this.addNotice3)
                      .subscribe({
                        next: (rew) => {
      
                        }
                      })
                  }
                })
            }
          })
        this.testService.updateStatusMF(mci, 'Đã xác nhận')
          .subscribe({
            next: (r3e => { this.ngOnInit() })
          })

        this._snackBar.open('Nhập thành công', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        });
      }
      else {
        this.ngOnInit()
      }
    })
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

  addNotice2: NoticeData = {
    content: '',
    id: '',
    receiveDate: '',
    receiveId: '',
    sendDate: '',
    sendId: '',
    status_request: '',
    title: '',
  }

  addNotice3: NoticeData = {
    content: '',
    id: '',
    receiveDate: '',
    receiveId: '',
    sendDate: '',
    sendId: '',
    status_request: '',
    title: '',
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFactory.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFactory.paginator) {
      this.dataSourceFactory.paginator.firstPage()
    }
  }
}
