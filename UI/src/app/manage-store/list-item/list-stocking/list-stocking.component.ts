import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ILView } from 'src/app/models/models-view/ILView.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-list-stocking',
  templateUrl: './list-stocking.component.html',
  styleUrls: ['./list-stocking.component.scss']
})
export class ListStockingComponent implements OnInit {

  displayedColumns: string[] = ['id', 'goodsName', 'storeName', 'addressStore',
    'amount', 'unit'];

  dataSource = new MatTableDataSource<ILView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private testService: APIservicesService,
    private route: ActivatedRoute, private _snackBar: MatSnackBar,
    public loadService: LoaderService) {
  }

  units: string[] = ['Kg', 'Tấn', 'Tạ', 'Yến']
  timeInput = 'Today'
  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']
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
                this.testService.getAllListInventoryStore(re.workingFor, 'Đã nhận', "Today_TH")
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

  testSell = ""
  testAPI(id: string){
    this.testService.updateStatusInventory(id)
    .subscribe({
      next: (re) =>{
        this._snackBar.open('Đã test API bán hàng thành công', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        });
        this.ngOnInit()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
    })
  }

  choices: { id: string, name: string }[] = [{ id: "SP", name: "Sản phẩm" }, { id: "TH", name: "Trái cây" }]
  choice = ''

  filter(req: string, id: string) {
    this.testService.getAllListInventoryStore(this.place, 'Đã nhận', req + '_' + id)
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
