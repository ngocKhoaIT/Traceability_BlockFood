import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { InventoryFactory } from 'src/app/models/inventoryFactory.model';
import { MFView } from 'src/app/models/models-view/MFView.model';
import { NoticeData } from 'src/app/models/noticeData.model';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-searchfactory',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchFactoryComponent implements OnInit {

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

  addHarvest: InventoryFactory = {
    id: '',
    harvestId: '',
    factoryId: '',
    amount: 0,
    unit: '',
    _status: 0,
    date_create: '',
    date_update: '',
    checkM : 0,
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

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  receive(id: string, a: number, u: string, mci: string, mc: string, p: string) {
    this.testService.exChangeFruit(a, u)
      .subscribe({
        next: (re1) => {
          this.addHarvest.id = '',
          this.addHarvest._status = 0,
          this.addHarvest.date_create = '2022-10-11T07:40:25.49'
          this.addHarvest.date_update = '2022-10-11T07:40:25.49'
          this.addHarvest.factoryId = this.mcId
          this.addHarvest.checkM = 1
          this.addHarvest.harvestId = id
          this.addHarvest.amount = parseFloat(re1.toString())
          this.addHarvest.unit = 'Kg'
          this.testService.addInventoryFactory(this.addHarvest)
            .subscribe({
              next: (re) => {
                this.testService.updateStatusBnt(re.harvestId, mc, 'Đã hoàn tất')
                  .subscribe({
                    next: (re) => {
                      this.testService.updateStatusPtoP(mci)
                        .subscribe({
                          next: (e) => {
                            this.ngOnInit()
                            this.addNotice.sendId = this.user
                            this.addNotice.receiveId = e.transportId
                            this.addNotice.title = "Đã nhận hàng"
                            this.addNotice.content = "Đã vận chuyển từ nông trại tới nhà máy"
                            this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                            this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                            this.testService.addNoticeTransport(this.addNotice)
                              .subscribe({
                                next: (rew) => {
                                  this.addNotice2.sendId = this.user
                                  this.addNotice2.receiveId = p
                                  this.addNotice2.title = "Đã nhận trái"
                                  this.addNotice2.content = "Đã vận chuyển từ nông trại tới nhà máy"
                                  this.addNotice2.receiveDate = '2022-10-11T07:40:25.49'
                                  this.addNotice2.sendDate = '2022-10-11T07:40:25.49'
                                  this.testService.addNoticeFarm(this.addNotice2)
                                    .subscribe({
                                      next: (rew) => {
                                        this.addNotice3.sendId = this.user
                                        this.addNotice3.receiveId = mc
                                        this.addNotice3.title = "Đã nhận trái"
                                        this.addNotice3.content = "Đã vận chuyển từ nông trại tới nhà máy"
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
                        })
                      this.testService.updateWeightMF(mci, parseFloat(re1.toString()))
                        .subscribe({
                          next: (re) => { }
                        })
                    }
                  })
                this.testService.updateStatus(id, this.mcId, 'Đã xác nhận')
                  .subscribe({
                    next: (re => { this.ngOnInit() })
                  })
                this.testService.updateStatusMF(mci, 'Đã xác nhận')
                  .subscribe({
                    next: (re => { this.ngOnInit() })
                  })
                this._snackBar.open('Nhập thành công', 'OK', {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFactory.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFactory.paginator) {
      this.dataSourceFactory.paginator.firstPage()
    }
  }
}
