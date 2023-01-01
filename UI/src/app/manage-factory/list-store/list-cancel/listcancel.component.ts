import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute} from '@angular/router';
import { FactoryRequest } from 'src/app/models/factoryRequest.model';
import { FaQView } from 'src/app/models/models-view/FaQView.model';
import { Store } from 'src/app/models/store.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-listcancelfs',
  templateUrl: './listcancel.component.html',
  styleUrls: ['./listcancel.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class ListCancelFSComponent implements OnInit {

  displayedColumns: string[] = ['productId', 'productName', 'placeName', 'addressPlace',
                                'amount', 'unit'];

  dataSource = new MatTableDataSource<FaQView>;

  add: FactoryRequest = {
      factoryId: '',
      productId: '',
      placeId: '',
      status_request: '', 
      amount: 0,
      status_btn: '',
      unit: '',
      _status: 0,
      date_create: '',
      date_update: '',
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  FR : FactoryRequest[] = []

  constructor(private testService: APIservicesService, 
    private route:ActivatedRoute,
    public dialog: MatDialog,public loadService: LoaderService) { 
    }

    units: string[] = ['Kg', 'Tấn', 'Tạ', 'Yến']
    factoryId = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if(id){
          this.testService.getIdUser(id)
          .subscribe({
            next: (re) => {
              this.factoryId = re.workingFor
              this.testService.getAllFactoryRequestbyFactorys(re.workingFor, 'Đã hủy',"Today_CH")
                .subscribe({
                  next: (f)=>{
                    this.dataSource = new MatTableDataSource(f);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                  },
                  error: (response) => {
                    console.log(response);
                  }
                });
                this.testService.getAllStores()
                .subscribe({
                  next: (re2) => {
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

  choices: Store[] = []
  choice = 'Tl'

  filter(req: string, id: string) {
    this.testService.getAllFactoryRequestbyFactorys(this.factoryId, 'Đã hủy', req +"_"+ id)
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
