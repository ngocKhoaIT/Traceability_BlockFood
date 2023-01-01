import { STRING_TYPE } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Notice } from 'src/app/models/models-view/notice.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';
import { NoticeViewComponent } from '../notice-view/notice-view.component';

@Component({
  selector: 'app-notice-send',
  templateUrl: './notice-send.component.html',
  styleUrls: ['./notice-send.component.css']
})
export class NoticeSendComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'photoSend', 'sendName', 'roleSend', 
  'photoReceive', 'receiveName', 'roleReceive',  
  'sendDate', 'system'];
  
  photoPath = environment.photoUrl

    dataSource = new MatTableDataSource<Notice>;

    constructor(private testService: APIservicesService, private router: Router
    ,public dialog: MatDialog, private route:ActivatedRoute,
    public loadService: LoaderService) { }

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;

    view(id: string){
      const dialogRef = this.dialog.open(NoticeViewComponent, {
        width: '400px',
        height: '400px',
        data: id,
      });
    
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit(),
        console.log('The dialog was closed');
      });
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe({
        next: (params) => {
          const id = params.get('id');
          if(id){
            this.testService.getAllSendId(id)
            .subscribe({
              next: (re) => {
              this.dataSource = new MatTableDataSource(re);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
            })
            }
          },
        })
      }

      timeInput = 'Today'

  levels: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
    }
}
