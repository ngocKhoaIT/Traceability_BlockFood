import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FactoryRequest } from 'src/app/models/factoryRequest.model';
import { FaQView } from 'src/app/models/models-view/FaQView.model';
import { NoticeData } from 'src/app/models/noticeData.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-listwaitfs',
  templateUrl: './listwait.component.html',
  styleUrls: ['./listwait.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ListWaitFSComponent implements OnInit {

  displayedColumns: string[] = ['productId', 'productName', 'placeName', 'addressPlace',
    'amount', 'unit', 'system'];

  dataSource = new MatTableDataSource<FaQView>;

  add: FactoryRequest = {
    factoryId: '',
    productId: '',
    placeId: '',
    status_request: '',
    status_btn: '',
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
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar, 
    public loadService: LoaderService) {
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
                console.log(re.workingFor)
                this.testService.getAllFactoryRequestbyFactorys(re.workingFor, 'Chờ xác nhận',"Last 7 Day_")
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

  submit(h: string, p: string, a: number) {
    this.testService.getIdProduct(h)
      .subscribe({
        next: (re1) => {
          if (a > re1.amountProduct) {
            this._snackBar.open('Không đủ số lượng', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 1500,
              panelClass: ['snackbar']
            });
          }
          else {
            this.testService.updateFSStatus(h, p, 'Đã xác nhận')
              .subscribe({
                next: (re) => {
                  const conlai = re1.amountProduct - a
                  this.testService.sellProduct(h, conlai)
                    .subscribe({
                      next: (re2) => {
                        this.addNotice.sendId = this.user
                        this.addNotice.receiveId = p
                        this.addNotice.title = "Đã Xác nhận"
                        this.addNotice.content = "Đã xác nhận giao hàng cho nhà máy"
                        this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                        this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                        this.testService.addNoticeStore(this.addNotice)
                          .subscribe({
                            next: (rew) => {

                            }
                          })
                        this._snackBar.open('Đã xác nhận', 'OK', {
                          horizontalPosition: 'center',
                          verticalPosition: 'top',
                          duration: 1500,
                          panelClass: ['snackbar']
                        });
                      }
                    })
                  this.ngOnInit()
                }
              })
          }
        }
      })
  }

  cancel(h: string, p: string) {
    this.testService.updateFSStatus(h, p, 'Đã hủy')
      .subscribe({
        next: (re) => {
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
