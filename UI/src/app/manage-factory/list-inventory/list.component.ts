import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Farm } from 'src/app/models/farm.model';
import { IVEFactoryView } from 'src/app/models/models-view/IVEFactoryView.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-listviewinventoryfactory',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListViewInventoryFactoryComponent implements OnInit {

  displayedColumnsTypeProduct: string[] = ['id', 'fruitName', 'farmName', 'addressFarm',
                                            'amount', 'unit']

  dataSourceTypeProduct = new MatTableDataSource<IVEFactoryView>;

  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private testService: APIservicesService, 
    private route:ActivatedRoute, public loadService: LoaderService) { 

    }

    factoryId =''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if(id){
          this.testService.getIdUser(id)
          .subscribe({
            next: (re) => {
              this.factoryId = re.workingFor
              this.testService.getAllInventoryFactorybyFactorys(re.workingFor,"Today_0")
                .subscribe({
                  next: (f)=>{
                    this.dataSourceTypeProduct = new MatTableDataSource(f);
                    this.dataSourceTypeProduct.paginator = this.paginator;
                    this.dataSourceTypeProduct.sort = this.sort;
                  },
                  error: (response) => {
                    console.log(response);
                  }
                });

                this.testService.getAllFarms()
                .subscribe({
                  next: (re2) =>{
                    this.choices = re2
                  }
                })
            }
          })
        }
      }
    })
  }

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  choice = ''

  choices : Farm[] = []

  filter(req : string, id: string){

  }

  applyFilterTypeProduct(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTypeProduct.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTypeProduct.paginator) {
      this.dataSourceTypeProduct.paginator.firstPage();
    }
  }
}


