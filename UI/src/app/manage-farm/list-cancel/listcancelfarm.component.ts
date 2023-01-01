import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, } from '@angular/router';
import { FarmRequest } from 'src/app/models/farmRequest.model';
import { FQView } from 'src/app/models/models-view/FQView.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-listcancelfarm',
  templateUrl: './listcancelfarm.component.html',
  styleUrls: ['./listcancelfarm.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ListCancelFarmComponent implements OnInit {

  displayedColumns: string[] = ['fruitName', 'placeName', 'address',
    'farm', 'amount', 'unit'];

  dataSource = new MatTableDataSource<FQView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  FR: FarmRequest[] = []

  constructor(private testService: APIservicesService,
    private route: ActivatedRoute, public dialog: MatDialog,
    public loadService: LoaderService) {
  }

  units: string[] = ['Kg', 'Tấn', 'Tạ', 'Yến']
  farmId = ''
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.testService.getAllFarmRequestbyFarms(re.workingFor, 'Đã hủy', "Today_Tl")
                  .subscribe({
                    next: (f) => {
                      this.farmId = re.workingFor
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

  choices: { id: string, name: string }[] = [{ id: "Tl", name: "Thương lái" },
  { id: "NM", name: "Nhà máy sản xuất" },
  { id: "CH", name: "Cửa hàng" }]
  choice = 'Tl'

  filter(req: string, id: string) {
    this.testService.getAllFarmRequestbyFarms(this.farmId, 'Đã hủy', req +"_"+ id)
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
