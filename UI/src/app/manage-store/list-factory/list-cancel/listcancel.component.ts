import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute} from '@angular/router';
import { Factory } from 'src/app/models/factory.model';
import { FactoryRequest } from 'src/app/models/factoryRequest.model';
import { FaQView } from 'src/app/models/models-view/FaQView.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-listcancelsf',
  templateUrl: './listcancel.component.html',
  styleUrls: ['./listcancel.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class ListCancelSFComponent implements OnInit {

  displayedColumns: string[] = ['productId', 'productName', 'factoryName', 'addressFactory',
                                'amount', 'unit'];

  dataSource = new MatTableDataSource<FaQView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  FR : FactoryRequest[] = []

  constructor(private testService: APIservicesService, 
    private route:ActivatedRoute,
    public dialog: MatDialog,
    public loadService: LoaderService) { 
    }

    units: string[] = ['Kg', 'Tấn', 'Tạ', 'Yến']
    place = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if(id){
          this.testService.getIdUser(id)
          .subscribe({
            next: (re) => {
              this.place = re.workingFor
              this.testService.getAllFactoryRequestbyPlaces(re.workingFor, 'Đã hủy',"Today_NM")
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
                this.testService.getAllFactorys()
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

  choices: Factory[] = []
  choice = ''

  filter(req: string, id: string) {
    this.testService.getAllFactoryRequestbyPlaces(this.place, 'Đã hủy', req + '_' + id)
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
