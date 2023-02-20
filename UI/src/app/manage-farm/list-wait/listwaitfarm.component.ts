import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FarmRequest } from 'src/app/models/farmRequest.model';
import { FQView } from 'src/app/models/models-view/FQView.model';
import { NoticeData } from 'src/app/models/noticeData.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-listwaitfarm',
  templateUrl: './listwaitfarm.component.html',
  styleUrls: ['./listwaitfarm.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ListWaitFarmComponent implements OnInit {

  displayedColumns: string[] = ['haverstId', 'fruitName', 'placeName', 'address',
    'amount', 'unit', 'system'];

  dataSource = new MatTableDataSource<FQView>;

  add: FarmRequest = {
    farmId: '',
    harvestId: '',
    placeId: '',
    status_btn: '',
    status_request: '',
    amount: 0,
    unit: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private testService: APIservicesService,
    private route: ActivatedRoute, public dialog: MatDialog,
    private _snackBar: MatSnackBar,public loadService: LoaderService) {
  }

  units: string[] = ['Kg', 'Tấn', 'Tạ', 'Yến']
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
                console.log(re.workingFor)
                this.testService.getAllFarmRequestbyFarms(re.workingFor, 'Chờ xác nhận','Today_Tl')
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

  submit(h: string, p: string, f: string) {
    this.testService.getIdFruitHarvest(h)
      .subscribe({
        next: (r2) => {
          const a = r2.weight_harvest
          this.testService.getIdFarmRequest(h, p, f)
            .subscribe({
              next: (re3) => {
                this.testService.exChangeFruit(re3.amount, re3.unit)
                  .subscribe({
                    next: (re4) => {
                      const amountFQ = parseFloat(re4.toString())
                      if (amountFQ > a) {
                        this._snackBar.open('Không đủ số lượng', 'OK', {
                          horizontalPosition: 'center',
                          verticalPosition: 'top',
                          duration: 3000,
                          panelClass: ['snackbar']
                        });
                      }
                      else {
                        const conlai = a - amountFQ
                        this.testService.sellFruit(r2.harvestId, conlai)
                          .subscribe({
                            next: (re) => {
                              if (p.startsWith('NM')) {
                                this.addNotice.sendId = this.user
                                this.addNotice.receiveId = p
                                this.addNotice.title = "Đã Xác nhận"
                                this.addNotice.content = "Đã xác nhận giao hàng cho nhà máy"
                                this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                                this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                                this.testService.addNoticeFactory(this.addNotice)
                                  .subscribe({
                                    next: (rew) => {

                                    }
                                  })
                              }
                              else if (p.startsWith('CH')) {
                                this.addNotice.sendId = this.user
                                this.addNotice.receiveId = p
                                this.addNotice.title = "Đã Xác nhận"
                                this.addNotice.content = "Đã xác nhận giao hàng cho cửa hàng"
                                this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                                this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                                this.testService.addNoticeStore(this.addNotice)
                                  .subscribe({
                                    next: (rew) => {

                                    }
                                  })
                              }
                              else {
                                this.addNotice.sendId = this.user
                                this.addNotice.receiveId = p
                                this.addNotice.title = "Đã Xác nhận"
                                this.addNotice.content = "Đã xác nhận giao hàng cho thương lái"
                                this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                                this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                                this.testService.addNoticeMerchant(this.addNotice)
                                  .subscribe({
                                    next: (rew) => {

                                    }
                                  })
                              }
                              this._snackBar.open('Xác nhận thành công', 'OK', {
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                                duration: 3000,
                                panelClass: ['snackbar']
                              });
                              this.testService.updateStatus(h, p, 'Đã xác nhận')
                                .subscribe({
                                  next: (re) => {
                                    this.ngOnInit()
                                  }
                                })
                            }
                          })
                      }
                    }
                  })
              }
            })
        }
      })
  }

  cancel(h: string, p: string) {
    this.testService.updateStatus(h, p, 'Đã hủy')
      .subscribe({
        next: (re) => {
          if (p.startsWith('NM')) {
            this.addNotice.sendId = this.user
            this.addNotice.receiveId = p
            this.addNotice.title = "Đã hủy"
            this.addNotice.content = "Đã hủy giao hàng cho nhà máy"
            this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
            this.addNotice.sendDate = '2022-10-11T07:40:25.49'
            this.testService.addNoticeFactory(this.addNotice)
              .subscribe({
                next: (rew) => {

                }
              })
          }
          else if (p.startsWith('CH')) {
            this.addNotice.sendId = this.user
            this.addNotice.receiveId = p
            this.addNotice.title = "Đã hủy"
            this.addNotice.content = "Đã hủy giao hàng cho cửa hàng"
            this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
            this.addNotice.sendDate = '2022-10-11T07:40:25.49'
            this.testService.addNoticeStore(this.addNotice)
              .subscribe({
                next: (rew) => {

                }
              })
          }
          else {
            this.addNotice.sendId = this.user
            this.addNotice.receiveId = p
            this.addNotice.title = "Đã hủy"
            this.addNotice.content = "Đã hủy giao hàng cho thương lái"
            this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
            this.addNotice.sendDate = '2022-10-11T07:40:25.49'
            this.testService.addNoticeMerchant(this.addNotice)
              .subscribe({
                next: (rew) => {

                }
              })
          }
          this.ngOnInit()
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
