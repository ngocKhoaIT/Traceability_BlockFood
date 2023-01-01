import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FactoryRequest } from 'src/app/models/factoryRequest.model';
import { FaQView } from 'src/app/models/models-view/FaQView.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-listwaitsf',
  templateUrl: './listwait.component.html',
  styleUrls: ['./listwait.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class ListWaitSFComponent implements OnInit {

  displayedColumns: string[] = ['productId', 'productName', 'factoryName', 'addressFactory',
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

  constructor(private testService: APIservicesService, 
    private route:ActivatedRoute,
    public dialog: MatDialog,public loadService: LoaderService) { 
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if(id){
          this.testService.getIdUser(id)
          .subscribe({
            next: (re) => {
              console.log(re.workingFor)
              this.testService.getAllFactoryRequestbyPlaces(re.workingFor,'Chờ xác nhận',"Today_NM")
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
            }
          })
        }
      }
    })
  }

  submit(h: string, p: string){
    this.testService.updateFSStatus(h,p,'Đã xác nhận')
    .subscribe({
      next: (re) =>{
        this.ngOnInit()
      }
    })
  }

  cancel(h: string, p: string){
    this.testService.updateFSStatus(h,p,'Đã hủy')
    .subscribe({
      next: (re) =>{
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
