import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IVEFactoryView } from 'src/app/models/models-view/IVEFactoryView.model';
import { NoticeData } from 'src/app/models/noticeData.model';
import { Product } from 'src/app/models/product.model';
import { TypeProduct } from 'src/app/models/typeProduct.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumnsProduct: string[] = ['productId', 'productName', 'amountProduct', 'unit',
    'mfg_date', 'exp_date', 'net_weight', 'amountProduct_first',
    'temperature', 'humidity', 'procedureOfProduct', 'elementOfProduct'
  ];

  displayedColumnsTypeProduct: string[] = ['typeProductId', 'typeName', 'system']

  dataSourceProduct = new MatTableDataSource<Product>;
  dataSourceTypeProduct = new MatTableDataSource<TypeProduct>;

  addProductRequest: Product = {
    productId: '',
    productName: '',
    factoryId: '',
    amountProduct: 0,
    elementOfProduct: '',
    exp_date: '',
    humidity: 0,
    mfg_date: '',
    net_weight: 0,
    procedureOfProduct: '',
    amountProduct_first: 0,
    temperature: 0,
    imageProduct: '',
    unit: '',
    _status: 0,
    date_create: '',
    date_update: '',
    harvestId: '',
    typeProductId: 0
  }

  @ViewChild(MatPaginator)
  paginatorProduct!: MatPaginator;
  @ViewChild(MatSort)
  sortProduct!: MatSort;

  @ViewChild(MatPaginator)
  paginatorTypeProduct!: MatPaginator;
  @ViewChild(MatSort)
  sortTypeProduct!: MatSort;

  Products: Product[] = [];
  TypeProducts: TypeProduct[] = [];

  w = 0
  u = 'Kg'

  constructor(private testService: APIservicesService,
    private route: ActivatedRoute, private _formBuilder: FormBuilder,
    public dialog: MatDialog,private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    public loadService: LoaderService) {
    this.formGroup = this._formBuilder.group({});
  }

  formGroup: FormGroup;

  units: string[] = ['Hộp', 'Cái', 'Phần']
  Fruits: IVEFactoryView[] = []
  factoryId = ''
  user = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.user = id
                this.factoryId = re.workingFor
                this.testService.getAllInventoryFactorybyProducts(re.workingFor)
                  .subscribe({
                    next: (re) => {
                      this.Fruits = re
                    }
                  })

                this.testService.getAllProductbyFactorys(re.workingFor, "Today_1_0_0")
                  .subscribe({
                    next: (f) => {
                      this.Products = f;
                      this.dataSourceProduct = new MatTableDataSource(this.Products);
                      this.dataSourceProduct.paginator = this.paginatorProduct;
                      this.dataSourceProduct.sort = this.sortProduct;
                    },
                    error: (response) => {
                      console.log(response);
                    }
                  });

                this.testService.getTypeProductsFilter(re.workingFor, "All Time")
                  .subscribe({
                    next: (re) => {
                      this.TypeProducts = re
                    }
                  })
              }
            })
        }
      }
    })

    this.addProductRequest.temperature = 24
    this.addProductRequest.humidity = 80
  }

  onType(id: any) {
    this.testService.getIdTypeProduct(id)
      .subscribe({
        next: (re) => {
          this.addProductRequest.productName = re.typeName + ' ' + re.net_weight + 'g' + ' ' + re.brand
          this.addProductRequest.procedureOfProduct = re.procedureOfProduct
          this.addProductRequest.elementOfProduct = re.elementOfProduct
          this.addProductRequest.net_weight = re.net_weight
        }
      })
  }

  onNet(id: number) {
    const a = this.addProductRequest.productName.split(' ').length
    this.addProductRequest.productName = this.addProductRequest.productName.split(this.addProductRequest.productName.split(' ')[a - 1])[0] + ' ' + id + 'g'
  }

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File;

  photoPath: string = environment.photoUrl
  photoPathName: string = ''

  onChange(event: any) {
    this.file = event.target.files[0];
    this.addProductRequest.imageProduct = this.file.name
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

  add(event: Event) {
    let date_mfg = new Date(this.addProductRequest.mfg_date)
    let date_exp = new Date(this.addProductRequest.exp_date)
    const dm = this.datePipe.transform(date_mfg, 'yyyy-MM-dd')
    const de = this.datePipe.transform(date_exp,'yyyy-MM-dd')

    if (this.addProductRequest.amountProduct <= 0 || this.w <= 0 || this.addProductRequest.typeProductId === 0
      || this.addProductRequest.unit === "" || this.addProductRequest.exp_date === "" || this.addProductRequest.mfg_date === ""
      || this.addProductRequest.humidity <= 0 || this.addProductRequest.unit === "" || this.addProductRequest.harvestId === "") {
      this._snackBar.open('Chưa nhập đủ dữ liệu hoặc chưa đúng', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: ['snackbar']
      });
    }
    else {
      this.testService.checkDateExp(dm!, de!)
      .subscribe({
        next: (me) => {
          if(me.toString() === "Không hợp lệ"){
            this._snackBar.open('Ngày sản xuất và hạn sử dụng không hợp lệ', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 1500,
              panelClass: ['snackbar']
            });
          }
          else
          {
            this.testService.getIdInventoryFactory(this.addProductRequest.harvestId)
            .subscribe({
              next: (re1) => {
                if (this.w > re1.amount) {
                  this._snackBar.open('Số lượng trái cây không đủ', 'OK', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 1500,
                    panelClass: ['snackbar']
                  });
                }
                else {
                  const conlai = re1.amount - this.w
                  this.testService.useIF(this.addProductRequest.harvestId, conlai)
                    .subscribe({ next: (re2) => { } })
                  this.addProductRequest._status = 0;
                  this.addProductRequest.productId = '';
                  this.addProductRequest.amountProduct_first = this.addProductRequest.amountProduct
                  this.addProductRequest.date_create = '2022-10-11T07:40:25.49';
                  this.addProductRequest.date_update = '2022-10-11T07:40:25.49';
                  this.addProductRequest.factoryId = this.factoryId
                  this.testService.addProduct(this.addProductRequest)
                    .subscribe({
                      next: (f) => {
                        this.ngOnInit();
                        this.addProductRequest.elementOfProduct = '',
                          this.addProductRequest.unit = '',
                          this.addProductRequest.procedureOfProduct = '',
                          this.addProductRequest.amountProduct = 0,
                          this.addProductRequest.humidity = 0,
                          this.addProductRequest.temperature = 0,
                          this.addProductRequest.net_weight = 0,
                          this.addProductRequest.exp_date = '',
                          this.addProductRequest.mfg_date = '',
                          this.addProductRequest.productName = '',
      
                          this.addNotice.sendId = this.user
                        this.addNotice.title = "Sản phẩm mới"
                        this.addNotice.content = "Sản phẩm mới được sản xuất các cửa hàng có thể đặt mua"
                        this.addNotice.receiveDate = '2022-10-11T07:40:25.49'
                        this.addNotice.sendDate = '2022-10-11T07:40:25.49'
                        this.testService.addNoticeAllStore(this.addNotice)
                          .subscribe({
                            next: (rewq) => {
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
              }
            })
          }
        }
      })
    }
  }

  cancel() {
    this.addProductRequest.elementOfProduct = '',
      this.addProductRequest.unit = '',
      this.addProductRequest.procedureOfProduct = '',
      this.addProductRequest.amountProduct = 0,
      this.addProductRequest.humidity = 0,
      this.addProductRequest.temperature = 0,
      this.addProductRequest.net_weight = 0,
      this.addProductRequest.exp_date = '',
      this.addProductRequest.mfg_date = '',
      this.addProductRequest.productName = '';
  }


  w_from = 0
  w_to = 0

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  schoice = 0

  filter(req: string, id: number) {
    this.testService.getAllProductbyFactorys(this.factoryId, req + "_" + id + "_" + this.w_to + "_" + this.w_from)
      .subscribe({
        next: (f) => {
          this.Products = f;
          this.dataSourceProduct = new MatTableDataSource(this.Products);
          this.dataSourceProduct.paginator = this.paginatorProduct;
          this.dataSourceProduct.sort = this.sortProduct;
        },
        error: (response) => {
          console.log(response);
        }
      });
  }

  applyFilterProduct(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProduct.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceProduct.paginator) {
      this.dataSourceProduct.paginator.firstPage();
    }
  }
}
