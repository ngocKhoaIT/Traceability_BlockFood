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
  selector: 'app-notice-receive',
  templateUrl: './notice-receive.component.html',
  styleUrls: ['./notice-receive.component.css']
})
export class NoticeReceiveComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'photoSend', 'sendName', 'roleSend',
    'photoReceive', 'receiveName', 'roleReceive',
    'sendDate', 'system'];

  dataSource = new MatTableDataSource<Notice>;

  photoPath = environment.photoUrl

  constructor(private testService: APIservicesService, private router: Router
    , public dialog: MatDialog, private route: ActivatedRoute,
    public loadService: LoaderService) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  view(id: string) {
    this.testService.updateStatusNT(id, 'Đã xem')
      .subscribe({
        next: (re) => {

        }
      })
    const dialogRef = this.dialog.open(NoticeViewComponent, {
      width: '400px',
      height: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload()
      console.log('The dialog was closed');
    });
  }

  timeInput = 'Today'

  levels: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  clbtn(id: string) {
    if (id == 'Đã gửi')
      return 'primary'
    else return 'warn'
  }

  user = ""

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.user = id
          this.testService.getAllReceiveId(id, "Today")
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

  filter(id: string) {
    this.testService.getAllReceiveId(this.user, id)
      .subscribe({
        next: (re) => {
          this.dataSource = new MatTableDataSource(re);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
