import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetailTransportPtoP } from '../models/detailTransportPtoP.model';
import { Factory } from '../models/factory.model';
import { FactoryRequest } from '../models/factoryRequest.model';
import { Farm } from '../models/farm.model';
import { FarmRequest } from '../models/farmRequest.model';
import { FQView } from '../models/models-view/FQView.model';
import { Fruit } from '../models/fruit.model';
import { FruitHarvest } from '../models/fruitHarvest.model';
import { Inventory } from '../models/inventory.model';
import { InventoryFactory } from '../models/inventoryFactory.model';
import { Merchant } from '../models/merchant.model';
import { MerchantFarm } from '../models/merchantFarm.model';
import { Person } from '../models/person.model';
import { Product } from '../models/product.model';
import { Seed } from '../models/seed.model';
import { Store } from '../models/store.model';
import { Transport } from '../models/transport.model';
import { TransportPtoP } from '../models/transportPtoP.model';
import { TypeProduct } from '../models/typeProduct.model';
import { UpToTransport } from '../models/uptotransport.model';
import { User } from '../models/user.model';
import { FHView } from '../models/models-view/FHView.model';
import { MCFView } from '../models/models-view/MCFView.model';
import { FHFView } from '../models/models-view/FHFView.model';
import { MFView } from '../models/models-view/MFView.model';
import { UTOView } from '../models/models-view/UTOView.model';
import { TPtoPView } from '../models/models-view/TPtoPView.model';
import { IVEFactoryView } from '../models/models-view/IVEFactoryView.model';
import { FaQView } from '../models/models-view/FaQView.model';
import { PSView } from '../models/models-view/PSView.model';
import { IVEStoreView } from '../models/models-view/IVEStoreView.model';
import { Province } from '../models/Province.model';
import { DetailFull } from '../models/models-view/detailfull.model';
import { DetailWTM } from '../models/models-view/detailWTM.model';
import { DetailLiveFull } from '../models/models-view/detailLiveFull.model';
import { DetailLiveWTM } from '../models/models-view/detailLiveWTM.model';
import { Notice } from '../models/models-view/notice.model';
import { NoticeData } from '../models/noticeData.model';
import { Ward } from '../models/ward.model';
import { District } from '../models/district.model';
import { Customer } from '../models/customer.model';
import { DetailOrder } from '../models/detailOrder.model';
import { OrderBill } from '../models/orderBill.model';
import { ILView } from '../models/models-view/ILView.model';
import { FarmView } from '../models/models-view/farmView.model';
import { FactoryView } from '../models/models-view/factoryView.model';
import { MerchantView } from '../models/models-view/merchantView.model';
import { TransportView } from '../models/models-view/transportView.model';
import { UserView } from '../models/models-view/userView.model';
import { FarmPersonView } from '../models/models-view/farmPersonView.model';
import { Block } from '../models/block.model';

@Injectable({
  providedIn: 'root'
})
export class APIservicesService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  //người dùng 
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + "api/Users/GetAll")
  }

  getAllUserbyRoles(r: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + "api/Users/GetAllUserbyRole/" + r)
  }

  addUser(addUserRequest: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + 'api/Users/Add',
      addUserRequest);
  }

  getIdUser(id: string): Observable<User> {
    return this.http.get<User>(this.baseApiUrl + 'api/Users/Get/' + id)
  }

  updateUser(updateUserRequest: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + 'api/Users/Update',
      updateUserRequest);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + 'api/Users/Delete/' + id, id);
  }

  // Đăng nhập
  login(user: string, password: string): Observable<User> {
    return this.http.get<User>(this.baseApiUrl + 'api/Users/check/' + user + ',' + password);
  }

  //nông trại 
  getAllFarms(): Observable<Farm[]> {
    return this.http.get<Farm[]>(this.baseApiUrl + "api/Farms/GetAll")
  }

  getFarmsbyFruit(req: string): Observable<FarmPersonView[]>{
    return this.http.get<FarmPersonView[]>(this.baseApiUrl + "api/Farms/GetFarmsbyFruit/" + req)
  }

  getFarmsbyFilter(req: string): Observable<FarmView[]> {
    return this.http.get<FarmView[]>(this.baseApiUrl + "api/Farms/GetFarmsbyFilter/" + req)
  }

  getAllFarmbyMerchants(): Observable<MCFView[]> {
    return this.http.get<MCFView[]>(this.baseApiUrl + "api/Farms/GetAllFarmHarvestbyMerchant")
  }

  getAllFarmByFruitHarvest(): Observable<Farm[]> {
    return this.http.get<Farm[]>(this.baseApiUrl + "api/Farms/GetAllFarmHarvest")
  }

  addFarm(addFarmRequest: Farm): Observable<Farm> {
    return this.http.post<Farm>(this.baseApiUrl + 'api/Farms/AddFarm',
      addFarmRequest);
  }

  getIdFarm(id: string): Observable<Farm> {
    return this.http.get<Farm>(this.baseApiUrl + 'api/Farms/Get/' + id)
  }

  updateFarm(updateFarmRequest: Farm): Observable<Farm> {
    return this.http.post<Farm>(this.baseApiUrl + 'api/Farms/UpdateFarm',
      updateFarmRequest);
  }

  deleteFarm(id: string): Observable<Farm> {
    return this.http.post<Farm>(this.baseApiUrl + 'api/Farms/Delete/' + id, id);
  }

  //Thương lái
  getAllMerchants(): Observable<Merchant[]> {
    return this.http.get<Merchant[]>(this.baseApiUrl + "api/Merchants/GetAll")
  }

  addMerchant(addMerchantRequest: Merchant): Observable<Merchant> {
    return this.http.post<Merchant>(this.baseApiUrl + 'api/Merchants/AddMerchant',
      addMerchantRequest);
  }

  getIdMerchant(id: string): Observable<Merchant> {
    return this.http.get<Merchant>(this.baseApiUrl + 'api/Merchants/Get/' + id)
  }

  updateMerchant(updateMerchantRequest: Merchant): Observable<Merchant> {
    return this.http.post<Merchant>(this.baseApiUrl + 'api/Merchants/UpdateMerchant',
      updateMerchantRequest);
  }

  deleteMerchant(id: string): Observable<Merchant> {
    return this.http.post<Merchant>(this.baseApiUrl + 'api/Merchants/Delete/' + id, id);
  }

  //Nhà máy sản xuất
  getAllFactorys(): Observable<Factory[]> {
    return this.http.get<Factory[]>(this.baseApiUrl + "api/Factorys/GetAll")
  }

  getAllFactorybyProducts(): Observable<Factory[]> {
    return this.http.get<Factory[]>(this.baseApiUrl + "api/Factorys/GetAllFactorybyProduct")
  }

  addFactory(addFactoryRequest: Factory): Observable<Factory> {
    return this.http.post<Factory>(this.baseApiUrl + 'api/Factorys/AddFactory',
      addFactoryRequest);
  }

  getIdFactory(id: string): Observable<Factory> {
    return this.http.get<Factory>(this.baseApiUrl + 'api/Factorys/Get/' + id)
  }

  updateFactory(updateFactoryRequest: Factory): Observable<Factory> {
    return this.http.post<Factory>(this.baseApiUrl + 'api/Factorys/UpdateFactory',
      updateFactoryRequest);
  }

  deleteFactory(id: string): Observable<Factory> {
    return this.http.post<Factory>(this.baseApiUrl + 'api/Factorys/Delete/' + id, id);
  }

  //Đơn vị vận chuyển
  getAllTransports(): Observable<Transport[]> {
    return this.http.get<Transport[]>(this.baseApiUrl + "api/Transports/GetAll")
  }

  addTransport(addTransportRequest: Transport): Observable<Transport> {
    return this.http.post<Transport>(this.baseApiUrl + 'api/Transports/AddTransport',
      addTransportRequest);
  }

  getIdTransport(id: string): Observable<Transport> {
    return this.http.get<Transport>(this.baseApiUrl + 'api/Transports/Get/' + id)
  }

  updateTransport(updateTransportRequest: Transport): Observable<Transport> {
    return this.http.post<Transport>(this.baseApiUrl + 'api/Transports/UpdateTransport',
      updateTransportRequest);
  }

  deleteTransport(id: string): Observable<Transport> {
    return this.http.post<Transport>(this.baseApiUrl + 'api/Transports/Delete/' + id, id);
  }

  //Cửa hàng 
  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.baseApiUrl + "api/Stores/GetAll")
  }

  addStore(addStoreRequest: Store): Observable<Store> {
    return this.http.post<Store>(this.baseApiUrl + 'api/Stores/AddStore',
      addStoreRequest);
  }

  getIdStore(id: string): Observable<Store> {
    return this.http.get<Store>(this.baseApiUrl + 'api/Stores/Get/' + id)
  }

  updateStore(updateStoreRequest: Store): Observable<Store> {
    return this.http.post<Store>(this.baseApiUrl + 'api/Stores/UpdateStore',
      updateStoreRequest);
  }

  deleteStore(id: string): Observable<Store> {
    return this.http.post<Store>(this.baseApiUrl + 'api/Stores/Delete/' + id, id);
  }

  //Con người
  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseApiUrl + "api/Persons/GetAll")
  }

  checkAge(req: string) {
    return this.http.get(this.baseApiUrl + "api/Persons/CheckAge/" + req);
  }

  getAllPersonbyDs(req: string): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseApiUrl + "api/Persons/GetAllPersonbyD/" + req)
  }

  addPerson(addPersonRequest: Person): Observable<Person> {
    return this.http.post<Person>(this.baseApiUrl + 'api/Persons/AddPerson',
      addPersonRequest);
  }

  getIdPerson(id: string): Observable<Person> {
    return this.http.get<Person>(this.baseApiUrl + 'api/Persons/Get/' + id)
  }

  updatePerson(updatePersonRequest: Person): Observable<Person> {
    return this.http.post<Person>(this.baseApiUrl + 'api/Persons/UpdatePerson',
      updatePersonRequest);
  }

  deletePerson(id: string): Observable<Person> {
    return this.http.post<Person>(this.baseApiUrl + 'api/Persons/Delete/' + id, id);
  }

  // Tải ảnh
  upload(file: any): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(this.baseApiUrl + 'api/Photos/SaveFile/SaveFile', formData)
  }

  //Giống cây
  getAllSeedbyFarms(id: string): Observable<Seed[]> {
    return this.http.get<Seed[]>(this.baseApiUrl + "api/Seeds/GetAllbyFarm/" + id)
  }

  getSeedsExist(): Observable<Seed[]> {
    return this.http.get<Seed[]>(this.baseApiUrl + "api/Seeds/GetAllSeedExist")
  }


  checkNameSeed(id: string, name: string) {
    return this.http.get(this.baseApiUrl + "api/Seeds/CheckName/" + id + "," + name)
  }

  getSeedsbyFilters(id: string, req: string): Observable<Seed[]> {
    return this.http.get<Seed[]>(this.baseApiUrl + "api/Seeds/GetSeedsbyFilter/" + id + "," + req)
  }

  addSeed(addSeedRequest: Seed): Observable<Seed> {
    return this.http.post<Seed>(this.baseApiUrl + 'api/Seeds/AddSeed',
      addSeedRequest);
  }

  getIdSeed(id: number): Observable<Seed> {
    return this.http.get<Seed>(this.baseApiUrl + 'api/Seeds/Get/' + id)
  }

  updateSeed(updateSeedRequest: Seed): Observable<Seed> {
    return this.http.post<Seed>(this.baseApiUrl + 'api/Seeds/UpdateSeed',
      updateSeedRequest);
  }

  deleteSeed(id: number): Observable<Seed> {
    return this.http.post<Seed>(this.baseApiUrl + 'api/Seeds/Delete/' + id, id);
  }

  //Trái cây 
  getAllFruits(id: string): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(this.baseApiUrl + "api/Fruits/GetAll/" + id)
  }

  addFruit(addFruitRequest: Fruit): Observable<Fruit> {
    return this.http.post<Fruit>(this.baseApiUrl + 'api/Fruits/AddFruit',
      addFruitRequest);
  }

  getIdFruit(id: string): Observable<Fruit> {
    return this.http.get<Fruit>(this.baseApiUrl + 'api/Fruits/Get/' + id)
  }

  updateFruit(updateFruitRequest: Fruit): Observable<Fruit> {
    return this.http.post<Fruit>(this.baseApiUrl + 'api/Fruits/UpdateFruit',
      updateFruitRequest);
  }

  deleteFruit(id: string): Observable<Fruit> {
    return this.http.post<Fruit>(this.baseApiUrl + 'api/Fruits/Delete/' + id, id);
  }

  //Thu hoạch
  getAllFruitHarvests(id: string): Observable<FHView[]> {
    return this.http.get<FHView[]>(this.baseApiUrl + "api/FruitHarvests/GetAll/" + id)
  }

  getIdFruitHarvestbyFarm(id: string, p: string): Observable<FruitHarvest[]> {
    return this.http.get<FruitHarvest[]>(this.baseApiUrl + "api/FruitHarvests/GetIdFruitHarvestbyFarm/" + id + ',' + p)
  }

  getIdFruitHarvestbyFarmView(id: string, p: string): Observable<FHFView[]> {
    return this.http.get<FHFView[]>(this.baseApiUrl + "api/FruitHarvests/GetIdFruitHarvestbyFarmView/" + id + ',' + p)
  }

  exChangeFruit(a: number, b: string) {
    return this.http.get(this.baseApiUrl + "api/FruitHarvests/exChange/" + a + ',' + b)
  }

  getIfHarverst(id: string, date: string) {
    return this.http.get(this.baseApiUrl + "api/FruitHarvests/GetIfDateHarvest/" + id + ',' + date)
  }

  addFruitHarvest(addFruitHarvestRequest: FruitHarvest): Observable<FruitHarvest> {
    return this.http.post<FruitHarvest>(this.baseApiUrl + 'api/FruitHarvests/AddFruitHarvest',
      addFruitHarvestRequest);
  }

  sellFruit(id: string, w: number): Observable<FruitHarvest> {
    return this.http.get<FruitHarvest>(this.baseApiUrl + 'api/FruitHarvests/Sell/' + id + ',' + w);
  }

  getIdFruitHarvest(id: string): Observable<FruitHarvest> {
    return this.http.get<FruitHarvest>(this.baseApiUrl + 'api/FruitHarvests/Get/' + id)
  }

  updateFruitHarvest(updateFruitHarvestRequest: FruitHarvest): Observable<FruitHarvest> {
    return this.http.post<FruitHarvest>(this.baseApiUrl + 'api/FruitHarvests/UpdateFruitHarvest',
      updateFruitHarvestRequest);
  }

  deleteFruitHarvest(id: string): Observable<FruitHarvest> {
    return this.http.post<FruitHarvest>(this.baseApiUrl + 'api/FruitHarvests/Delete/' + id, id);
  }

  //Loại sản phẩm
  getAllTypeProducts(): Observable<TypeProduct[]> {
    return this.http.get<TypeProduct[]>(this.baseApiUrl + "api/TypeProducts/GetAll")
  }

  checkNameType(id: string, name : string){
    return this.http.get(this.baseApiUrl + "api/TypeProducts/CheckName/" +id +","+ name)
  } 

  addTypeProduct(addTypeProductRequest: TypeProduct): Observable<TypeProduct> {
    return this.http.post<TypeProduct>(this.baseApiUrl + 'api/TypeProducts/AddTypeProduct',
      addTypeProductRequest);
  }

  getIdTypeProduct(id: number): Observable<TypeProduct> {
    return this.http.get<TypeProduct>(this.baseApiUrl + 'api/TypeProducts/Get/' + id)
  }

  updateTypeProduct(updateTypeProductRequest: TypeProduct): Observable<TypeProduct> {
    return this.http.post<TypeProduct>(this.baseApiUrl + 'api/TypeProducts/UpdateTypeProduct',
      updateTypeProductRequest);
  }

  deleteTypeProduct(id: number): Observable<TypeProduct> {
    return this.http.post<TypeProduct>(this.baseApiUrl + 'api/TypeProducts/Delete/' + id, id);
  }

  //Sản phẩm
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + "api/Products/GetAll")
  }

  checkDateExp(m: string, e: string){
    return this.http.get(this.baseApiUrl + "api/Products/CheckDate/"+m+","+e)
  }

  getAllProductbyFactorys(id: string, req: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + "api/Products/GetAllProductbyFactory/" + id + "," + req)
  }

  getAllProductbyFactoryViews(id: string, p: string): Observable<PSView[]> {
    return this.http.get<PSView[]>(this.baseApiUrl + "api/Products/GetAllProductbyFactoryView/" + id + ',' + p)
  }

  addProduct(addProductRequest: Product): Observable<Product> {
    return this.http.post<Product>(this.baseApiUrl + 'api/Products/AddProduct',
      addProductRequest);
  }

  getIdProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.baseApiUrl + 'api/Products/Get/' + id)
  }

  updateProduct(updateProductRequest: Product): Observable<Product> {
    return this.http.post<Product>(this.baseApiUrl + 'api/Products/UpdateProduct',
      updateProductRequest);
  }

  sellProduct(id: string, a: number): Observable<Product> {
    return this.http.post<Product>(this.baseApiUrl + 'api/Products/Sell/' + id + ',' + a,
      id);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.post<Product>(this.baseApiUrl + 'api/Products/Delete/' + id, id);
  }

  //Nhập kho 
  getAllInventorys(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.baseApiUrl + "api/Inventorys/GetAll")
  }

  getAllInventorybyStores(id: string): Observable<IVEStoreView[]> {
    return this.http.get<IVEStoreView[]>(this.baseApiUrl + "api/Inventorys/GetAllbyStore/" + id)
  }

  getAllListInventoryStore(id: string, req: string, s: string): Observable<ILView[]> {
    return this.http.get<ILView[]>(this.baseApiUrl + "api/Inventorys/getAllListInventoryStore/" + id + ',' + req + ',' + s)
  }

  getAllInventoryReceived(id: string, req: string): Observable<ILView[]> {
    return this.http.get<ILView[]>(this.baseApiUrl + "api/Inventorys/getAllInventorybyReceived/" + id + "," + req)
  }

  getAllInventoryReceivedbyStores(id: string): Observable<ILView[]> {
    return this.http.get<ILView[]>(this.baseApiUrl + "api/Inventorys/getAllInventorybyReceivedStores/" + id)
  }

  addInventory(addInventoryRequest: Inventory) {
    return this.http.post(this.baseApiUrl + 'api/Inventorys/AddInventory',
      addInventoryRequest);
  }

  addInventoryAutoProduct(addInventoryRequest: Inventory) {
    return this.http.post(this.baseApiUrl + 'api/Inventorys/AutoProduct',
      addInventoryRequest);
  }

  getIdInventory(id: string): Observable<Inventory> {
    return this.http.get<Inventory>(this.baseApiUrl + 'api/Inventorys/Get/' + id)
  }

  checkInventory(id: string): Observable<Inventory> {
    return this.http.get<Inventory>(this.baseApiUrl + 'api/Inventorys/Check/' + id)
  }


  updateInventory(updateInventoryRequest: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.baseApiUrl + 'api/Inventorys/UpdateInventory',
      updateInventoryRequest);
  }

  updateStatusInventory(id: string): Observable<Inventory> {
    return this.http.post<Inventory>(this.baseApiUrl + 'api/Inventorys/UpdateStatus/' + id, id);
  }

  deleteInventory(id: number): Observable<Inventory> {
    return this.http.post<Inventory>(this.baseApiUrl + 'api/Inventorys/Delete/' + id, id);
  }

  //Thương lái buôn 
  getAllMerchantFarms(): Observable<MerchantFarm[]> {
    return this.http.get<MerchantFarm[]>(this.baseApiUrl + "api/MerchantFarms/GetAll")
  }

  getAllMerchantFarmbyTransports(): Observable<MFView[]> {
    return this.http.get<MFView[]>(this.baseApiUrl + "api/MerchantFarms/GetAllbyTransport")
  }

  getAllMerchantFarmbyFactorys(id: string, req: string): Observable<MFView[]> {
    return this.http.get<MFView[]>(this.baseApiUrl + "api/MerchantFarms/GetAllbyFactory/" + id + ',' + req)
  }

  getAllMerchantFarmbyFactorysbyFilter(id: string, req: string, s: string): Observable<MFView[]> {
    return this.http.get<MFView[]>(this.baseApiUrl + "api/MerchantFarms/GetAllbyFactorybyFilter/" + id + ',' + req + ',' + s)
  }

  getAllMerchantFarmbyPlaces(id: string): Observable<MerchantFarm[]> {
    return this.http.get<MerchantFarm[]>(this.baseApiUrl + "api/MerchantFarms/GetAllbyPlace/" + id)
  }

  addMerchantFarm(addMerchantFarmRequest: MerchantFarm): Observable<MerchantFarm> {
    return this.http.post<MerchantFarm>(this.baseApiUrl + 'api/MerchantFarms/AddMerchantFarm',
      addMerchantFarmRequest);
  }

  getIdMerchantFarm(id: string): Observable<MerchantFarm> {
    return this.http.get<MerchantFarm>(this.baseApiUrl + 'api/MerchantFarms/Get/' + id)
  }

  updateMerchantFarm(updateMerchantFarmRequest: MerchantFarm): Observable<MerchantFarm> {
    return this.http.post<MerchantFarm>(this.baseApiUrl + 'api/MerchantFarms/UpdateMerchantFarm',
      updateMerchantFarmRequest);
  }

  updateStatusMF(id: string, req: string): Observable<MerchantFarm> {
    return this.http.post<MerchantFarm>(this.baseApiUrl + 'api/MerchantFarms/UpdateStatus/' + id + ',' + req, id);
  }

  updateWeightMF(id: string, w: number): Observable<MerchantFarm> {
    return this.http.post<MerchantFarm>(this.baseApiUrl + 'api/MerchantFarms/UpdateWeight/' + id + ',' + w, id);
  }

  deleteMerchantFarm(id: string): Observable<MerchantFarm> {
    return this.http.post<MerchantFarm>(this.baseApiUrl + 'api/MerchantFarms/Delete/' + id, id);
  }

  // Vận chuyển cho thương lái

  getAllTransportPtoPs(): Observable<TransportPtoP[]> {
    return this.http.get<TransportPtoP[]>(this.baseApiUrl + "api/TransportPtoPs/GetAll")
  }

  checkPtoPs(id: string) {
    return this.http.get(this.baseApiUrl + "api/TransportPtoPs/check/" + id)
  }

  getAllTransportPtoPbyTransports(id: string, req: string): Observable<TPtoPView[]> {
    return this.http.get<TPtoPView[]>(this.baseApiUrl + "api/TransportPtoPs/GetAllbyTransport/" + id + "," + req)
  }

  addTransportPtoP(addTransportPtoPRequest: TransportPtoP): Observable<TransportPtoP> {
    return this.http.post<TransportPtoP>(this.baseApiUrl + 'api/TransportPtoPs/AddTransportPtoP',
      addTransportPtoPRequest);
  }

  getIdTransportPtoP(id: string): Observable<TransportPtoP> {
    return this.http.get<TransportPtoP>(this.baseApiUrl + 'api/TransportPtoPs/Get/' + id)
  }

  updateTransportPtoP(updateTransportPtoPRequest: TransportPtoP): Observable<TransportPtoP> {
    return this.http.post<TransportPtoP>(this.baseApiUrl + 'api/TransportPtoPs/UpdateTransportPtoP',
      updateTransportPtoPRequest);
  }

  updateStatusPtoP(id: string): Observable<TransportPtoP> {
    return this.http.post<TransportPtoP>(this.baseApiUrl + 'api/TransportPtoPs/UpdateStatus/' + id,
      id);
  }

  deleteTransportPtoP(id: string): Observable<TransportPtoP> {
    return this.http.post<TransportPtoP>(this.baseApiUrl + 'api/TransportPtoPs/Delete/' + id, id);
  }

  // Thông tin đơn giao
  getAllDetailTransportPtoPs(): Observable<DetailTransportPtoP[]> {
    return this.http.get<DetailTransportPtoP[]>(this.baseApiUrl + "api/DetailTransportPtoPs/GetAll")
  }

  addDetailTransportPtoP(addDetailTransportPtoPRequest: DetailTransportPtoP): Observable<DetailTransportPtoP> {
    return this.http.post<DetailTransportPtoP>(this.baseApiUrl + 'api/DetailTransportPtoPs/AddDetailTransportPtoP',
      addDetailTransportPtoPRequest);
  }

  getIdDetailTransportPtoP(id: string): Observable<DetailTransportPtoP> {
    return this.http.get<DetailTransportPtoP>(this.baseApiUrl + 'api/DetailTransportPtoPs/Get/' + id)
  }

  updateDetailTransportPtoP(updateDetailTransportPtoPRequest: DetailTransportPtoP): Observable<DetailTransportPtoP> {
    return this.http.post<DetailTransportPtoP>(this.baseApiUrl + 'api/DetailTransportPtoPs/UpdateDetailTransportPtoP',
      updateDetailTransportPtoPRequest);
  }

  deleteDetailTransportPtoP(id: string): Observable<DetailTransportPtoP> {
    return this.http.post<DetailTransportPtoP>(this.baseApiUrl + 'api/DetailTransportPtoPs/Delete/' + id, id);
  }

  // Yêu cầu cho nông trại
  getAllFarmRequestbyFarms(id: string, req: string, s: string): Observable<FQView[]> {
    return this.http.get<FQView[]>(this.baseApiUrl + "api/FarmRequests/GetAllFarmRequestbyFarm/" + id + ',' + req + "," + s)
  }

  getAllFarmRequestbyPlaces(p: string, req: string, s: string): Observable<FQView[]> {
    return this.http.get<FQView[]>(this.baseApiUrl + "api/FarmRequests/GetAllFarmRequestbyPlace/" + p + ',' + req + "," + s)
  }

  getStatusbyPlace(h: string, m: string): Observable<FarmRequest> {
    return this.http.get<FarmRequest>(this.baseApiUrl + 'api/FarmRequests/GetStatusbyMerchant/' + h + ',' + m)
  }

  addFarmRequest(addFarmRequestRequest: FarmRequest): Observable<FarmRequest> {
    return this.http.post<FarmRequest>(this.baseApiUrl + 'api/FarmRequests/AddFarmRequest',
      addFarmRequestRequest);
  }

  updateStatus(id: string, p: string, req: string): Observable<FarmRequest> {
    return this.http.post<FarmRequest>(this.baseApiUrl + 'api/FarmRequests/updateStatus/' + id + ',' + p + ',' + req,
      id);
  }
  updateStatusBnt(id: string, p: string, req: string): Observable<FarmRequest> {
    return this.http.post<FarmRequest>(this.baseApiUrl + 'api/FarmRequests/updateStatusBtn/' + id + ',' + p + ',' + req,
      id);
  }

  getIdFarmRequest(h: string, p: string, f: string): Observable<FarmRequest> {
    return this.http.get<FarmRequest>(this.baseApiUrl + 'api/FarmRequests/Get/' + h + ',' + p + ',' + f)
  }

  updateFarmRequest(updateFarmRequestRequest: FarmRequest): Observable<FarmRequest> {
    return this.http.post<FarmRequest>(this.baseApiUrl + 'api/FarmRequests/UpdateFarmRequest',
      updateFarmRequestRequest);
  }

  deleteFarmRequest(id: string): Observable<FarmRequest> {
    return this.http.post<FarmRequest>(this.baseApiUrl + 'api/FarmRequests/Delete/' + id, id);
  }

  //Kho lưu trữ của nhà máy
  getAllInventoryFactorys(): Observable<InventoryFactory[]> {
    return this.http.get<InventoryFactory[]>(this.baseApiUrl + "api/InventoryFactories/GetAll")
  }

  getAllInventoryFactorybyFactorys(id: string, req: string): Observable<IVEFactoryView[]> {
    return this.http.get<IVEFactoryView[]>(this.baseApiUrl + "api/InventoryFactories/GetAllbyFactory/" + id + "," + req)
  }

  getAllInventoryFactorybyProducts(id: string): Observable<IVEFactoryView[]> {
    return this.http.get<IVEFactoryView[]>(this.baseApiUrl + "api/InventoryFactories/GetAllbyProduct/" + id)
  }

  addInventoryFactory(addInventoryFactoryRequest: InventoryFactory): Observable<InventoryFactory> {
    return this.http.post<InventoryFactory>(this.baseApiUrl + 'api/InventoryFactories/AddInventoryFactory',
      addInventoryFactoryRequest);
  }

  getIdInventoryFactory(id: string): Observable<InventoryFactory> {
    return this.http.get<InventoryFactory>(this.baseApiUrl + 'api/InventoryFactories/Get/' + id)
  }

  updateInventoryFactory(updateInventoryFactoryRequest: InventoryFactory): Observable<InventoryFactory> {
    return this.http.post<InventoryFactory>(this.baseApiUrl + 'api/InventoryFactories/UpdateInventoryFactory',
      updateInventoryFactoryRequest);
  }

  useIF(id: string, w: number): Observable<InventoryFactory> {
    return this.http.post<InventoryFactory>(this.baseApiUrl + 'api/InventoryFactories/UseIF/' + id + ',' + w,
      id);
  }

  deleteInventoryFactory(id: string): Observable<InventoryFactory> {
    return this.http.post<InventoryFactory>(this.baseApiUrl + 'api/InventoryFactories/Delete/' + id, id);
  }

  //Yêu cầu nhà máy sản xuất 
  getAllFactoryRequestbyFactorys(id: string, req: string, s: string): Observable<FaQView[]> {
    return this.http.get<FaQView[]>(this.baseApiUrl + "api/FactoryRequests/GetAllFactoryRequestbyFactory/" + id + ',' + req + ',' + s)
  }

  getAllFactoryRequestbyPlaces(id: string, req: string, s: string): Observable<FaQView[]> {
    return this.http.get<FaQView[]>(this.baseApiUrl + "api/FactoryRequests/GetAllFactoryRequestbyPlace/" + id + ',' + req + ',' + s)
  }

  getStatusFSbyPlace(h: string, m: string): Observable<FactoryRequest> {
    return this.http.get<FactoryRequest>(this.baseApiUrl + 'api/FactoryRequests/GetStatusbyMerchant/' + h + ',' + m)
  }

  addFactoryRequest(addFactoryRequestRequest: FactoryRequest): Observable<FactoryRequest> {
    return this.http.post<FactoryRequest>(this.baseApiUrl + 'api/FactoryRequests/AddFactoryRequest',
      addFactoryRequestRequest);
  }

  updateFSStatus(id: string, p: string, req: string): Observable<FactoryRequest> {
    return this.http.post<FactoryRequest>(this.baseApiUrl + 'api/FactoryRequests/updateStatus/' + id + ',' + p + ',' + req,
      id);
  }

  updateStatusBntFactory(id: string, p: string, req: string): Observable<FactoryRequest> {
    return this.http.post<FactoryRequest>(this.baseApiUrl + 'api/FactoryRequests/updateStatusBtn/' + id + ',' + p + ',' + req,
      id);
  }

  getIdFactoryRequest(id: string): Observable<FactoryRequest> {
    return this.http.get<FactoryRequest>(this.baseApiUrl + 'api/FactoryRequests/Get/' + id)
  }

  updateFactoryRequest(updateFactoryRequestRequest: FactoryRequest): Observable<FactoryRequest> {
    return this.http.post<FactoryRequest>(this.baseApiUrl + 'api/FactoryRequests/UpdateFactoryRequest',
      updateFactoryRequestRequest);
  }

  deleteFactoryRequest(id: string): Observable<FactoryRequest> {
    return this.http.post<FactoryRequest>(this.baseApiUrl + 'api/FactoryRequests/Delete/' + id, id);
  }
  // Lên đơn cho tất cả
  getAllUpToTransports(): Observable<UpToTransport[]> {
    return this.http.get<UpToTransport[]>(this.baseApiUrl + "api/UpToTransports/GetAll")
  }

  getAllUpToTransportbyTransports(): Observable<UTOView[]> {
    return this.http.get<UTOView[]>(this.baseApiUrl + "api/UpToTransports/GetAllbyTransport")
  }

  getAllUpToTransportbyPlacesView(id: string, req: string): Observable<UTOView[]> {
    return this.http.get<UTOView[]>(this.baseApiUrl + "api/UpToTransports/GetAllbyPlaceView/" + id + ',' + req)
  }

  getAllUpToTransportbyPlacesViewbyFilter(id: string, req: string, s: string): Observable<UTOView[]> {
    return this.http.get<UTOView[]>(this.baseApiUrl + "api/UpToTransports/GetAllbyPlaceViewbyFilter/" + id + ',' + req + ',' + s)
  }

  getAllUpToTransportbyPlaces(id: string): Observable<UpToTransport[]> {
    return this.http.get<UpToTransport[]>(this.baseApiUrl + "api/UpToTransports/GetAllbyPlace/" + id)
  }

  addUpToTransport(addUpToTransportRequest: UpToTransport): Observable<UpToTransport> {
    return this.http.post<UpToTransport>(this.baseApiUrl + 'api/UpToTransports/AddUpToTransport',
      addUpToTransportRequest);
  }

  getIdUpToTransport(id: string): Observable<UpToTransport> {
    return this.http.get<UpToTransport>(this.baseApiUrl + 'api/UpToTransports/Get/' + id)
  }

  updateUpToTransport(updateUpToTransportRequest: UpToTransport): Observable<UpToTransport> {
    return this.http.post<UpToTransport>(this.baseApiUrl + 'api/UpToTransports/UpdateUpToTransport',
      updateUpToTransportRequest);
  }

  updateStatusUTO(id: string, req: string): Observable<UpToTransport> {
    return this.http.post<UpToTransport>(this.baseApiUrl + 'api/UpToTransports/UpdateStatus/' + id + ',' + req,
      id);
  }

  updateAmountUTO(id: string, a: number): Observable<UpToTransport> {
    return this.http.post<UpToTransport>(this.baseApiUrl + 'api/UpToTransports/UpdateAmount/' + id + ',' + a,
      id);
  }

  deleteUpToTransport(id: string): Observable<UpToTransport> {
    return this.http.post<UpToTransport>(this.baseApiUrl + 'api/UpToTransports/Delete/' + id, id);
  }

  //LOAD Chi tiết
  detailProductFull(id: string): Observable<DetailFull[]> {
    return this.http.get<DetailFull[]>(this.baseApiUrl + 'api/Inventorys/detailProductFull/' + id)
  }

  detailProductWTM(id: string): Observable<DetailWTM[]> {
    return this.http.get<DetailWTM[]>(this.baseApiUrl + 'api/Inventorys/detailProductWTM/' + id)
  }

  detailProductLiveFull(id: string): Observable<DetailLiveFull[]> {
    return this.http.get<DetailLiveFull[]>(this.baseApiUrl + 'api/Inventorys/detailProductLiveFull/' + id)
  }

  detailProductLiveWTM(id: string): Observable<DetailLiveWTM[]> {
    return this.http.get<DetailLiveWTM[]>(this.baseApiUrl + 'api/Inventorys/detailProductLiveWTM/' + id)
  }

  //Địa chỉ
  getIdWard(id: number): Observable<Ward> {
    return this.http.get<Ward>(this.baseApiUrl + 'api/Addresses/GetIdWard/' + id)
  }
  getIdDistrict(id: number): Observable<District> {
    return this.http.get<District>(this.baseApiUrl + 'api/Addresses/GetIdDistrict/' + id)
  }
  getIdProvince(id: number): Observable<Province> {
    return this.http.get<Province>(this.baseApiUrl + 'api/Addresses/GetIdProvince/' + id)
  }
  getWard(id: number): Observable<Ward[]> {
    return this.http.get<Ward[]>(this.baseApiUrl + 'api/Addresses/GetWard/' + id)
  }
  getDistrict(id: number): Observable<District[]> {
    return this.http.get<District[]>(this.baseApiUrl + 'api/Addresses/GetDistrict/' + id)
  }
  getProvince(): Observable<Province[]> {
    return this.http.get<Province[]>(this.baseApiUrl + 'api/Addresses/GetProvince')
  }

  //Thông báo
  getIdNotice(id: string): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.baseApiUrl + 'api/Notices/GetIdNotice/' + id)
  }

  addNotice(addNoticeRequest: NoticeData): Observable<NoticeData> {
    return this.http.post<NoticeData>(this.baseApiUrl + 'api/Notices/Add',
      addNoticeRequest);
  }

  addNoticeHarvest(addNoticeRequest: NoticeData): Observable<NoticeData> {
    return this.http.post<NoticeData>(this.baseApiUrl + 'api/Notices/AddNoticeHarvest',
      addNoticeRequest);
  }

  addNoticeFarm(addNoticeRequest: NoticeData): Observable<NoticeData> {
    return this.http.post<NoticeData>(this.baseApiUrl + 'api/Notices/AddNoticeFarm',
      addNoticeRequest);
  }
  addNoticeMerchant(addNoticeRequest: NoticeData): Observable<NoticeData> {
    return this.http.post<NoticeData>(this.baseApiUrl + 'api/Notices/AddNoticeMerchant',
      addNoticeRequest);
  }
  addNoticeFactory(addNoticeRequest: NoticeData): Observable<NoticeData> {
    return this.http.post<NoticeData>(this.baseApiUrl + 'api/Notices/AddNoticeFactory',
      addNoticeRequest);
  }
  addNoticeTransport(addNoticeRequest: NoticeData): Observable<NoticeData> {
    return this.http.post<NoticeData>(this.baseApiUrl + 'api/Notices/AddNoticeTransport',
      addNoticeRequest);
  }
  addNoticeStore(addNoticeRequest: NoticeData): Observable<NoticeData> {
    return this.http.post<NoticeData>(this.baseApiUrl + 'api/Notices/AddNoticeStore',
      addNoticeRequest);
  }

  addNoticeAllTransport(addNoticeRequest: NoticeData): Observable<NoticeData> {
    return this.http.post<NoticeData>(this.baseApiUrl + 'api/Notices/AddNoticeAllTransport',
      addNoticeRequest);
  }

  addNoticeAllStore(addNoticeRequest: NoticeData): Observable<NoticeData> {
    return this.http.post<NoticeData>(this.baseApiUrl + 'api/Notices/AddNoticeAllStore',
      addNoticeRequest);
  }

  getAllSendId(id: string, req: string): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.baseApiUrl + 'api/Notices/GetAllSendId/' + id + "," + req)
  }

  getAllReceiveId(id: string, req: string): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.baseApiUrl + 'api/Notices/GetAllReceiveId/' + id + "," + req)
  }

  getAllSendIdRequest(id: string, req: string): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.baseApiUrl + 'api/Notices/GetAllSendIdRequest/' + id + ',' + req)
  }

  getAllReceiveIdRequest(id: string, req: string): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.baseApiUrl + 'api/Notices/GetAllReceiveIdRequest/' + id + ',' + req)
  }

  updateStatusNT(id: string, req: string): Observable<Notice> {
    return this.http.post<Notice>(this.baseApiUrl + 'api/Notices/UpdateStatus/' + id + ',' + req, id)
  }

  //QR Code
  generateFile(qrText: string, id: string) {
    return this.http.get(this.baseApiUrl + 'api/Photos/GenerateFile/' + qrText + ',' + id)
  }

  bitmaptoFile(file: string) {
    return this.http.get(this.baseApiUrl + 'api/Photos/BitmapToImage/' + file)
  }

  readFile(id: string) {
    return this.http.get(this.baseApiUrl + 'api/Photos/ReadFile/' + id)
  }

  //Khách hàng
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseApiUrl + "api/Customers/GetAll")
  }

  addCustomer(addCustomerRequest: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseApiUrl + 'api/Customers/Add',
      addCustomerRequest);
  }

  getIdCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(this.baseApiUrl + 'api/Customers/Get/' + id)
  }

  updateCustomer(updateCustomerRequest: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseApiUrl + 'api/Customers/Update',
      updateCustomerRequest);
  }

  deleteCustomer(id: string): Observable<Customer> {
    return this.http.post<Customer>(this.baseApiUrl + 'api/Customers/Delete/' + id, id);
  }

  // Đăng nhập khách hàng
  loginCustomer(user: string, password: string): Observable<Customer> {
    return this.http.get<Customer>(this.baseApiUrl + 'api/Customers/check/' + user + ',' + password);
  }

  //Hóa đơn bán hàng
  getIdDetailOrder(id: string): Observable<DetailOrder> {
    return this.http.get<DetailOrder>(this.baseApiUrl + 'api/Orders/GetIdDetail/' + id)
  }

  getIdOrderBill(id: string): Observable<OrderBill> {
    return this.http.get<OrderBill>(this.baseApiUrl + 'api/Orders/GetIdOrder/' + id)
  }

  addDetailOrder(addDetailOrderRequest: DetailOrder): Observable<DetailOrder> {
    return this.http.post<DetailOrder>(this.baseApiUrl + 'api/Orders/AddDetail',
      addDetailOrderRequest);
  }

  addOrderBill(addOrderBillRequest: OrderBill): Observable<OrderBill> {
    return this.http.post<OrderBill>(this.baseApiUrl + 'api/Orders/Add',
      addOrderBillRequest);
  }

  deleteOrder(id: string) {
    return this.http.post(this.baseApiUrl + "api/Orders/remove/" + id, id)
  }

  //Filter
  getFactorysFilter(req: string): Observable<FactoryView[]> {
    return this.http.get<FactoryView[]>(this.baseApiUrl + "api/Factorys/GetFactoriesbyFilter/" + req)
  }

  getMerchantFilter(req: string): Observable<MerchantView[]> {
    return this.http.get<MerchantView[]>(this.baseApiUrl + "api/Merchants/GetMerchantsbyFilter/" + req)
  }

  getTransportsFilter(req: string): Observable<TransportView[]> {
    return this.http.get<TransportView[]>(this.baseApiUrl + "api/Transports/GetTransportsbyFilter/" + req)
  }

  getStoresFilter(req: string): Observable<Store[]> {
    return this.http.get<Store[]>(this.baseApiUrl + "api/Stores/GetStoresbyFilter/" + req)
  }

  getPersonsFilter(req: string): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseApiUrl + "api/Persons/GetPersonsbyFilter/" + req)
  }

  getUsersFilter(req: string): Observable<UserView[]> {
    return this.http.get<UserView[]>(this.baseApiUrl + "api/Users/GetUsersbyFilter/" + req)
  }

  getFruitsFilter(id: string, req: string): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(this.baseApiUrl + "api/Fruits/GetFruitsbyFilter/" + id + "," + req)
  }

  getTypeProductsFilter(id: string, req: string): Observable<TypeProduct[]> {
    return this.http.get<TypeProduct[]>(this.baseApiUrl + "api/TypeProducts/GetTypeProductsbyFilter/" + id + "," + req)
  }

  getFruitHarvestsFilter(id: string, req: string): Observable<FHView[]> {
    return this.http.get<FHView[]>(this.baseApiUrl + "api/FruitHarvests/GetFruitHarvestsbyFilter/" + id + "," + req)
  }

  //Công nghệ Blochain
  getAllBlockchainFilter(req: string): Observable<Block[]>{
    return this.http.get<Block[]>(this.baseApiUrl + "api/Blockchains/GetAllFilter/"+ req)
  }
}
