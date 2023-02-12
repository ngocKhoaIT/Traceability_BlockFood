import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Fruit } from 'src/app/models/fruit.model';
import { FruitHarvest } from 'src/app/models/fruitHarvest.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { DatePipe } from '@angular/common';
import { FHView } from 'src/app/models/models-view/FHView.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NoticeData } from 'src/app/models/noticeData.model';
import { LoaderService } from 'src/app/services/loader.service';
import { Seed } from 'src/app/models/seed.model';


@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.scss']
})
export class HarvestComponent implements OnInit {

  displayedColumns: string[] = ['harvestId', 'fruitId', 'fruitName', 'weight_harvest_first', 'weight_harvest', 'unit', 'date_harvest', 'date_plant'];

  dataSource = new MatTableDataSource<FHView>;

  addHarvestRequest: FruitHarvest = {
    fruitId: '',
    date_harvest: '',
    harvestId: '',
    unit: '',
    weight_harvest: 0,
    status_request: '',
    weight_harvest_first: 0,
    imageFH: '',
    _status: 0,
    date_create: '',
    date_update: ''
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  Harvests: FHView[] = [];

  constructor(private testService: APIservicesService,
    private route: ActivatedRoute,
    public dialog: MatDialog, private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar, private datePipe: DatePipe,
    public loadService: LoaderService) {
    this.formGroup = this._formBuilder.group({})
  }
  formGroup: FormGroup;

  units: string[] = ['Kg', 'Tấn', 'Tạ', 'Yến']
  Fruits: Fruit[] = []
  farm = ''
  user = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.farm = re.workingFor
                this.user = re.userName
                this.testService.getFruitHarvestsFilter(re.workingFor, "Today_B_0_0")
                  .subscribe({
                    next: (f) => {
                      this.Harvests = f;
                      this.dataSource = new MatTableDataSource(this.Harvests);
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.sort = this.sort;
                    },
                    error: (response) => {
                      console.log(response);
                    }
                  });
                this.testService.getAllFruits(re.workingFor)
                  .subscribe({
                    next: (re2) => {
                      this.Fruits = re2
                    }
                  })
                this.testService.getAllSeedbyFarms(re.workingFor)
                  .subscribe({
                    next: (re2) => {
                      this.seeds = re2
                    }
                  })
              }
            })
        }
      }
    })

    this.formGroup = this._formBuilder.group({
      Ctrl1: ['', Validators.required,],
      Ctrl2: [{ value: '', disabled: true }, Validators.required],
      Ctrl3: ['', Validators.required],
      Ctrl4: ['', Validators.required],
    })
  }

  w = 0
  u = ''

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File;

  photoPath: string = environment.photoUrl
  photoPathName: string = ''

  onChange(event: any) {
    this.file = event.target.files[0];
    this.addHarvestRequest.imageFH = this.file.name
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    this.testService.upload(this.file).subscribe({
      next: (e) => {
        this.photoPathName = this.photoPath + this.file.name
        if (typeof (e) === 'object') {
          this.shortLink = e.link;
          this.loading = false;
        }
        this._snackBar.open('Tải ảnh thành công', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        });
      },
      error: (ex) => {
        console.log(ex);
        this._snackBar.open('Tải ảnh thất bại', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
          panelClass: ['snackbar']
        });
      }
    })
  }

  addNotice: NoticeData = {
    content: '',
    id: '',
    receiveDate: '',
    receiveId: '',
    sendDate: '',
    sendId: '',
    status_request: '',
    title: '',
  }

  add(w: number, u: string) {
    if (this.addHarvestRequest.date_harvest !== "" && u !== ""
      && w > 0) {
      let date = new Date(this.addHarvestRequest.date_harvest)
      const d = this.datePipe.transform(date, 'yyyy-MM-dd')

      if (d !== null)
        this.testService.getIfHarverst(this.addHarvestRequest.fruitId, d)
          .subscribe({
            next: (value) => {
              console.log(value)
              if (value === "Đủ thời gian") {
                this.testService.exChangeFruit(w, u)
                  .subscribe({
                    next: (re) => {
                      const a = parseFloat(re.toString())
                      this.addHarvestRequest._status = 0;
                      this.addHarvestRequest.harvestId = ''
                      this.addHarvestRequest.weight_harvest = a
                      this.addHarvestRequest.weight_harvest_first = a
                      this.addHarvestRequest.unit = 'Kg'
                      this.addHarvestRequest.status_request = ''
                      this.addHarvestRequest.date_create = '2022-10-11T07:40:25.49';
                      this.addHarvestRequest.date_update = '2022-10-11T07:40:25.49';
                      this.testService.addFruitHarvest(this.addHarvestRequest)
                        .subscribe({
                          next: (f) => {
                            this.addHarvestRequest.harvestId = ''
                            this.addHarvestRequest.unit = ''
                            this.addHarvestRequest.fruitId = ''
                            this.addHarvestRequest.weight_harvest = 0
                            this.w = 0
                            this.u = ""

                            this.addNotice.sendId = this.user
                            this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                            this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                            this.testService.addNoticeHarvest(this.addNotice)
                              .subscribe({
                                next: (rew) => {
                                  if(rew !== null){
                                    console.log("a")
                                    this.ngOnInit();
                                  }
                                }
                              })

                            this._snackBar.open('Thêm thành công', 'OK', {
                              horizontalPosition: 'center',
                              verticalPosition: 'top',
                              duration: 1500,
                              panelClass: ['snackbar']
                            });
                          }
                        })
                    }
                  })
              }
              else {
                this.addHarvestRequest.date_harvest = ''
                this._snackBar.open('Không đủ 190 ngày để thu hoạch', 'OK', {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  duration: 1500,
                  panelClass: ['snackbar']
                });
              }
            },
            error: (e) => {
              console.log(e)
            }
          })
    }
    else {
      this._snackBar.open('Dữ liệu chưa nhập đủ hoặc nhập sai !!', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: ['snackbar']
      });
    }

  }

  cancel() {
    this.addHarvestRequest.harvestId = '',
      this.addHarvestRequest.unit = '',
      this.addHarvestRequest.fruitId = '',
      this.addHarvestRequest.weight_harvest = 0;
    this.w = 0
    this.u = ""
  }

  seeds: Seed[] = []

  w_from = 0
  w_to = 0

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  schoice = 0

  filter(req: string, id: number) {
    this.testService.getFruitHarvestsFilter(this.farm, req + "_" + id + "_" + this.w_to.toString() + "_" + this.w_from.toString())
      .subscribe({
        next: (f) => {
          this.Harvests = f;
          this.dataSource = new MatTableDataSource(this.Harvests);
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
