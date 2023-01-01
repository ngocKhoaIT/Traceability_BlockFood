import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MFView } from 'src/app/models/models-view/MFView.model';
import { UTOView } from 'src/app/models/models-view/UTOView.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-listviewinventorystore',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListViewInventoryStoreComponent implements OnInit {

  displayedColumnsM: string[] = ['billId', 'fruitName', 'farmName', 'addressFarm',
    'merchantName', 'addressMerchant', 'weight', 'unit'];

  dataSourceM = new MatTableDataSource<MFView>;

  displayedColumnsU: string[] = ['billId', 'placeName', 'addressPlace'
    , 'toPlaceName', 'addresstoPlace'
    , 'goodsName', 'amount', 'unit'];

  dataSourceU = new MatTableDataSource<UTOView>;


  @ViewChild(MatPaginator)
  paginatorM!: MatPaginator;
  @ViewChild(MatSort)
  sortM!: MatSort;

  @ViewChild(MatPaginator)
  paginatorU!: MatPaginator;
  @ViewChild(MatSort)
  sortU!: MatSort;

  constructor(private testService: APIservicesService,
    private route: ActivatedRoute, public loadService: LoaderService) {

  }

  storeId = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.storeId = re.workingFor

              }
            })
        }
      }
    })
  }

  applyFilterM(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceM.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceM.paginator) {
      this.dataSourceM.paginator.firstPage();
    }
  }

  applyFilterU(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceU.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceU.paginator) {
      this.dataSourceU.paginator.firstPage();
    }
  }

  c1 = false
  c2 = true

  look = ''

  timeInput = 'Today'
  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  choice = ''
  choices: string[] = ['Thương lái', 'Nông trại và nhà máy']
  filter(req: string){
    if (this.choice == 'Thương lái') {
      this.c1 = false
      this.c2 = true
      this.testService.getAllMerchantFarmbyFactorysbyFilter(this.storeId, 'Đã xác nhận',req)
        .subscribe({
          next: (f) => {
            this.dataSourceM = new MatTableDataSource(f);
            this.dataSourceM.paginator = this.paginatorM;
            this.dataSourceM.sort = this.sortM;
          },
          error: (response) => {
            console.log(response);
          }
        });
    }
    else {
      this.c1 = true
      this.c2 = false
      this.testService.getAllUpToTransportbyPlacesViewbyFilter(this.storeId, 'Đã xác nhận',req)
        .subscribe({
          next: (f) => {
            this.dataSourceU = new MatTableDataSource(f);
            this.dataSourceU.paginator = this.paginatorU;
            this.dataSourceU.sort = this.sortU;
          },
          error: (response) => {
            console.log(response);
          }
        });
    }
  }
}


