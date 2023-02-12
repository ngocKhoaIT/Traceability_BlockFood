import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarmPersonView } from 'src/app/models/models-view/farmPersonView.model';
import { Seed } from 'src/app/models/seed.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-list-farm-by-fruit',
  templateUrl: './list-farm-by-fruit.component.html',
  styleUrls: ['./list-farm-by-fruit.component.scss']
})
export class ListFarmByFruitComponent implements OnInit{
  displayedColumns: string[] = ['farmId', 'farmName', 'addressFarm',
  'note', 'farmerName', 'phoneNumber', 'email'];

dataSource = new MatTableDataSource<FarmPersonView>;

@ViewChild(MatPaginator)
paginator!: MatPaginator;
@ViewChild(MatSort)
sort!: MatSort;

constructor(private testService: APIservicesService,
  public dialog: MatDialog,
  private _snackBar: MatSnackBar,
  public loadService: LoaderService) {

}

ngOnInit(): void {
  this.testService.getFarmsbyFruit("Bưởi da xanh")
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
  this.testService.getSeedsExist().
  subscribe({
    next: (s) => {
      this.times = s
    }
  })
}

timeInput = 'Today'

times: Seed[] = []

filter(req: string) {
  this.testService.getFarmsbyFruit(req)
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
