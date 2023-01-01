import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { Inventory } from 'src/app/models/inventory.model';
import { UTOView } from 'src/app/models/models-view/UTOView.model';
import { environment } from 'src/environments/environment';
import { NoticeData } from 'src/app/models/noticeData.model';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {

  displayedColumnsStore: string[] = ['billId', 'placeName', 'addressPlace'
    , 'toPlaceName', 'addresstoPlace'
    , 'goodsName', 'amount', 'unit', 'system'];

  dataSourceStore = new MatTableDataSource<UTOView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  mcId: string
  UpTos: UTOView[] = [];

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
                this.testService.getAllUpToTransportbyPlacesView(this.mcId, 'Đang vận chuyển')
                  .subscribe({
                    next: (f) => {
                      this.UpTos = f;
                      this.dataSourceStore = new MatTableDataSource(f);
                      this.dataSourceStore.paginator = this.paginator;
                      this.dataSourceStore.sort = this.sort;
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

  addInventory: Inventory = {
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
    this.addInventory.imageQR = this.file.name
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

  receive(id: string, a: number, u: string, mci: string, p: string) {
    this.addInventory.id = '',
      this.addInventory._status = 0,
      this.addInventory.status_request = 'Đã nhận'
    this.addInventory.date_create = '2022-10-11T07:40:25.49'
    this.addInventory.date_update = '2022-10-11T07:40:25.49'
    this.addInventory.storeId = this.mcId
    this.addInventory.goodsId = id
    this.addInventory.amount = a
    this.addInventory.unit = u
    this.addInventory.imageQR = environment.webUrl
    if (id.startsWith('SP')) {
      this.testService.updateFSStatus(id, this.mcId, 'Đã xác nhận')
        .subscribe({
          next: (re => { this.ngOnInit() })
        })
      this.testService.updateStatusBntFactory(id, this.mcId, 'Đã hoàn tất')
        .subscribe({
          next: (re) => {
            this.testService.updateStatusPtoP(mci)
              .subscribe({
                next: (e) => {
                  this.addNotice.sendId = this.user
                  this.addNotice.receiveId = e.transportId
                  this.addNotice.title = "Đã nhận hàng"
                  this.addNotice.content = "Đã vận chuyển từ nhà máy tới cửa hàng"
                  this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                  this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                  this.testService.addNoticeTransport(this.addNotice)
                    .subscribe({
                      next: (rew) => {
                        this.addNotice2.sendId = this.user
                        this.addNotice2.receiveId = p
                        this.addNotice2.title = "Đã nhận trái"
                        this.addNotice2.content = "Đã vận chuyển từ nhà máy tới cửa hàng"
                        this.addNotice2.receiveDate = '2022-10-11T07:40:25.49'
                        this.addNotice2.sendDate = '2022-10-11T07:40:25.49'
                        this.testService.addNoticeFactory(this.addNotice2)
                          .subscribe({
                            next: (rew) => {

                            }
                          })
                      }
                    })


                  this.ngOnInit()
                }
              })
          }
        })
      this.testService.addInventoryAutoProduct(this.addInventory)
        .subscribe(
          response => {
            let fileName = response.headers.get('content-disposition')
              ?.split(';')[1].split('=')[1];
            let blob: Blob = response.body as Blob;

            let a = document.createElement('a')
            if (fileName !== undefined) {
              a.download = fileName
            }

            a.href = window.URL.createObjectURL(blob)
            a.click()
          }
        )
      this.testService.updateStatusUTO(mci, 'Đã xác nhận').
        subscribe({
          next: (re) => {
            this.ngOnInit()
            this._snackBar.open('Nhập thành công', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 1500,
              panelClass: ['snackbar']
            });
          }
        })
    }
    else {
      const dialogRef = this.dialog.open(popUpReceiveFruit, {
        width: '620px',
        height: '225px',
        data: { a: a, h: id, f: this.mcId, u: u, b: mci },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'Đã xong') {
          this.testService.updateStatusBnt(id, this.mcId, 'Đã hoàn tất')
            .subscribe({
              next: (re) => {
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
                      this.addNotice2.sendId = this.user
                      this.addNotice2.receiveId = p
                      this.addNotice2.title = "Đã nhận trái"
                      this.addNotice2.content = "Đã vận chuyển từ nông trại tới cửa hàng"
                      this.addNotice2.receiveDate = '2022-10-11T07:40:25.49'
                      this.addNotice2.sendDate = '2022-10-11T07:40:25.49'
                      this.testService.addNoticeFarm(this.addNotice2)
                        .subscribe({
                          next: (rew) => {

                          }
                        })
                    }
                  })
              }
            })
          this.testService.updateStatus(id, this.mcId, 'Đã xác nhận')
            .subscribe({
              next: (re => { this.ngOnInit() })
            })
          this.testService.updateStatusUTO(mci, 'Đã xác nhận').
            subscribe({
              next: (re) => {
                this.ngOnInit()
              }
            })
        }
        else { this.ngOnInit() }
      });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceStore.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceStore.paginator) {
      this.dataSourceStore.paginator.firstPage()
    }
  }
}

@Component({
  selector: 'popUpReceiveFruit',
  templateUrl: 'popUpFruit.html',
  styleUrls: ['./popUpFruit.scss']
})
export class popUpReceiveFruit implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<popUpReceiveFruit>,
    @Inject(MAT_DIALOG_DATA) public data: { a: number, h: string, f: string, u: string, b: string },
    private testService: APIservicesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.data.a
    const h = this.data.h
    const f = this.data.f
    const u = this.data.u

    this.addDetail.imageQR = environment.webUrl
    this.addDetail.storeId = f
    this.addDetail.goodsId = h
    this.addDetail.unit = 'Kg'
    this.addDetail.id = '',
      this.addDetail._status = 0,
      this.addDetail.status_request = 'Đã nhận'
    this.addDetail.date_create = '2022-10-11T07:40:25.49'
    this.addDetail.date_update = '2022-10-11T07:40:25.49'
  }

  tong = 0
  addDetail: Inventory = {
    goodsId: '',
    id: '',
    imageQR: '',
    storeId: '',
    amount: 0,
    unit: '',
    _status: 0,
    date_create: '',
    date_update: '',
    status_request: ''
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  change(event: Event) {
    if (this.data.b.startsWith('BMFP')) {
      this.testService.getIdMerchantFarm(this.data.b)
        .subscribe({
          next: (re) => {
            this.tong = parseFloat(this.addDetail.amount.toString()) + parseFloat(re.weight_delivery.toString())
            this.testService.exChangeFruit(this.data.a, this.data.u)
              .subscribe({
                next: (ex) => {
                  const exp = parseFloat(ex.toString())
                  if (this.tong > exp) {
                    this._snackBar.open('Số lượng không đủ!!!', 'OK', {
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                      duration: 3000,
                      panelClass: ['snackbar']
                    });
                  }
                  else {
                    this.testService.addInventory(this.addDetail)
                      .subscribe(response => {
                        let fileName = response.headers.get('content-disposition')
                          ?.split(';')[1].split('=')[1];
                        let blob: Blob = response.body as Blob;

                        let a = document.createElement('a')
                        if (fileName !== undefined) {
                          a.download = fileName
                        }

                        a.href = window.URL.createObjectURL(blob)
                        a.click()
                        this.testService.updateWeightMF(this.data.b, this.tong)
                          .subscribe({
                            next: (re2) => {
                              if (this.tong === exp) {
                                this.dialogRef.close('Đã xong')
                                this._snackBar.open('Đã nhập đủ số lượng nhận hàng!!!', 'OK', {
                                  horizontalPosition: 'center',
                                  verticalPosition: 'top',
                                  duration: 3000,
                                  panelClass: ['snackbar']
                                });
                              }
                              else {
                                this.addDetail.amount = 0
                                this._snackBar.open('Đã nhập thành công!!!', 'OK', {
                                  horizontalPosition: 'center',
                                  verticalPosition: 'top',
                                  duration: 3000,
                                  panelClass: ['snackbar']
                                });
                              }
                            }
                          })
                      }

                      )
                  }
                }
              })
          }
        })
    }
    else {
      this.testService.getIdUpToTransport(this.data.b)
        .subscribe({
          next: (re) => {
            this.tong = parseFloat(this.addDetail.amount.toString()) + parseFloat(re.amountDelivery.toString())
            this.testService.exChangeFruit(this.data.a, this.data.u)
              .subscribe({
                next: (ex) => {
                  const exp = parseFloat(ex.toString())
                  if (this.tong > exp) {

                    this._snackBar.open('Số lượng không đủ!!!', 'OK', {
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                      duration: 3000,
                      panelClass: ['snackbar']
                    });
                  }
                  else {
                    this.testService.addInventory(this.addDetail)
                      .subscribe(
                        response => {
                          let fileName = response.headers.get('content-disposition')
                            ?.split(';')[1].split('=')[1];
                          let blob: Blob = response.body as Blob;

                          let a = document.createElement('a')
                          if (fileName !== undefined) {
                            a.download = fileName
                          }

                          a.href = window.URL.createObjectURL(blob)
                          a.click()
                          this.testService.updateAmountUTO(this.data.b, this.tong)
                            .subscribe({
                              next: (re2) => {
                                if (this.tong === exp) {
                                  this.dialogRef.close('Đã xong')
                                  this._snackBar.open('Đã nhập đủ số lượng nhận hàng!!!', 'OK', {
                                    horizontalPosition: 'center',
                                    verticalPosition: 'top',
                                    duration: 3000,
                                    panelClass: ['snackbar']
                                  });
                                }
                                else {
                                  this.addDetail.amount = 0
                                  this._snackBar.open('Đã nhập thành công!!!', 'OK', {
                                    horizontalPosition: 'center',
                                    verticalPosition: 'top',
                                    duration: 3000,
                                    panelClass: ['snackbar']
                                  });
                                }
                              }
                            })
                        }

                      )
                  }
                }
              })
          }
        })
    }
  }
}

