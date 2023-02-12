import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NoticeDelete } from 'src/app/base/notice-delete/notice-delete.component';
import { TypeProduct } from 'src/app/models/typeProduct.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeProductComponent implements OnInit {

  displayedColumnsTypeProduct: string[] = ['typeProductId', 'typeName', 'net_weight', 'brand', 'procedureOfProduct', 'elementOfProduct', 'system']

  dataSourceTypeProduct = new MatTableDataSource<TypeProduct>;


  @ViewChild(MatPaginator)
  paginatorTypeProduct!: MatPaginator;
  @ViewChild(MatSort)
  sortTypeProduct!: MatSort;

  TypeProducts: TypeProduct[] = [];

  constructor(private testService: APIservicesService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar, public loadService: LoaderService) {

  }

  units: string[] = ['Hộp', 'Cái', 'Phần']
  factoryId = ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.testService.getIdUser(id)
            .subscribe({
              next: (re) => {
                this.factoryId = re.workingFor
                this.testService.getTypeProductsFilter(this.factoryId, "All Time")
                .subscribe({
                  next: (re) => {
                    this.TypeProducts = re
                    this.dataSourceTypeProduct = new MatTableDataSource(re)
                    this.dataSourceTypeProduct.paginator = this.paginatorTypeProduct
                    this.dataSourceTypeProduct.sort = this.sortTypeProduct
                  }
                })
              }
            })
        }
      }
    })
  }

  add(event: Event) {
    const dialogRef = this.dialog.open(popUpType, {
      width: '700px',
      height: '555px',
      data: { id: 0, factory: this.factoryId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  cancel() {

  }

  timeInput = 'Today'

  times: string[] = ['Today', 'Last 7 Day', 'Last Month', 'Last 12 Months', 'All Time']

  filter(req: string) {
    this.testService.getTypeProductsFilter(this.factoryId, req)
      .subscribe({
        next: (re) => {
          this.TypeProducts = re
          this.dataSourceTypeProduct = new MatTableDataSource(re)
          this.dataSourceTypeProduct.paginator = this.paginatorTypeProduct
          this.dataSourceTypeProduct.sort = this.sortTypeProduct
        }
      })
  }

  redirectToUpdate(id: number): void {
    const dialogRef = this.dialog.open(popUpType, {
      width: '700px',
      height: '555px',
      data: { id: id, factory: this.factoryId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(),
        console.log('The dialog was closed');
    });
  }

  redirectToDelete(id: number) {
    const dialogRef = this.dialog.open(NoticeDelete, {
      width: 'auto',
      height: 'auto',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.testService.deleteTypeProduct(id)
          .subscribe({
            next: (re) => {
              this._snackBar.open('Xóa thành công', 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 1500,
                panelClass: ['snackbar']
              });
              this.ngOnInit()
            },
            error: (er) => {
              this._snackBar.open(er, 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 1500,
                panelClass: ['snackbar']
              });
            }
          })
      }
    });
  }

  applyFilterTypeProduct(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTypeProduct.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTypeProduct.paginator) {
      this.dataSourceTypeProduct.paginator.firstPage();
    }
  }
}


@Component({
  selector: 'popUpType',
  templateUrl: 'popUpType.html',
  styleUrls: ['./popUpType.scss']
})
export class popUpType implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<popUpType>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, factory: string },
    private apiService: APIservicesService,
    private _snackBar: MatSnackBar,
  ) {
    this.checkId = true
    this.btnChange = ''
    this.btnColor = ''
  }
  ngOnInit(): void {
    const id = this.data.id
    if (id !== 0) {
      this.checkId = true
      this.btnChange = 'Cập nhật'
      this.btnColor = '#edea16'
      this.apiService.getIdTypeProduct(id)
        .subscribe({
          next: (response) => {
            this.addTypeProductRequest = response;
          }
        })
    }
    else {
      this.checkId = true
      this.btnChange = 'Thêm'
      this.btnColor = '#228B22'
      this.addTypeProductRequest.factoryId = this.data.factory
    }
  }

  checkId: boolean
  loginValid = true
  btnChange: string
  btnColor: string

  addTypeProductRequest: TypeProduct = {
    _status: 0,
    date_create: '',
    date_update: '',
    brand: '',
    elementOfProduct: '',
    factoryId: '',
    imageProduct: '',
    net_weight: 0,
    procedureOfProduct: '',
    typeName: '',
    typeProductId: 0,
  }

  onNoClick() {
    this.dialogRef.close();
  }

  change(event: Event) {
    const id = this.data.id
    if(this.addTypeProductRequest.typeName === "" || this.addTypeProductRequest.procedureOfProduct ===""
        || this.addTypeProductRequest.elementOfProduct === "" || this.addTypeProductRequest.net_weight <= 0
        || this.addTypeProductRequest.brand === ""){
          this._snackBar.open('Chưa nhập đủ dữ liệu hoặc nhập sai', 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 1500,
            panelClass: ['snackbar']
          });
    }
    else{
      this.apiService.checkNameType(this.data.factory, this.addTypeProductRequest.typeName)
      .subscribe({
        next: (ret) =>{

        }
      })
    }
    if (id !== 0) {
      this.apiService.updateTypeProduct(this.addTypeProductRequest)
      .subscribe({
        next: (re) => {
          this.ngOnInit();
            this.dialogRef.close();
            this._snackBar.open('Cập nhật thành công', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 1500,
              panelClass: ['snackbar']
            });
        }
      })
    }
    else
    {
      this.addTypeProductRequest._status = 0;
      this.addTypeProductRequest.typeProductId = 0;
      this.addTypeProductRequest.date_create = '2022-10-11T07:40:25.49';
      this.addTypeProductRequest.date_update = '2022-10-11T07:40:25.49';
      this.apiService.addTypeProduct(this.addTypeProductRequest)
        .subscribe({
          next: (f) => {
            this.ngOnInit();
            this.dialogRef.close();
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

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File;

  photoPath: string = environment.photoUrl
  photoPathName: string = ''

  onChange(event: any) {
    this.file = event.target.files[0];
    this.addTypeProductRequest.imageProduct = this.file.name
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    this.apiService.upload(this.file).subscribe({
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
}