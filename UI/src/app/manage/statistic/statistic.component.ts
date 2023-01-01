import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js/auto';
import { Card } from 'src/app/models/card.model';
import { Farm } from 'src/app/models/farm.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  photoPath: string = environment.photoUrl 

  levels: string[] = ['Tất cả']
  
  constructor(private apiService: APIservicesService,
    private elementRef: ElementRef, 
    public loadService: LoaderService) { 
    
  }

  cards: Card[] = []
  cards2: Card[] = []
  farm: number = 0
  merchant: number = 0
  factory: number= 0
  transport: number= 0
  store: number= 0
  admin: number= 0
  ufarm: number= 0
  umerchart: number= 0
  ufactory: number= 0
  utransport: number= 0
  ustore: number= 0

  ngOnInit(): void {

    
    this.photoPath = environment.photoUrl

  this.apiService.getAllFactorys().subscribe({
    next: (re) => {
      this.factory = re.length
      this.apiService.getAllMerchants().subscribe({
        next: (re) => {
          this.merchant = re.length
          this.apiService.getAllTransports().subscribe({
            next: (re) => {
              this.transport = re.length
              this.apiService.getAllStores().subscribe({
                next: (re) => {
                  this.store = re.length
                  this.apiService.getAllFarms().subscribe({
                    next: (re) => {
                      this.farm = re.length
                      this.createChart1()
                      this.cards = [{
                        amount: this.farm, 
                        type: 'Nông trại',
                        imageUrl: this.photoPath + 'smart-farm.png',
                        system: 'Đang hoạt động',
                        color: '#F14E4F'
                      },
                      {
                        amount: this.merchant, 
                        type: 'Thương lái',
                        imageUrl: this.photoPath + 'trad.png',
                        system: 'Đang hoạt động',
                        color: '#EE82EE'
                      },
                      {
                        amount: this.store, 
                        type: 'Cửa hàng',
                        imageUrl: this.photoPath + 'shops.png',
                        system: 'Đang hoạt động',
                        color: '#3374AE'
                      },
                    ]
                    this.cards2 = [
                      {
                        amount: this.factory, 
                        type: 'Nhà máy sản xuất',
                        imageUrl: this.photoPath + 'factory.png',
                        system: 'Đang hoạt động',
                        color: '#FFBB6A'
                      },
                      {
                        amount: this.transport, 
                        type: 'Đơn vị vận chuyển',
                        imageUrl: this.photoPath + 'transportation.png',
                        system: 'Đang hoạt động',
                        color: '#42B33F'
                      },
                    ]
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })

  this.apiService.getAllUserbyRoles('Nông trại')
  .subscribe({
    next: (re) => {
      this.ufarm = re.length
      this.apiService.getAllUserbyRoles('Nhà máy sản xuất')
      .subscribe({
        next: (re) => {
          this.ufactory = re.length
          this.apiService.getAllUserbyRoles('Thương lái')
          .subscribe({
            next: (re) => {
              this.umerchart = re.length
              this.apiService.getAllUserbyRoles('Đơn vị vận chuyển')
              .subscribe({
                next: (re) => {
                  this.utransport = re.length
                  this.apiService.getAllUserbyRoles('Cửa hàng')
                  .subscribe({
                    next: (re) => {
                      this.ustore = re.length
                      this.apiService.getAllUserbyRoles('Administrator')
                      .subscribe({
                        next: (re) => {
                          this.admin = re.length
                          this.createChart2()
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })

  }

  public chart: any

  createChart1(){
    let htmlRef = this.elementRef.nativeElement.querySelector("#Chart1");
    this.chart = new Chart(htmlRef, {
      type: 'doughnut',

      data: {
        labels: [
          'Nông trại',
          'Thương lái',
          'Nhà máy sản xuất',
          'Đơn vị vận chuyển',
          'Cửa hàng'
        ],
        datasets: [{
          label: 'Số lượng tổ chức tham gia chuỗi cung ứng',
          data: [this.farm, this.merchant, this.factory, this.transport, this.store],
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
          ],
          hoverOffset: 4
        }]
      }
    })
  }

  public chart2: any

  createChart2(){
    let htmlRef = this.elementRef.nativeElement.querySelector("#Chart2");
    const labels = ['Nông dân','Thương lái','Quản lý nhà máy','Người vận chuyển','Nhân viên bán hàng','Administrator']
    this.chart2 = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Số lượng người tham gia',
          data: [this.ufarm, this.umerchart, this.ufactory,this.utransport,this.ustore,this.admin],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    })
  }

  displayedColumns: string[] = ['check', 'like', 'title', 
                                'status_level', 'create_date', 'create_by', 
                                'process'];
                                
  dataSource = new MatTableDataSource<Farm>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  

}
