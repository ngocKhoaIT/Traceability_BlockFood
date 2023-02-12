import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
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
import { UTOView } from 'src/app/models/models-view/UTOView.model';
import { NoticeData } from 'src/app/models/noticeData.model';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-searchTransportOrder',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchTransportOrderComponent implements OnInit {

  displayedColumnsTransport: string[] = ['billId', 'placeName', 'addressPlace' 
                                          , 'toPlaceName', 'addresstoPlace' 
                                          , 'goodsName' ,'amount', 'unit','system'];

  dataSourceTransport = new MatTableDataSource<UTOView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  Ups: UTOView[] = [];

  constructor(private testService: APIservicesService, 
    public dialog: MatDialog, private route:ActivatedRoute,
    private _snackBar: MatSnackBar, public loadService: LoaderService) { 
      this.mcId = ''
    }

    billItem:  Array<{id: string}> = []
    Fruits: Fruit[] = []
    FruitHarvests: FruitHarvest[] = []

    user = ''

  ngOnInit(): void {
    this.testService.getAllUpToTransportbyTransports()
    .subscribe({
      next: (f)=>{
        this.Ups = f;
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
        if(id){
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
  
  mcId : string

  receive(id1: string, p: string, g: string, pl: string){
    this.testService.checkPtoPs(id1)
    .subscribe({
      next: (re) => {
        if(re === false)
        {
          this.addTMRequest.billId = ''
          this.addTMRequest._status = 0
          this.addTMRequest.date_create = '2022-10-11T07:40:25.49'
          this.addTMRequest.date_update = '2022-10-11T07:40:25.49'
          this.addTMRequest.transportId = this.mcId
          this.addTMRequest.status_request = 'Đang vận chuyển'
          this.addTMRequest.placeId = p
          
          this.testService.updateStatusUTO(id1, 'Đang vận chuyển')
          .subscribe({
            next: (re) => {
            }
          })

          if(g.startsWith("TH"))
          {
            this.testService.updateStatusBnt(g, p, 'Đang vận chuyển')
            .subscribe({
              next: (re) => {
              }
            })
          }
          else{
            this.testService.updateStatusBntFactory(g, p, 'Đang vận chuyển')
            .subscribe({
              next: (re) => {
              }
            })
          }
          this.testService.addTransportPtoP(this.addTMRequest)
          .subscribe({
            next: (re) => {
                this.addDetail.billId= re.billId
                this.addDetail.itemBillId = id1
                this.testService.addDetailTransportPtoP(this.addDetail)
                .subscribe({
                  next: (re) =>{
                    this.ngOnInit()
                    if(g.startsWith('TH')){
                      if(p.startsWith('CH')){
                        this.addNotice.sendId = this.user
                        this.addNotice.receiveId = p
                        this.addNotice.title = "Có đơn hàng"
                        this.addNotice.content = "Xe chuẩn bị lấy hàng và vận chuyển từ nông trại tới cửa hàng"
                        this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                        this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                        this.testService.addNoticeStore(this.addNotice)
                          .subscribe({
                            next: (rew) => {
                              this.addNotice2.sendId = this.user
                              this.addNotice2.receiveId = pl
                              this.addNotice2.title = "Chuẩn bị lấy hàng"
                              this.addNotice2.content = "Chuẩn bị xe tới vận chuyển từ nông trại tới cửa hàng"
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
                      else{
                        this.addNotice.sendId = this.user
                        this.addNotice.receiveId = p
                        this.addNotice.title = "Có đơn hàng"
                        this.addNotice.content = "Xe chuẩn bị lấy hàng và vận chuyển từ nông trại tới nhà máy"
                        this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                        this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                        this.testService.addNoticeStore(this.addNotice)
                          .subscribe({
                            next: (rew) => {
                              this.addNotice2.sendId = this.user
                              this.addNotice2.receiveId = pl
                              this.addNotice2.title = "Chuẩn bị lấy hàng"
                              this.addNotice2.content = "Chuẩn bị xe tới vận chuyển từ nông trại tới nhà máy"
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
                    }
                    else{
                      this.addNotice.sendId = this.user
                      this.addNotice.receiveId = p
                      this.addNotice.title = "Có đơn hàng"
                      this.addNotice.content = "Xe chuẩn bị lấy hàng và vận chuyển từ nhà máy tới cửa hàng"
                      this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                      this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                      this.testService.addNoticeStore(this.addNotice)
                        .subscribe({
                          next: (rew) => {
                            this.addNotice2.sendId = this.user
                            this.addNotice2.receiveId = pl
                            this.addNotice2.title = "Chuẩn bị lấy hàng"
                            this.addNotice2.content = "Chuẩn bị xe tới vận chuyển từ nhà máy tới cửa hàng"
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
        else {
          this._snackBar.open('Bạn chậm tay mất rồi!!! Có nhà vận chuyển khác đã nhanh tay hơn bạn', 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: ['snackbar']
          });
        }
      }
    })
    
  }

  addTMRequest : TransportPtoP = {
    billId : '',
    placeId : '',
    transportId : '',
    humidity : 80,
    temperature : 16,
    status_request: '',
    _status : 0,
    date_create : '',
    date_update : ''
  }

  addDetail : DetailTransportPtoP = {
    billId: '',
    itemBillId:'',
    status_request:'',
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
    this.dataSourceTransport.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTransport.paginator) {
      this.dataSourceTransport.paginator.firstPage()
    }
  }
}
