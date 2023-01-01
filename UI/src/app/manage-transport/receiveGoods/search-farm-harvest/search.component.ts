import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Fruit } from 'src/app/models/fruit.model';
import { FruitHarvest } from 'src/app/models/fruitHarvest.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { TransportPtoP } from 'src/app/models/transportPtoP.model';
import { DetailTransportPtoP } from 'src/app/models/detailTransportPtoP.model';
import { MFView } from 'src/app/models/models-view/MFView.model';
import { NoticeData } from 'src/app/models/noticeData.model';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-searchTransport',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchTransportComponent implements OnInit {

  displayedColumnsTransport: string[] = ['billId', 'fruitName', 'farmName', 'addressFarm',
                                        'merchantName', 'toPlaceName', 'addresstoPlace',
                                        'weight', 'unit', 'system'];

  dataSourceTransport = new MatTableDataSource<MFView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  MerchantFarms: MFView[] = [];

  constructor(private testService: APIservicesService,
    public dialog: MatDialog, private route: ActivatedRoute,
    private _snackBar: MatSnackBar, public loadService: LoaderService) {
    this.mcId = ''
  }

  billItem: string[] = []
  Fruits: Fruit[] = []
  FruitHarvests: FruitHarvest[] = []

  user = ''

  ngOnInit(): void {
    this.testService.getAllMerchantFarmbyTransports()
      .subscribe({
        next: (f) => {
          this.MerchantFarms = f;
          this.dataSourceTransport = new MatTableDataSource(f);
          this.dataSourceTransport.paginator = this.paginator;
          this.dataSourceTransport.sort = this.sort;
        },
        error: (response) => {
          console.log(response);
        }
      });

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

  mcId: string
  bill: string = ""

  receive(id1: string, p: string, h: string, f: string, t: string) {
    this.addTMRequest.billId = ''
    this.addTMRequest._status = 0
    this.addTMRequest.date_create = '2022-10-11T07:40:25.49'
    this.addTMRequest.date_update = '2022-10-11T07:40:25.49'
    this.addTMRequest.status_request = 'Đang vận chuyển'
    this.addTMRequest.transportId = this.mcId
    this.addTMRequest.placeId = p
    this.testService.updateStatusMF(id1, 'Đang vận chuyến')
      .subscribe({
        next: (re) => {
        }
      })
    this.testService.updateStatusBnt(h, p, 'Đang vận chuyển')
      .subscribe({
        next: (re) => {
        }
      })
    this.testService.addTransportPtoP(this.addTMRequest)
      .subscribe({
        next: (re) => {
          this.addDetail.billId = re.billId
          this.addDetail.itemBillId = id1
          this.testService.addDetailTransportPtoP(this.addDetail)
            .subscribe({
              next: (re) => {

                if(t.startsWith('NM')){
                  this.addNotice.sendId = this.user
                  this.addNotice.receiveId = t
                  this.addNotice.title = "Có đơn hàng"
                  this.addNotice.content = "Xe chuẩn bị lấy hàng và vận chuyển từ nông trại tới nhà máy"
                  this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                  this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                  this.testService.addNoticeFactory(this.addNotice)
                    .subscribe({
                      next: (rew) => {
                        this.addNotice2.sendId = this.user
                        this.addNotice2.receiveId = p
                        this.addNotice2.title = "Chuẩn bị lấy hàng"
                        this.addNotice2.content = "Chuẩn bị xe tới vận chuyển từ nông trại tới nhà máy"
                        this.addNotice2.receiveDate = '2022-10-11T07:40:25.49'
                        this.addNotice2.sendDate = '2022-10-11T07:40:25.49'
                        this.testService.addNoticeFarm(this.addNotice2)
                          .subscribe({
                            next: (rew) => {
                              this.addNotice3.sendId = this.user
                              this.addNotice3.receiveId = f
                              this.addNotice3.title = "Đã nhận đơn"
                              this.addNotice3.content = "Cho xe vận chuyển từ nông trại tới nhà máy"
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
                }
                else{
                  this.addNotice.sendId = this.user
                  this.addNotice.receiveId = t
                  this.addNotice.title = "Có đơn hàng"
                  this.addNotice.content = "Xe chuẩn bị lấy hàng và vận chuyển từ nông trại tới cửa hàng"
                  this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                  this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                  this.testService.addNoticeStore(this.addNotice)
                    .subscribe({
                      next: (rew) => {
                        this.addNotice2.sendId = this.user
                        this.addNotice2.receiveId = p
                        this.addNotice2.title = "Chuẩn bị lấy hàng"
                        this.addNotice2.content = "Chuẩn bị xe tới vận chuyển từ nông trại tới cửa hàng"
                        this.addNotice2.receiveDate = '2022-10-11T07:40:25.49'
                        this.addNotice2.sendDate = '2022-10-11T07:40:25.49'
                        this.testService.addNoticeFarm(this.addNotice2)
                          .subscribe({
                            next: (rew) => {
                              this.addNotice3.sendId = this.user
                              this.addNotice3.receiveId = f
                              this.addNotice3.title = "Đã nhận đơn"
                              this.addNotice3.content = "Cho xe vận chuyển từ nông trại tới cửa hàng"
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
                }
                this.ngOnInit()
                this._snackBar.open('Nhận đơn thành công', 'OK', {
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

  addTMRequest: TransportPtoP = {
    billId: '',
    placeId: '',
    transportId: '',
    humidity: 0,
    temperature: 0,
    status_request: '',
    _status: 0,
    date_create: '',
    date_update: ''
  }

  addDetail: DetailTransportPtoP = {
    billId: '',
    itemBillId: '',
    status_request: '',
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
    this.dataSourceTransport.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTransport.paginator) {
      this.dataSourceTransport.paginator.firstPage()
    }
  }
}
