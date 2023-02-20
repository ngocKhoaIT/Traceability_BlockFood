import { Component,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Farm } from 'src/app/models/farm.model';
import { Fruit } from 'src/app/models/fruit.model';
import { Seed } from 'src/app/models/seed.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.scss']
})
export class FruitComponent implements OnInit {

  displayedColumnsFruit: string[] = ['fruitId', 'fruitName', 'date_plant',
    'land', 'fertilizer', 'pesticides',
    'status_activity', 'technology',];

  units: string[] = ['Cây', 'Héc-ta']

  dataSourceFruit = new MatTableDataSource<Fruit>;

  addFruitRequest: Fruit = {
    fruitId: '',
    farmId: '',
    date_plant: '',
    fruitName: '',
    amount: 0,
    fertilizer: '',
    pesticides: '',
    unit: '',
    land: '',
    seedId: 0,
    status_activity: '',
    technology: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  // Cải tạo địa hình tương đối bằng phẳng, hơi cao ở giữa để thoát nước nhanh.
  // Tưới phân bón lá Lay-O, Combi-5 ,komix… và bón định kỳ thường xuyên 1-2 lần/tháng.
  // Sâu vẽ bùa: dùng thuốc Polytin 0.2%, slrespa 0.2%. Sâu đục thân cành: dùng thuốc O fatox 0.1%, Symi sidin 0.2%. Bệnh thán thư: Mancozeb 80WP, Daconil 75WP, Antracol 70WP,… Bệnh loét lá và bệnh sẹo: gây hại trên cành, lá, quả: dùng Boocdo. Bệnh chảy gôm: dùng Boocdo, Benlat , Alliette.

  @ViewChild(MatPaginator)
  paginatorFruit!: MatPaginator;
  @ViewChild(MatSort)
  sortFruit!: MatSort;

  fruits: Fruit[] = [];
  seeds: Seed[] = [];
  farms: Farm[] = [];
  seeds2: Seed[] = []

  constructor(private testService: APIservicesService,
    private route: ActivatedRoute,
    public loadService: LoaderService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({})
  }

  formGroup: FormGroup;
  farmId = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.farmId = re.workingFor
                this.addFruitRequest.farmId = re.workingFor
                this.testService.getFruitsFilter(re.workingFor, "Today_1")
                  .subscribe({
                    next: (f) => {
                      this.fruits = f;
                      this.dataSourceFruit = new MatTableDataSource(this.fruits);
                      this.dataSourceFruit.paginator = this.paginatorFruit;
                      this.dataSourceFruit.sort = this.sortFruit;
                    },
                    error: (response) => {
                      console.log(response);
                    }
                  });
                this.testService.getAllSeedbyFarms(re.workingFor)
                  .subscribe({
                    next: (f) => {
                      this.seeds2 = f;
                      this.seeds = f;
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

    this.testService.getAllFarms()
      .subscribe({
        next: (re) => {
          this.farms = re
        }
      })

    this.addFruitRequest.seedId = 1
    this.addFruitRequest.fruitName = 'Bưởi da xanh'
    this.addFruitRequest.unit = 'Cây'
    this.addFruitRequest.technology = 'Hệ thống tưới tiêu tự động'
    this.addFruitRequest.status_activity = 'Trồng mới'
    this.addFruitRequest.land = 'Cải tạo địa hình tương đối bằng phẳng, hơi cao ở giữa để thoát nước nhanh.'
    this.addFruitRequest.fertilizer = 'Tưới phân bón lá Lay-O, Combi-5 ,komix… và bón định kỳ thường xuyên 1-2 lần/tháng.'
    this.addFruitRequest.pesticides = 'Sâu vẽ bùa: dùng thuốc Polytin 0.2%, slrespa 0.2%. Sâu đục thân cành: dùng thuốc O fatox 0.1%, Symi sidin 0.2%. Bệnh thán thư: Mancozeb 80WP, Daconil 75WP, Antracol 70WP,… Bệnh loét lá và bệnh sẹo: gây hại trên cành, lá, quả: dùng Boocdo. Bệnh chảy gôm: dùng Boocdo, Benlat , Alliette.'
  }

  add(event: Event) {
    if(this.addFruitRequest.seedId === 0 || this.addFruitRequest.amount <= 0 || typeof(this.addFruitRequest.amount) !== 'number' 
    || this.addFruitRequest.date_plant === "" || this.addFruitRequest.land === "" || this.addFruitRequest.pesticides === "" 
    || this.addFruitRequest.fertilizer === "" || this.addFruitRequest.technology === "")
    {
      this._snackBar.open('Dữ liệu chưa nhập đủ hoặc nhập sai !!', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: ['snackbar']
      });
    }
    else
    {
      this.addFruitRequest._status = 0;
      this.addFruitRequest.fruitId = '';
      this.addFruitRequest.date_create = '2022-10-11T07:40:25.49';
      this.addFruitRequest.date_update = '2022-10-11T07:40:25.49';
      this.testService.addFruit(this.addFruitRequest)
        .subscribe({
          next: (f) => {
            this.ngOnInit();
            this.addFruitRequest.fruitName = ''
            this.addFruitRequest.seedId = 0,
            this.addFruitRequest.amount = 0
            this.addFruitRequest.date_plant = ""
  
              this._snackBar.open('Trồng thành công', 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 1500,
                panelClass: ['snackbar']
              });
          }
        }) 
    }
  }

  changeFruitName(name: number) {
    this.testService.getIdSeed(name)
      .subscribe({
        next: (re) => {
          this.addFruitRequest.fruitName = re.seedName
        }
      })
  }
  cancel() {
    this.addFruitRequest.fruitName = ''
    this.addFruitRequest.seedId = 0
    this.addFruitRequest.amount = 0
    this.addFruitRequest.date_plant = ""
  }

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  schoice = 0

  filter(req: string, id: number) {
    this.testService.getFruitsFilter(this.farmId, req +"_"+ id)
      .subscribe({
        next: (f) => {
          this.fruits = f;
          this.dataSourceFruit = new MatTableDataSource(this.fruits);
          this.dataSourceFruit.paginator = this.paginatorFruit;
          this.dataSourceFruit.sort = this.sortFruit;
        },
        error: (response) => {
          console.log(response);
        }
      });
  }

  applyFilterFruit(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFruit.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFruit.paginator) {
      this.dataSourceFruit.paginator.firstPage();
    }
  }
}