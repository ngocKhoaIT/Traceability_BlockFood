import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute} from '@angular/router';
import { TPtoPView } from 'src/app/models/models-view/TPtoPView.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-listviewtransport',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class ListViewTransportComponent implements OnInit {

  displayedColumns: string[] = ['billId', 'placeName', 'addressPlace', 
                                'humidity', 'temperature', 'status_request'];

  dataSource = new MatTableDataSource<TPtoPView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private testService: APIservicesService, 
    private route:ActivatedRoute, public dialog: MatDialog,
    public loadService: LoaderService) { 
    }

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
              this.testService.getAllTransportPtoPbyTransports(re.workingFor,"Last 7 Day_Tl")
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

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  choices: { id: string, name: string }[] = [{ id: "TL", name: "Thương lái" },
  { id: "NM", name: "Nhà máy sản xuất" },
  { id: "CH", name: "Cửa hàng" }]
  choice = ''

  filter(req: string, id: string) {
    this.testService.getAllTransportPtoPbyTransports(this.place, req +"_"+ id)
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
