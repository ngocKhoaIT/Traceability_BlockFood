import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer'
import { Block } from 'src/app/models/block.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent implements OnInit {
  displayedColumns: string[] = ['hash', 'data', 'timestamp', 'previousHash'];

  dataSource = new MatTableDataSource<Block>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  filter(req: string) {
    this.testService.getAllBlockchainFilter(req)
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

  constructor(private testService: APIservicesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public loadService: LoaderService) {

  }

  ngOnInit(): void {
    this.testService.getAllBlockchainFilter("Today")
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

  projectId = "2LUrdSt6bd0G8WnS3OzPvmipXVa"
  projectSecret = "78be58fa14430afe996f6bdc4319e6e8"

  addBlock() {
    const auth = 'Basic ' + Buffer.from(this.projectId + ':' + this.projectSecret).toString('base64')
    try {
      const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
          authorization: auth,
        }
      })

      client.add('hello world 123').then(t=>console.log(t.path))

      this._snackBar.open('Thành công', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: ['snackbar']
      });
    }
    catch{
      this._snackBar.open('Thành công', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: ['snackbar']
      });
    }
  }
}
