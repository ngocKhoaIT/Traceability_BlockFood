import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ILView } from 'src/app/models/models-view/ILView.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-list-sold',
  templateUrl: './list-sold.component.html',
  styleUrls: ['./list-sold.component.scss']
})
export class ListSoldComponent implements OnInit {

  displayedColumns: string[] = ['id', 'goodsName', 'storeName', 'addressStore',
    'amount', 'unit', 'imageQR'];

  dataSource = new MatTableDataSource<ILView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private testService: APIservicesService,
    private route: ActivatedRoute,
    public loadService: LoaderService) {
  }

  units: string[] = ['Kg', 'Tấn', 'Tạ', 'Yến']
  place = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.place = re.workingFor
                this.testService.getAllListInventoryStore(re.workingFor, 'Đã bán',"Today_SP")
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
            })
        }
      }
    })
  }

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  choices: { id: string, name: string }[] = [{ id: "SP", name: "Sản phẩm" }, { id: "TH", name: "Trái cây" }]
  choice = ''

  filter(req: string, id: string) {
    this.testService.getAllListInventoryStore(this.place, 'Đã bán', req + '_' + id)
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
