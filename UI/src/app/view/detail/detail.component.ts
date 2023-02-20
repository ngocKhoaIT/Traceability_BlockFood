import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailFull } from 'src/app/models/models-view/detailfull.model';
import { DetailLiveFull } from 'src/app/models/models-view/detailLiveFull.model';
import { DetailLiveWTM } from 'src/app/models/models-view/detailLiveWTM.model';
import { DetailWTM } from 'src/app/models/models-view/detailWTM.model';
import { ILView } from 'src/app/models/models-view/ILView.model';
import { APIservicesService } from 'src/app/services/apiservices.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  constructor(private route:ActivatedRoute,public loaderService : LoaderService,
    private _authService: APIservicesService,
    @Inject(LOCALE_ID) public locale: string) {
  }
  qrImage = ''
  photoPath = environment.photoUrl
  check1 = false
  check2 = false
  check3 = false
  check4 = false

  tabFarmWTM = true
  changeFarmWTM(){
    this.tabFarmWTM = false
    this.tabDetailWTM = true
    this.tabFactoryWTM = true
    this.tabStoreWTM = true
    this.tabTransportWTM = true
  }

  tabDetailWTM = true
  changeDetailWTM(){
    this.tabDetailWTM = false
    this.tabFarmWTM = true
    this.tabFactoryWTM = true
    this.tabStoreWTM = true
    this.tabTransportWTM = true
  }

  tabFactoryWTM = true
  changeFactoryWTM(){
    this.tabDetailWTM = true
    this.tabFarmWTM = true
    this.tabFactoryWTM = false
    this.tabStoreWTM = true
    this.tabTransportWTM = true
  }

  tabTransportWTM = true
  changeTransportWTM(){
    this.tabDetailWTM = true
    this.tabFarmWTM = true
    this.tabFactoryWTM = true
    this.tabStoreWTM = true
    this.tabTransportWTM = false
  }

  tabStoreWTM = true
  changeStoreWTM(){
    this.tabDetailWTM = true
    this.tabFarmWTM = true
    this.tabFactoryWTM = true
    this.tabStoreWTM = false
    this.tabTransportWTM = true
  }

  tabDetailFull = true
  changeDetailFull(){
    this.tabDetailFull = false
    this.tabFarmFull = true
    this.tabFactoryFull = true
    this.tabStoreFull = true
    this.tabTransportFull = true
  }

  tabFarmFull = true
  changeFarmFull(){
    this.tabFarmFull = false
    this.tabMerchantFull = true
    this.tabDetailFull = true
    this.tabFactoryFull = true
    this.tabStoreFull = true
    this.tabTransportFull = true
  }

  tabMerchantFull = true
  changeMerchantFull(){
    this.tabFarmFull = true
    this.tabMerchantFull = false
    this.tabDetailFull = true
    this.tabFactoryFull = true
    this.tabStoreFull = true
    this.tabTransportFull = true
  }

  tabFactoryFull = true
  changeFactoryFull(){
    this.tabDetailFull = true
    this.tabFarmFull = true
    this.tabMerchantFull = true
    this.tabFactoryFull = false
    this.tabStoreFull = true
    this.tabTransportFull = true
  }

  tabTransportFull = true
  changeTransportFull(){
    this.tabDetailFull = true
    this.tabFarmFull = true
    this.tabMerchantFull = true
    this.tabFactoryFull = true
    this.tabStoreFull = true
    this.tabTransportFull = false
  }

  tabStoreFull = true
  changeStoreFull(){
    this.tabDetailFull = true
    this.tabFarmFull = true
    this.tabMerchantFull = true
    this.tabFactoryFull = true
    this.tabStoreFull = false
    this.tabTransportFull = true
  }

  tabDetailLiveFull = true
  changeDetailLiveFull(){
    this.tabDetailLiveFull = false
    this.tabMerchantLiveFull = true
    this.tabFarmLiveFull = true
    this.tabFactoryLiveFull = true
    this.tabStoreLiveFull = true
    this.tabTransportLiveFull = true
  }

  tabFarmLiveFull = true
  changeFarmLiveFull(){
    this.tabFarmLiveFull = false
    this.tabDetailLiveFull = true
    this.tabFactoryLiveFull = true
    this.tabMerchantLiveFull = true
    this.tabStoreLiveFull = true
    this.tabTransportLiveFull = true
  }

  tabMerchantLiveFull = true
  changeMerchantLiveFull(){
    this.tabFarmLiveFull = true
    this.tabMerchantLiveFull = false
    this.tabDetailLiveFull = true
    this.tabFactoryLiveFull = true
    this.tabStoreLiveFull = true
    this.tabTransportLiveFull = true
  }

  tabFactoryLiveFull = true
  changeFactoryLiveFull(){
    this.tabDetailLiveFull = true
    this.tabFarmLiveFull = true
    this.tabMerchantLiveFull = true
    this.tabFactoryLiveFull = false
    this.tabStoreLiveFull = true
    this.tabTransportLiveFull = true
  }

  tabTransportLiveFull = true
  changeTransportLiveFull(){
    this.tabDetailLiveFull = true
    this.tabFarmLiveFull = true
    this.tabFactoryLiveFull = true
    this.tabStoreLiveFull = true
    this.tabTransportLiveFull = false
  }

  tabStoreLiveFull = true
  changeStoreLiveFull(){
    this.tabDetailLiveFull = true
    this.tabFarmLiveFull = true
    this.tabFactoryLiveFull = true
    this.tabMerchantLiveFull = true
    this.tabStoreLiveFull = false
    this.tabTransportLiveFull = true
  }

  tabDetailLiveWTM = true
  changeDetailLiveWTM(){
    this.tabDetailLiveWTM = false
    this.tabFarmLiveWTM = true
    this.tabFactoryLiveWTM = true
    this.tabStoreLiveWTM = true
    this.tabTransportLiveWTM = true
  }

  tabFarmLiveWTM = true
  changeFarmLiveWTM(){
    this.tabFarmLiveWTM = false
    this.tabDetailLiveWTM = true
    this.tabFactoryLiveWTM = true
    this.tabStoreLiveWTM = true
    this.tabTransportLiveWTM = true
  }

  tabMerchantLiveWTM = true
  changeMerchantLiveWTM(){
    this.tabFarmLiveWTM = true
    this.tabMerchantLiveWTM = false
    this.tabDetailLiveWTM = true
    this.tabFactoryLiveWTM = true
    this.tabStoreLiveWTM = true
    this.tabTransportLiveWTM = true
  }

  tabFactoryLiveWTM = true
  changeFactoryLiveWTM(){
    this.tabDetailLiveWTM = true
    this.tabFarmLiveWTM = true
    this.tabFactoryLiveWTM = false
    this.tabStoreLiveWTM = true
    this.tabTransportLiveWTM = true
  }

  tabTransportLiveWTM = true
  changeTransportLiveWTM(){
    this.tabDetailLiveWTM = true
    this.tabFarmLiveWTM = true
    this.tabFactoryLiveWTM = true
    this.tabStoreLiveWTM = true
    this.tabTransportLiveWTM = false
  }

  tabStoreLiveWTM = true
  changeStoreLiveWTM(){
    this.tabDetailLiveWTM = true
    this.tabFarmLiveWTM = true
    this.tabFactoryLiveWTM = true
    this.tabStoreLiveWTM = false
    this.tabTransportLiveWTM = true
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if(id){
          this._authService.detailProductFull(id)
          .subscribe({
            next: (re) => {
              this._authService.detailProductWTM(id)
              .subscribe({
                next: (re1) => {
                  this._authService.detailProductLiveFull(id)
                  .subscribe({
                    next: (re2) => {
                      this._authService.detailProductLiveWTM(id)
                      .subscribe({
                        next: (re3) => {
                          if(re.length !==0 && re[0].checkM === 1)
                          {
                            this.check1 = true
                            this.check2 = false
                            this.check3 = false
                            this.check4 = false
                            this.detailFull = re[0]
                            this.tabDetailFull = false
                            this.qrImage = re[0].imageQR
                            this._authService.getIdInventory(re[0].id)
                            .subscribe({
                              next: (st)=>{
                                this.status = st.status_request
                              }
                            })
                            this._authService.getAllInventoryReceived(re[0].storeId,re[0].productName)
                            .subscribe({
                              next: (rc) => {
                                this.amount = rc[0].amount
                                this.gName = rc[0].goodsName
                              }
                            })
                          }
                          else if (re1.length !== 0)
                          {

                            this.check1 = false
                            this.check2 = true
                            this.check3 = false
                            this.check4 = false
                            this.detailWTM = re1[0]

                            this.tabDetailWTM = false
                            this.qrImage = re1[0].imageQR

                            this._authService.getIdInventory(re1[0].id)
                            .subscribe({
                              next: (st)=>{
                                this.status = st.status_request
                              }
                            })
                            this._authService.getAllInventoryReceived(re1[0].storeId,re1[0].productName)
                            .subscribe({
                              next: (rc) => {
                                this.amount = rc[0].amount
                                this.gName = rc[0].goodsName
                              }
                            })
                          }
                          else if (re2.length !== 0)
                          {
                            this.qrImage = re2[0].imageQR
                            this.check1 = false
                            this.check2 = false
                            this.check3 = true
                            this.check4 = false

                            this.tabDetailLiveFull = false
                            this.detailLiveFull = re2[0]

                            this._authService.getIdInventory(re2[0].id)
                            .subscribe({
                              next: (st)=>{
                                this.status = st.status_request
                              }
                            })
                            this._authService.getAllInventoryReceived(re2[0].storeId,re2[0].fruitName)
                            .subscribe({
                              next: (rc) => {
                                this.amount = rc[0].amount
                                this.gName = rc[0].goodsName
                              }
                            })
                          }
                          else{
                            this.qrImage = re3[0].imageQR
                            this.check1 = false
                            this.check2 = false
                            this.check3 = false
                            this.check4 = true
                            this.tabDetailLiveWTM = false
                            this.detailLiveWTM = re3[0]

                            this._authService.getIdInventory(re3[0].id)
                            .subscribe({
                              next: (st)=>{
                                this.status = st.status_request
                              }
                            })
                            this._authService.getAllInventoryReceived(re3[0].storeId,re3[0].fruitName)
                            .subscribe({
                              next: (rc) => {
                                this.amount = rc[0].amount
                                this.gName = rc[0].goodsName
                              }
                            })
                          }
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    })
  }

  status = ''
  amount = 0
  gName = ''          

  check5 = false
  changeCheck5(){
    this._authService.getAllInventoryReceived("_",this.gName)
    .subscribe({
      next: (Re) =>
      {
        this.dataSource = new MatTableDataSource(Re);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }
    })
    this.check5 = !this.check5
  }

  displayedColumns: string[] = ['goodsName', 'amount', 'unit','storeName','addressStore'];

  dataSource = new MatTableDataSource<ILView>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  urlImage = environment.photoUrl

  // changeFormatDate(id: string){
  //   return formatDate(id,'dd/MM/yyyy',this.locale)
  // }

  detailFull: DetailFull = {
    id : '',
    productId : '',
    productName : '',
    factoryId : '',
    factoryName : '',
    factoryEmail : '',
    addressFactory : '',
    ifId : '',
    harvestId : '',
    date_harvest : '',
    mfg_date : '',
    exp_date : '',
    net_weight :0,
    procedureOfProduct : '',
    elementOfProduct : '',
    tfactory :0,
    hfactory :0,
    storeId : '',
    storeName : '',
    storePhone : '',
    storeEmail : '',
    addressStore : '',
    fruitId : '',
    fruitName : '',
    technology : '',
    land : '',
    fertilizer : '',
    pesticides : '',
    date_plant : '',
    farmId : '',
    farmName : '',
    addressFarm : '',
    billId1 : '',
    itemBill1 : '',
    placeId1 : '',
    transportId1 : '',
    transportName1 : '',
    emailTransport1 : '',
    addressTransport1 : '',
    tTransportUTO :0,
    hTransportUTO :0,
    placeUTO : '',
    goodsUTO : '',
    toPlaceUTO : '',
    billId2 : '',
    itemBill2 : '',
    placeId2 : '',
    transportId2 : '',
    transportName2 : '',
    emailTransport2 : '',
    addressTransport2 : '',
    tTransportMF :0,
    hTransportMF :0,
    placeMF : '',
    goodsMF : '',
    toPlaceMF : '',
    merchantId : '',
    merchantName : '',
    addressMerchant : '',
    imageFH: '',
    imageProduct: '',
    imageQR: '',
    checkM: 0,
  } 

  detailWTM: DetailWTM = {
    id:  '',
    productId:  '',
    productName:  '',
    factoryId:  '',
    factoryName:  '',
    factoryEmail:  '',
    addressFactory:  '',
    ifId:  '',
    harvestId:  '',
    date_harvest:  '',
    mfg_date:  '',
    exp_date:  '',
    net_weight:  0,
    procedureOfProduct:  '',
    elementOfProduct:  '',
    tfactory:  0,
    hfactory:  0,
    storeId:  '',
    storeName:  '',
    storePhone:  '',
    storeEmail:  '',
    addressStore:  '',
    fruitId:  '',
    fruitName:  '',
    technology:  '',
    land:  '',
    fertilizer:  '',
    pesticides:  '',
    date_plant:  '',
    farmId:  '',
    farmName:  '',
    addressFarm:  '',
    billId1:  '',
    itemBill1:  '',
    placeId1:  '',
    transportId1:  '',
    transportName1:  '',
    emailTransport1:  '',
    addressTransport1:  '',
    tTransportUTO:  0,
    hTransportUTO:  0,
    placeUTO:  '',
    goodsUTO:  '',
    toPlaceUTO:  '',
    billId2 :  '',
    itemBill2 :  '',
    placeId2 :  '',
    transportId2 :  '',
    transportName2 :  '',
    emailTransport2 :  '',
    addressTransport2 :  '',
    tTransportUTO2 :  0,
    hTransportUTO2 :  0,
    placeUTO2 :  '',
    goodsUTO2 :  '',
    toPlaceUTO2 :  '',
    imageQR :  '',
    imageProduct :  '',
    imageFH :  '',
  }

  detailLiveFull: DetailLiveFull = {
    id :  '',
    harvestId :  '',
    date_harvest :  '',
    storeId :  '',
    storeName :  '',
    storePhone :  '',
    storeEmail :  '',
    addressStore :  '',
    fruitId :  '',
    fruitName :  '',
    technology :  '',
    land :  '',
    fertilizer :  '',
    pesticides :  '',
    date_plant :  '',
    farmId :  '',
    farmName :  '',
    addressFarm :  '',
    billId :  '',
    itemBill :  '',
    placeId :  '',
    transportId :  '',
    transportName :  '',
    emailTransport :  '',
    addressTransport :  '',
    tTransportMF : 0,
    hTransportMF : 0,
    placeMF :  '',
    goodsMF :  '',
    toPlaceMF :  '',
    merchantId :  '',
    merchantName :  '',
    addressMerchant :  '',
    imageQR :  '',
    imageFH :  '',
  }

  detailLiveWTM: DetailLiveWTM = {
    id:  '',
    harvestId:  '',
    date_harvest:  '',
    storeId:  '',
    storeName:  '',
    storePhone:  '',
    storeEmail:  '',
    addressStore:  '',
    fruitId:  '',
    fruitName:  '',
    technology:  '',
    land:  '',
    fertilizer:  '',
    pesticides:  '',
    date_plant:  '',
    farmId:  '',
    farmName:  '',
    addressFarm:  '',
    billId:  '',
    itemBill:  '',
    placeId:  '',
    transportId:  '',
    transportName:  '',
    emailTransport:  '',
    addressTransport:  '',
    tTransportUTO :  0,
    hTransportUTO :  0,
    placeUTO :  '',
    goodsUTO :  '',
    toPlaceUTO :  '',
    imageQR :  '',
    imageFH :  '',
  }

}
