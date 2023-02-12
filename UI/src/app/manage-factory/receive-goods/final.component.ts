import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { Inventory } from 'src/app/models/inventory.model';
import { UTOView } from 'src/app/models/models-view/UTOView.model';
import { InventoryFactory } from 'src/app/models/inventoryFactory.model';
import { NoticeData } from 'src/app/models/noticeData.model';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-inventoryfactorybystore',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class InventoryFactorybyStoreComponent implements OnInit {

  displayedColumnsStore: string[] = ['billId', 'placeName', 'addressPlace'
    , 'toPlaceName', 'addresstoPlace'
    , 'goodsName', 'amount', 'unit', 'system'];

  dataSourceStore = new MatTableDataSource<UTOView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  UpTos: UTOView[] = [];

  constructor(private testService: APIservicesService,
    public dialog: MatDialog, private route: ActivatedRoute,
    private _snackBar: MatSnackBar, public loadService: LoaderService) {

  }

  mcId = ''
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

  addInventory: InventoryFactory = {
    id: '',
    factoryId: '',
    harvestId: '',
    amount: 0,
    unit: '',
    _status: 0,
    date_create: '',
    date_update: '',
    checkM: 0,
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

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

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

  receive(id: string, a: number, u: string, mci: string, p: string) {
    this.testService.updateStatusBnt(id, this.mcId, 'Đã hoàn tất')
      .subscribe({
        next: (re3) => { }
      })
    this.testService.exChangeFruit(a, u)
      .subscribe({
        next: (re1) => {
          this.addInventory.id = '',
            this.addInventory._status = 0,
            this.addInventory.date_create = '2022-10-11T07:40:25.49'
          this.addInventory.date_update = '2022-10-11T07:40:25.49'
          this.addInventory.checkM = 0
          this.addInventory.factoryId = this.mcId
          this.addInventory.harvestId = id
          this.addInventory.amount = parseFloat(re1.toString())
          this.addInventory.unit = 'Kg'
          this.testService.addInventoryFactory(this.addInventory)
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

                                }
                              })
                          }
                        })
                      this.testService.updateAmountUTO(mci, parseFloat(re1.toString()))
                        .subscribe({
                          next: (E) => { }
                        })
                    }
                  })
                this.testService.updateStatus(id, this.mcId, 'Đã xác nhận')
                  .subscribe({
                    next: (re => { this.ngOnInit() })
                  })
                this.testService.updateStatusUTO(mci, 'Đã xác nhận')
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
    this.dataSourceStore.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceStore.paginator) {
      this.dataSourceStore.paginator.firstPage()
    }
  }
}
