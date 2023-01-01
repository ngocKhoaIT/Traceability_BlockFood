import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DetailOrder } from 'src/app/models/detailOrder.model';
import { ILView } from 'src/app/models/models-view/ILView.model';
import { OrderBill } from 'src/app/models/orderBill.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  myDate = new Date();
  constructor(private testService: APIservicesService,
    private route: ActivatedRoute, private datePipe: DatePipe,
    public loadService: LoaderService) {
    this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
  }

  user : string = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.user = id
                this.orderBill.employeeId = id
                this.testService.getAllInventoryReceivedbyStores(re.workingFor)
                  .subscribe({
                    next: (re1) => {
                      this.dataSourceIS = new MatTableDataSource(re1);
                      this.dataSourceIS.paginator = this.paginator;
                      this.dataSourceIS.sort = this.sort;
                    }
                  })
              }
            })
        }
      }
    })
  }

  displayedColumnsIS: string[] = ['goodsName', 'amount', 'unit'];

  dataSourceIS = new MatTableDataSource<ILView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceIS.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceIS.paginator) {
      this.dataSourceIS.paginator.firstPage()
    }
  }

  //Tab group
  tab1 = false
  checktab1() {
    this.tab1 = false
    this.tab2 = true
  }

  tab2 = true
  checktab2() {
    this.tab2 = false
    this.tab1 = true
  }

  currentDate = new Date();

  cValue = formatDate(this.myDate, 'dd/MM/yyyy hh:mm:ss', 'en-US');
  //Hóa đơn
  orderBill: OrderBill = {
    billId: '',
    customerId: 'guest',
    date_create: this.cValue,
    employeeId: this.user,
    totalBill: 0,
  }

  detailOrder: DetailOrder = {
    billId: '',
    goodsId: '',
    price: 0,
    intoMoney: 0,
    discount: 0,
    amount: 0,
  }

  details: Array<{a: string, b: number, c:number, d:number, e:number}> = []

  photoPath: string = environment.photoUrl
  qr: string = this.photoPath + 'qr-code.png'
  checkCamera = true
  webcamChange() {
    this.checkCamera = !this.checkCamera
    
  }

  data = ''

  json : any
  changeJson(e: any):void{
    this.json = JSON.parse(e)
    const data =  this.json.data.split(environment.webUrl)[1]
    if(data !== ""){
      this.testService.getIdInventory(data)
      .subscribe({
        next: (re) => {
          this.details.push({a: data,b: 10000, c: re.amount, d: 0, e: (10000*re.amount) - (10000*re.amount*0)})
          this.orderBill.totalBill = this.orderBill.totalBill + (10000*re.amount) - (10000*re.amount*0)
        }
      })
      
    }
    else{
      
    }
  }


  addDetail(id: string){
    this.testService.getIdInventory(id)
    .subscribe({
      next: (re) => {
        this.details.push({a: id,b: 10000, c: re.amount, d: 0, e: (10000*re.amount) - (10000*re.amount*0)})
        this.orderBill.totalBill = this.orderBill.totalBill + (10000*re.amount) - (10000*re.amount*0)
      }
    })
  }

  submitBill(){
    this.orderBill.date_create = '2022-10-11T07:40:25.49'
    this.testService.addOrderBill(this.orderBill)
    .subscribe({
      next: (re) => {
        this.details.forEach(item => {
          this.detailOrder.billId = re.billId
          this.detailOrder.goodsId = item.a,
          this.detailOrder.price = item.b,
          this.detailOrder.amount = item.c
          this.detailOrder.discount = item.d
          this.detailOrder.intoMoney = item.e
          this.testService.updateStatusInventory(item.a)
          .subscribe({
            next: (re1) => {

            }
          })
          this.testService.addDetailOrder(this.detailOrder)
          .subscribe({
            next: (re2) => {
              this.ngOnInit()
            }
          })
        })
      }
    })
  }
}
