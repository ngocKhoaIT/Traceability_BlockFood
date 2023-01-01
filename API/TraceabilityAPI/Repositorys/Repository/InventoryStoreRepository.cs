using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.Security.Cryptography.X509Certificates;
using TraceabilityAPI.Models;
using TraceabilityAPI.Models.ModelViews;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class InventoryStoreRepository : BaseRepository<InventoryStore>, IInventoryStore
    { 
        protected DataDbContext context;

        public InventoryStoreRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.Inventories.Where(t => t.id == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public void updateStatus(string id)
        {
            var result = context.Inventories.Where(t => t.id == id).SingleOrDefault();
            if (result != null)
            {
                result.date_update = DateTime.Now;
                result.status_request = "Đã bán";
                context.Update(result);
            }
        }

        public JsonResult getAllListInventoryStore(string id, string req, string searchString)
        {
            var istore = context.Inventories.Where(t => t._status == 1 && t.status_request == req && t.storeId == id);
            var store = context.Stores.Where(t => t._status == 1);
            var product = context.Products.Where(t => t._status == 1);
            var harvest = context.FruitHarvests.Where(t => t._status == 1);
            var fruit = context.Fruits.Where(t => t._status == 1);
            var factory = context.Factorys.Where(t => t._status == 1);
            var farm = context.Farms.Where(t => t._status == 1);

            var a = istore.Join(store, t1 => t1.storeId, t2 => t2.storeId,
                                (t1, t2) => new
                                {
                                    id = t1.id,
                                    storeId = t1.storeId,
                                    storeName = t2.storeName,
                                    addressStore = t2.addressStore,
                                    goodsId = t1.goodsId,
                                    amount = t1.amount,
                                    unit = t1.unit,
                                    imageQR = t1.imageQR,
                                    date = t1.date_create
                                });

            var b = harvest.Join(fruit, t1 => t1.fruitId, t2 => t2.fruitId,
                                    (t1, t2) => new
                                    {
                                        harvestId = t1.harvestId,
                                        fruitId = t1.fruitId,
                                        fruitName = t2.fruitName,
                                    });

            List<IL> ils = new List<IL>();

            foreach (var i in a)
            {
                if (i.goodsId.StartsWith("TH"))
                {
                    var name = context.FruitHarvests.Where(t => t.harvestId == i.goodsId).SingleOrDefault();
                    var fname = context.Fruits.Where(t => t.fruitId == name.fruitId).SingleOrDefault();

                    IL iL = new IL
                    {
                        id = i.id,
                        storeId = i.storeId,
                        storeName = i.storeName,
                        addressStore = i.addressStore,
                        goodsId = i.goodsId,
                        goodsName = fname.fruitName,
                        amount = i.amount,
                        unit = i.unit,
                        imageQR = i.imageQR,
                        date = i.date
                    };
                    ils.Add(iL);
                }
                else
                {
                    var name = context.Products.Where(t => t.productId == i.goodsId).SingleOrDefault();

                    IL iL = new IL
                    {
                        id = i.id,
                        storeId = i.storeId,
                        storeName = i.storeName,
                        addressStore = i.addressStore,
                        goodsId = i.goodsId,
                        goodsName = name.productName,
                        amount = i.amount,
                        unit = i.unit,
                        imageQR = i.imageQR,
                        date = i.date
                    };
                    ils.Add(iL);
                }
            }

            var search = searchString.Split("_");

            search[0] = search[0].Trim();

            if (search[0] == "Today")
            {
                return new JsonResult(ils.Where(t => t.date.Date == DateTime.Now.Date && t.goodsId.StartsWith(search[1])).ToList());
            }
            else if (search[0] == "Last 7 Day")
            {
                var c = DateTime.Now.Date.AddDays(-7);
                return new JsonResult(ils.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= c && t.goodsId.StartsWith(search[1])).ToList());
            }
            else if (search[0] == "Last Month")
            {
                var c = DateTime.Now.Date.AddMonths(-1);
                return new JsonResult(ils.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= c && t.goodsId.StartsWith(search[1])).ToList());
            }
            else if (search[0] == "Last 12 Months")
            {
                var c = DateTime.Now.Date.AddYears(-1);
                return new JsonResult(ils.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= c && t.goodsId.StartsWith(search[1])).ToList());
            }
            else
            {
                return new JsonResult(ils.Where(t => t.goodsId.StartsWith(search[1])).ToList());
            }

            return new JsonResult(ils);
        }

        public IEnumerable<InventoryStore> getAllInventory()
        {
            return context.Inventories.Where(t => t._status == 1).ToList();
        }

        public JsonResult getAllInventorybyReceived(string id,string req)
        {
            var istore = context.Inventories.Where(t =>t._status == 1).ToList();
            var store = context.Stores.Where(t => t._status == 1).ToList();
            var product = context.Products.Where(t => t._status == 1).ToList();
            var harvest = context.FruitHarvests.Where(t => t._status == 1).ToList();
            var fruit = context.Fruits.Where(t => t._status == 1).ToList();

            var a = istore.Join(store, t1 => t1.storeId, t2 => t2.storeId,
                                (t1, t2) => new
                                {
                                    id = t1.id,
                                    storeId = t1.storeId,
                                    storeName = t2.storeName,
                                    addressStore = t2.addressStore,
                                    goodsId = t1.goodsId,
                                    amount = t1.amount,
                                    unit = t1.unit,
                                    imageQR = t1.imageQR,
                                });

            var b = harvest.Join(fruit, t1 => t1.fruitId, t2 => t2.fruitId,
                                    (t1, t2) => new
                                    {
                                        harvestId = t1.harvestId,
                                        fruitId = t1.fruitId,
                                        fruitName = t2.fruitName,
                                    });

            List<IL> ils = new List<IL>();

            foreach (var i in a)
            {
                if (i.goodsId.StartsWith("TH"))
                {
                    var name = context.FruitHarvests.Where(t => t.harvestId == i.goodsId).SingleOrDefault();
                    var fname = context.Fruits.Where(t => t.fruitId == name.fruitId).SingleOrDefault();

                    IL iL = new IL {
                        id = i.id,
                        storeId = i.storeId,
                        storeName = i.storeName,
                        addressStore = i.addressStore,
                        goodsId = i.goodsId,
                        goodsName = fname.fruitName,
                        amount = i.amount,
                        unit = i.unit,
                        imageQR = i.imageQR,
                    };
                    ils.Add(iL);
                }
                else
                {
                    var name = context.Products.Where(t => t.productId == i.goodsId).SingleOrDefault();

                    IL iL = new IL
                    {
                        id = i.id,
                        storeId = i.storeId,
                        storeName = i.storeName,
                        addressStore = i.addressStore,
                        goodsId = i.goodsId,
                        goodsName = name.productName,
                        amount = i.amount,
                        unit = i.unit,
                        imageQR = i.imageQR,
                    };
                    ils.Add(iL);
                }    
            }

            List<IL> result = ils.GroupBy(t => t.goodsName)
                            .Select(t1 => new IL
                            {
                                id = t1.First().id,
                                storeId = t1.First().storeId,
                                storeName = t1.First().storeName,
                                addressStore = t1.First().addressStore,
                                goodsId = t1.First().goodsId,
                                goodsName = t1.First().goodsName,
                                amount = t1.Sum(t1 => t1.amount),
                                unit = t1.First().unit,
                                imageQR = t1.First().imageQR,
                            }).ToList();

            if(id != "_")
            {
                return new JsonResult(result.Where(t => t.goodsName == req && t.storeId == id));
            }
            else return new JsonResult(result.Where(t => t.goodsName == req));
        }

        public JsonResult getAllInventorybyReceivedbyStores(string id)
        {
            var istore = context.Inventories.Where(t => t._status == 1 && t.status_request == "Đã nhận" && t.storeId==id);
            var store = context.Stores.Where(t => t._status == 1);
            var product = context.Products.Where(t => t._status == 1);
            var harvest = context.FruitHarvests.Where(t => t._status == 1);
            var fruit = context.Fruits.Where(t => t._status == 1);

            var a = istore.Join(store, t1 => t1.storeId, t2 => t2.storeId,
                                (t1, t2) => new 
                                {
                                    id = t1.id,
                                    storeId = t1.storeId,
                                    storeName = t2.storeName,
                                    addressStore = t2.addressStore,
                                    goodsId = t1.goodsId,
                                    amount = t1.amount,
                                    unit = t1.unit,
                                    imageQR = t1.imageQR,
                                }).ToList();

            var b = harvest.Join(fruit, t1 => t1.fruitId, t2 => t2.fruitId,
                                    (t1, t2) => new
                                    {
                                        harvestId = t1.harvestId,
                                        fruitId = t1.fruitId,
                                        fruitName = t2.fruitName,
                                    });

            List<IL> ils = new List<IL>();

            foreach (var i in a)
            {
                if (i.goodsId.StartsWith("TH"))
                {
                    var name = context.FruitHarvests.Where(t => t.harvestId == i.goodsId).FirstOrDefault();
                    var fname = context.Fruits.Where(t => t.fruitId == name.fruitId).FirstOrDefault();

                    IL iL = new IL
                    {
                        id = i.id,
                        storeId = i.storeId,
                        storeName = i.storeName,
                        addressStore = i.addressStore,
                        goodsId = i.goodsId,
                        goodsName = fname.fruitName,
                        amount = i.amount,
                        unit = i.unit,
                        imageQR = i.imageQR,
                    };
                    ils.Add(iL);
                }
                else
                {
                    var name = context.Products.Where(t => t.productId == i.goodsId).SingleOrDefault();

                    IL iL = new IL
                    {
                        id = i.id,
                        storeId = i.storeId,
                        storeName = i.storeName,
                        addressStore = i.addressStore,
                        goodsId = i.goodsId,
                        goodsName = name.productName,
                        amount = i.amount,
                        unit = i.unit,
                        imageQR = i.imageQR,
                    };
                    ils.Add(iL);
                }
            }

            List<IL> result = ils.GroupBy(t => t.goodsName)
                            .Select(t1 => new IL
                            {
                                id = t1.First().id,
                                storeId = t1.First().storeId,
                                storeName = t1.First().storeName,
                                addressStore = t1.First().addressStore,
                                goodsId = t1.First().goodsId,
                                goodsName = t1.First().goodsName,
                                amount = t1.Sum(t1 => t1.amount),
                                unit = t1.First().unit,
                                imageQR = t1.First().imageQR,
                            }).ToList();

            return new JsonResult(result.OrderBy(t => t.goodsName));
        }

        public JsonResult getAllInventoryStorebyStore(string id)
        {
            var iveStore = context.Inventories.Where(t => t._status == 1);
            var factory = context.Factorys.Where(t => t._status == 1);
            var product = context.Products.Where(t => t._status == 1);
            var store = context.Stores.Where(t => t._status == 1 && t.storeId == id);

            var factorylist = product.Join(factory, f1 => f1.factoryId,
                                        f2 => f2.factoryId, (f1, f2) => new
                                        {
                                            productName = f1.productName,
                                            productId = f1.productId,
                                            factoryId = f1.factoryId,
                                            factoryName = f2.factoryName,
                                            addressFactory = f2.addressFactory,
                                        });

            var iveharvest = factorylist.Join(iveStore, f1 => f1.productId, f2 => f2.goodsId,
                                            (f1, f2) => new {
                                                id = f2.id,
                                                productName = f1.productName,
                                                productId = f1.productId,
                                                factoryId = f1.factoryId,
                                                factoryName = f1.factoryName,
                                                addressFactory = f1.addressFactory,
                                                storeId = f2.storeId,
                                                amount = f2.amount,
                                                unit = f2.unit,
                                                date = f2.date_create,
                                            });

            var storelist = iveharvest.Join(store, f1 => f1.storeId, f2 => f2.storeId,
                                                (f1, f2) => new
                                                {
                                                    id = f1.id,
                                                    productName = f1.productName,
                                                    productId = f1.productId,
                                                    factoryId = f1.factoryId,
                                                    factoryName = f1.factoryName,
                                                    addressFactory = f1.addressFactory,
                                                    storeId = f1.storeId,
                                                    storeName = f2.storeName,
                                                    addressStore = f2.addressStore,
                                                    amount = f1.amount,
                                                    unit = f1.unit,
                                                    date = f1.date,
                                                });

            return new JsonResult(storelist.OrderByDescending(t => t.date));
        }

        public InventoryStore checkId(string id)
        {
            var a = context.Inventories.Where(t => t._status == 1 && t.id == id).Count();
            if(a > 0)
            {
                return context.Inventories.Where(t => t._status == 1 && t.id == id).SingleOrDefault();
            }
            return new InventoryStore { 
                id = null,
                amount = 0,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
                goodsId = null,
                storeId = null,
                unit = null ,
                _status = 0,
            };
        }

        public JsonResult detailProductFull(string id)
        {
            var istore = context.Inventories.Where(t=>t.id == id && t._status == 1).ToList();
            var store = context.Stores.Where(t=>t._status== 1).ToList();
            var ifactory = context.InventoryFactories.Where(t=>t._status== 1).ToList();
            var product = context.Products.Where(t=>t._status== 1).ToList();
            var harvest = context.FruitHarvests.Where(t => t._status == 1).ToList();
            var transport = context.Transports.Where(t=>t._status == 1).ToList();
            var farm = context.Farms.Where(t=>t._status==1).ToList();
            var fruit = context.Fruits.Where(t=>t._status== 1).ToList();
            var factory = context.Factorys.Where(t=>t._status== 1).ToList();
            var UTO = context.UpToTransports.Where(t => t._status == 1).ToList();
            var merchant = context.Merchants.Where(t => t._status == 1).ToList();
            var mcf = context.MerchantFarms.Where(t=> t._status== 1).ToList();
            var detailT = context.DetailTransportPtoPs.ToList();
            var PtoP = context.TransportPtoPs.ToList(); 

            var a = store.Join(istore, i1 => i1.storeId,
                                i2 => i2.storeId, (i1, i2) => new
                                {
                                    id = i2.id,
                                    productId = i2.goodsId,
                                    storeId = i1.storeId,
                                    storeName = i1.storeName,
                                    storePhone = i1.phoneNumber,
                                    storeEmail = i1.email,
                                    addressStore = i1.addressStore,
                                    imageQR = i2.imageQR,
                                });
            var b = a.Join(product, p1 => p1.productId
                                    , p2 => p2.productId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        productId = p1.productId,
                                        productName = p2.productName,
                                        factoryId = p2.factoryId,
                                        harvestId = p2.harvestId,
                                        mfg_date = p2.mfg_date,
                                        exp_date = p2.exp_date,
                                        net_weight = p2.net_weight,
                                        procedureOfProduct = p2.procedureOfProduct,
                                        elementOfProduct = p2.elementOfProduct,
                                        tfactory = p2.temperature,
                                        hfactory = p2.humidity,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        imageProduct = p2.imageProduct,
                                        imageQR = p1.imageQR,
                                    });

            

            var c = b.Join(ifactory, p1 => p1.harvestId,
                                     p2 => p2.id, (p1, p2) => new
                                     {
                                         id = p1.id,
                                         productId = p1.productId,
                                         productName = p1.productName,
                                         factoryId = p1.factoryId,
                                         ifId = p2.id,
                                         harvestId = p2.harvestId,
                                         mfg_date = p1.mfg_date,
                                         exp_date = p1.exp_date,
                                         net_weight = p1.net_weight,
                                         procedureOfProduct = p1.procedureOfProduct,
                                         elementOfProduct = p1.elementOfProduct,
                                         tfactory = p1.tfactory,
                                         hfactory = p1.hfactory,
                                         storeId = p1.storeId,
                                         storeName = p1.storeName,
                                         storePhone = p1.storePhone,
                                         storeEmail = p1.storeEmail,
                                         addressStore = p1.addressStore,
                                         imageProduct = p1.imageProduct,
                                         imageQR = p1.imageQR,
                                         checkM = p2.checkM,
                                     });

            var d = c.Join(factory, p1 => p1.factoryId
                                , p2 => p2.factoryId, (p1, p2) => new
                                {
                                    id = p1.id,
                                    productId = p1.productId,
                                    productName = p1.productName,
                                    factoryId = p1.factoryId,
                                    factoryName = p2.factoryName,
                                    factoryEmail = p2.email,
                                    addressFactory = p2.addressFactory,
                                    ifId = p1.ifId,
                                    harvestId = p1.harvestId,
                                    mfg_date = p1.mfg_date,
                                    exp_date = p1.exp_date,
                                    net_weight = p1.net_weight,
                                    procedureOfProduct = p1.procedureOfProduct,
                                    elementOfProduct = p1.elementOfProduct,
                                    tfactory = p1.tfactory,
                                    hfactory = p1.hfactory,
                                    storeId = p1.storeId,
                                    storeName = p1.storeName,
                                    storePhone = p1.storePhone,
                                    storeEmail = p1.storeEmail,
                                    addressStore = p1.addressStore,
                                    imageProduct = p1.imageProduct,
                                    imageQR = p1.imageQR,
                                    checkM = p1.checkM,
                                });

            var e = d.Join(harvest, p1 => p1.harvestId
                                    , p2 => p2.harvestId, (p1,p2) => new
                                    {
                                        id = p1.id,
                                        productId = p1.productId,
                                        productName = p1.productName,
                                        factoryId = p1.factoryId,
                                        factoryName = p1.factoryName,
                                        factoryEmail = p1.factoryEmail,
                                        addressFactory = p1.addressFactory,
                                        ifId = p1.ifId,
                                        harvestId = p1.harvestId,
                                        date_harvest = p2.date_harvest,
                                        mfg_date = p1.mfg_date,
                                        exp_date = p1.exp_date,
                                        net_weight = p1.net_weight,
                                        procedureOfProduct = p1.procedureOfProduct,
                                        elementOfProduct = p1.elementOfProduct,
                                        tfactory = p1.tfactory,
                                        hfactory = p1.hfactory,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        fruitId = p2.fruitId,
                                        imageProduct = p1.imageProduct,
                                        imageQR = p1.imageQR,
                                        checkM = p1.checkM,
                                        imageFH = p2.imageFH,
                                    });

            var g = e.Join(fruit, p1 => p1.fruitId
                                    , p2 => p2.fruitId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        productId = p1.productId,
                                        productName = p1.productName,
                                        factoryId = p1.factoryId,
                                        factoryName = p1.factoryName,
                                        factoryEmail = p1.factoryEmail,
                                        addressFactory = p1.addressFactory,
                                        ifId = p1.ifId,
                                        harvestId = p1.harvestId,
                                        date_harvest = p1.date_harvest,
                                        mfg_date = p1.mfg_date,
                                        exp_date = p1.exp_date,
                                        net_weight = p1.net_weight,
                                        procedureOfProduct = p1.procedureOfProduct,
                                        elementOfProduct = p1.elementOfProduct,
                                        tfactory = p1.tfactory,
                                        hfactory = p1.hfactory,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        fruitId = p1.fruitId,
                                        fruitName = p2.fruitName,
                                        technology = p2.technology,
                                        land = p2.land,
                                        fertilizer = p2.fertilizer,
                                        pesticides = p2.pesticides,
                                        date_plant = p2.date_plant,
                                        farmId = p2.farmId,
                                        imageProduct = p1.imageProduct,
                                        imageQR = p1.imageQR,
                                        checkM = p1.checkM,
                                        imageFH = p1.imageFH,
                                    });

            var i = g.Join(farm, p1 => p1.farmId
                                    , p2 => p2.farmId, (p1, p2) => new
                                    {
                                         id = p1.id,
                                         productId = p1.productId,
                                         productName = p1.productName,
                                         factoryId = p1.factoryId,
                                         factoryName = p1.factoryName,
                                         factoryEmail = p1.factoryEmail,
                                         addressFactory = p1.addressFactory,
                                         ifId = p1.ifId,
                                         harvestId = p1.harvestId,
                                         date_harvest = p1.date_harvest,
                                         mfg_date = p1.mfg_date,
                                         exp_date = p1.exp_date,
                                         net_weight = p1.net_weight,
                                         procedureOfProduct = p1.procedureOfProduct,
                                         elementOfProduct = p1.elementOfProduct,
                                         tfactory = p1.tfactory,
                                         hfactory = p1.hfactory,
                                         storeId = p1.storeId,
                                         storeName = p1.storeName,
                                         storePhone = p1.storePhone,
                                         storeEmail = p1.storeEmail,
                                         addressStore = p1.addressStore,
                                         fruitId = p1.fruitId,
                                         fruitName = p1.fruitName,
                                         technology = p1.technology,
                                         land = p1.land,
                                         fertilizer = p1.fertilizer,
                                         pesticides = p1.pesticides,
                                         date_plant = p1.date_plant,
                                         farmId = p1.farmId,
                                         farmName = p2.farmName,
                                         addressFarm = p2.addressFarm,
                                        imageProduct = p1.imageProduct,
                                        imageQR = p1.imageQR,
                                        checkM = p1.checkM,
                                        imageFH = p1.imageFH,
                                    });

            var j = detailT.Join(PtoP, p1 => p1.billId
                                    , p2 => p2.billId, (p1, p2) => new
                                    {
                                        billId = p1.billId,
                                        itemBill = p1.itemBillId,
                                        placeId = p2.placeId,
                                        transportId = p2.transportId,
                                        tTransport = p2.temperature,
                                        hTransport = p2.humidity,
                                    });

            var k = j.Join(transport, p1 => p1.transportId,
                                     p2 => p2.transportId, (p1, p2) => new {
                                         billId = p1.billId,
                                         itemBill = p1.itemBill,
                                         placeId = p1.placeId,
                                         transportId = p1.transportId,
                                         transportName = p2.transportName,
                                         emailTransport = p2.email,
                                         addressTransport = p2.addressTransport,
                                         tTransport = p1.tTransport,
                                         hTransport = p1.hTransport,
                                     });

            var l = k.Join(UTO, p1 => p1.itemBill,
                                     p2 => p2.billId, (p1, p2) => new {
                                         billId = p1.billId,
                                         itemBill = p1.itemBill,
                                         placeId = p1.placeId,
                                         transportId = p1.transportId,
                                         transportName = p1.transportName,
                                         emailTransport = p1.emailTransport,
                                         addressTransport = p1.addressTransport,
                                         tTransportUTO = p1.tTransport,
                                         hTransportUTO = p1.hTransport,
                                         placeUTO = p2.placeId,
                                         goodsUTO = p2.goodsId,
                                         toPlaceUTO = p2.toPlace,
                                     });

            var m = k.Join(mcf, p1 => p1.itemBill,
                                     p2 => p2.billId, (p1, p2) => new {
                                         billId = p1.billId,
                                         itemBill = p1.itemBill,
                                         placeId = p1.placeId,
                                         transportId = p1.transportId,
                                         transportName = p1.transportName,
                                         emailTransport = p1.emailTransport,
                                         addressTransport = p1.addressTransport,
                                         tTransportMF = p1.tTransport,
                                         hTransportMF = p1.hTransport,
                                         placeMF = p2.farmId,
                                         goodsMF = p2.harvestId,
                                         toPlaceMF = p2.toPlace,
                                         merchantId = p2.merchantId,
                                     });

            var n = i.Join(l, p1 => p1.productId + p1.storeId + p1.factoryId, p2 => p2.goodsUTO + p2.toPlaceUTO + p2.placeUTO,
                                            (p1, p2) => new
                                            {
                                                id = p1.id,
                                                productId = p1.productId,
                                                productName = p1.productName,
                                                factoryId = p1.factoryId,
                                                factoryName = p1.factoryName,
                                                factoryEmail = p1.factoryEmail,
                                                addressFactory = p1.addressFactory,
                                                ifId = p1.ifId,
                                                harvestId = p1.harvestId,
                                                date_harvest = p1.date_harvest,
                                                mfg_date = p1.mfg_date,
                                                exp_date = p1.exp_date,
                                                net_weight = p1.net_weight,
                                                procedureOfProduct = p1.procedureOfProduct,
                                                elementOfProduct = p1.elementOfProduct,
                                                tfactory = p1.tfactory,
                                                hfactory = p1.hfactory,
                                                storeId = p1.storeId,
                                                storeName = p1.storeName,
                                                storePhone = p1.storePhone,
                                                storeEmail = p1.storeEmail,
                                                addressStore = p1.addressStore,
                                                fruitId = p1.fruitId,
                                                fruitName = p1.fruitName,
                                                technology = p1.technology,
                                                land = p1.land,
                                                fertilizer = p1.fertilizer,
                                                pesticides = p1.pesticides,
                                                date_plant = p1.date_plant,
                                                farmId = p1.farmId,
                                                farmName = p1.farmName,
                                                addressFarm = p1.addressFarm,
                                                billId1 = p2.billId,
                                                itemBill1 = p2.itemBill,
                                                placeId1 = p2.placeId,
                                                transportId1 = p2.transportId,
                                                transportName1 = p2.transportName,
                                                emailTransport1 = p2.emailTransport,
                                                addressTransport1 = p2.addressTransport,
                                                tTransportUTO = p2.tTransportUTO,
                                                hTransportUTO = p2.hTransportUTO,
                                                placeUTO = p2.placeUTO,
                                                goodsUTO = p2.goodsUTO,
                                                toPlaceUTO = p2.toPlaceUTO,
                                                imageProduct = p1.imageProduct,
                                                imageQR = p1.imageQR,
                                                checkM = p1.checkM,
                                                imageFH = p1.imageFH,
                                            });

            var o = n.Join(m, p1 => p1.harvestId + p1.factoryId + p1.farmId, p2 => p2.goodsMF + p2.toPlaceMF + p2.placeMF,
                                            (p1, p2) => new
                                            {
                                                id = p1.id,
                                                productId = p1.productId,
                                                productName = p1.productName,
                                                factoryId = p1.factoryId,
                                                factoryName = p1.factoryName,
                                                factoryEmail = p1.factoryEmail,
                                                addressFactory = p1.addressFactory,
                                                ifId = p1.ifId,
                                                harvestId = p1.harvestId,
                                                date_harvest = p1.date_harvest,
                                                mfg_date = p1.mfg_date,
                                                exp_date = p1.exp_date,
                                                net_weight = p1.net_weight,
                                                procedureOfProduct = p1.procedureOfProduct,
                                                elementOfProduct = p1.elementOfProduct,
                                                tfactory = p1.tfactory,
                                                hfactory = p1.hfactory,
                                                storeId = p1.storeId,
                                                storeName = p1.storeName,
                                                storePhone = p1.storePhone,
                                                storeEmail = p1.storeEmail,
                                                addressStore = p1.addressStore,
                                                fruitId = p1.fruitId,
                                                fruitName = p1.fruitName,
                                                technology = p1.technology,
                                                land = p1.land,
                                                fertilizer = p1.fertilizer,
                                                pesticides = p1.pesticides,
                                                date_plant = p1.date_plant,
                                                farmId = p1.farmId,
                                                farmName = p1.farmName,
                                                addressFarm = p1.addressFarm,
                                                billId1 = p1.billId1,
                                                itemBill1 = p1.itemBill1,
                                                placeId1 = p1.placeId1,
                                                transportId1 = p1.transportId1,
                                                transportName1 = p1.transportName1,
                                                emailTransport1 = p1.emailTransport1,
                                                addressTransport1 = p1.addressTransport1,
                                                tTransportUTO = p1.tTransportUTO,
                                                hTransportUTO = p1.hTransportUTO,
                                                placeUTO = p1.placeUTO,
                                                goodsUTO = p1.goodsUTO,
                                                toPlaceUTO = p1.toPlaceUTO,
                                                billId2 = p2.billId,
                                                itemBill2 = p2.itemBill,
                                                placeId2 = p2.placeId,
                                                transportId2 = p2.transportId,
                                                transportName2 = p2.transportName,
                                                emailTransport2 = p2.emailTransport,
                                                addressTransport2 = p2.addressTransport,
                                                tTransportMF = p2.tTransportMF,
                                                hTransportMF = p2.hTransportMF,
                                                placeMF = p2.placeMF,
                                                goodsMF = p2.goodsMF,
                                                toPlaceMF = p2.toPlaceMF,
                                                merchantId = p2.merchantId,
                                                imageProduct = p1.imageProduct,
                                                imageQR = p1.imageQR,
                                                checkM = p1.checkM,
                                                imageFH = p1.imageFH,
                                            });

            var q = o.Join(merchant, p1 => p1.merchantId, p2 => p2.merchantId,
                                           (p1, p2) => new {
                                               id = p1.id,
                                               productId = p1.productId,
                                               productName = p1.productName,
                                               factoryId = p1.factoryId,
                                               factoryName = p1.factoryName,
                                               factoryEmail = p1.factoryEmail,
                                               addressFactory = p1.addressFactory,
                                               ifId = p1.ifId,
                                               harvestId = p1.harvestId,
                                               date_harvest = p1.date_harvest,
                                               mfg_date = p1.mfg_date,
                                               exp_date = p1.exp_date,
                                               net_weight = p1.net_weight,
                                               procedureOfProduct = p1.procedureOfProduct,
                                               elementOfProduct = p1.elementOfProduct,
                                               tfactory = p1.tfactory,
                                               hfactory = p1.hfactory,
                                               storeId = p1.storeId,
                                               storeName = p1.storeName,
                                               storePhone = p1.storePhone,
                                               storeEmail = p1.storeEmail,
                                               addressStore = p1.addressStore,
                                               fruitId = p1.fruitId,
                                               fruitName = p1.fruitName,
                                               technology = p1.technology,
                                               land = p1.land,
                                               fertilizer = p1.fertilizer,
                                               pesticides = p1.pesticides,
                                               date_plant = p1.date_plant,
                                               farmId = p1.farmId,
                                               farmName = p1.farmName,
                                               addressFarm = p1.addressFarm,
                                               billId1 = p1.billId1,
                                               itemBill1 = p1.itemBill1,
                                               placeId1 = p1.placeId1,
                                               transportId1 = p1.transportId1,
                                               transportName1 = p1.transportName1,
                                               emailTransport1 = p1.emailTransport1,
                                               addressTransport1 = p1.addressTransport1,
                                               tTransportUTO = p1.tTransportUTO,
                                               hTransportUTO = p1.hTransportUTO,
                                               placeUTO = p1.placeUTO,
                                               goodsUTO = p1.goodsUTO,
                                               toPlaceUTO = p1.toPlaceUTO,
                                               billId2 = p1.billId2,
                                               itemBill2 = p1.itemBill2,
                                               placeId2 = p1.placeId2,
                                               transportId2 = p1.transportId2,
                                               transportName2 = p1.transportName2,
                                               emailTransport2 = p1.emailTransport2,
                                               addressTransport2 = p1.addressTransport2,
                                               tTransportMF = p1.tTransportMF,
                                               hTransportMF = p1.hTransportMF,
                                               placeMF = p1.placeMF,
                                               goodsMF = p1.goodsMF,
                                               toPlaceMF = p1.toPlaceMF,
                                               merchantId = p1.merchantId,
                                               merchantName = p2.merchantName,
                                               addressMerchant = p2.addressMerchant,
                                               imageProduct = p1.imageProduct,
                                               imageQR = p1.imageQR,
                                               checkM = p1.checkM,
                                               imageFH = p1.imageFH,
                                           });

            return new JsonResult(q);
        }

        public JsonResult detailProductWTM(string id)
        {
            var istore = context.Inventories.Where(t => t.id == id && t._status == 1).ToList();
            var store = context.Stores.Where(t => t._status == 1).ToList();
            var ifactory = context.InventoryFactories.Where(t => t._status == 1).ToList();
            var product = context.Products.Where(t => t._status == 1).ToList();
            var harvest = context.FruitHarvests.Where(t => t._status == 1).ToList();
            var transport = context.Transports.Where(t => t._status == 1).ToList();
            var farm = context.Farms.Where(t => t._status == 1).ToList();
            var fruit = context.Fruits.Where(t => t._status == 1).ToList();
            var factory = context.Factorys.Where(t => t._status == 1).ToList();
            var UTO = context.UpToTransports.Where(t => t._status == 1).ToList();
            var detailT = context.DetailTransportPtoPs.ToList();
            var PtoP = context.TransportPtoPs.ToList();

            var a = store.Join(istore, i1 => i1.storeId,
                                i2 => i2.storeId, (i1, i2) => new
                                {
                                    id = i2.id,
                                    productId = i2.goodsId,
                                    storeId = i1.storeId,
                                    storeName = i1.storeName,
                                    storePhone = i1.phoneNumber,
                                    storeEmail = i1.email,
                                    addressStore = i1.addressStore,
                                    imageQR = i2.imageQR,
                                });
            var b = a.Join(product, p1 => p1.productId
                                    , p2 => p2.productId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        productId = p1.productId,
                                        productName = p2.productName,
                                        factoryId = p2.factoryId,
                                        harvestId = p2.harvestId,
                                        mfg_date = p2.mfg_date,
                                        exp_date = p2.exp_date,
                                        net_weight = p2.net_weight,
                                        procedureOfProduct = p2.procedureOfProduct,
                                        elementOfProduct = p2.elementOfProduct,
                                        tfactory = p2.temperature,
                                        hfactory = p2.humidity,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        imageQR = p1.imageQR,
                                        imageProduct = p2.imageProduct,
                                    });



            var c = b.Join(ifactory, p1 => p1.harvestId,
                                     p2 => p2.id, (p1, p2) => new
                                     {
                                         id = p1.id,
                                         productId = p1.productId,
                                         productName = p1.productName,
                                         factoryId = p1.factoryId,
                                         ifId = p2.id,
                                         harvestId = p2.harvestId,
                                         mfg_date = p1.mfg_date,
                                         exp_date = p1.exp_date,
                                         net_weight = p1.net_weight,
                                         procedureOfProduct = p1.procedureOfProduct,
                                         elementOfProduct = p1.elementOfProduct,
                                         tfactory = p1.tfactory,
                                         hfactory = p1.hfactory,
                                         storeId = p1.storeId,
                                         storeName = p1.storeName,
                                         storePhone = p1.storePhone,
                                         storeEmail = p1.storeEmail,
                                         addressStore = p1.addressStore,
                                         imageQR = p1.imageQR,
                                         imageProduct = p1.imageProduct,
                                     });

            var d = c.Join(factory, p1 => p1.factoryId
                                , p2 => p2.factoryId, (p1, p2) => new
                                {
                                    id = p1.id,
                                    productId = p1.productId,
                                    productName = p1.productName,
                                    factoryId = p1.factoryId,
                                    factoryName = p2.factoryName,
                                    factoryEmail = p2.email,
                                    addressFactory = p2.addressFactory,
                                    ifId = p1.ifId,
                                    harvestId = p1.harvestId,
                                    mfg_date = p1.mfg_date,
                                    exp_date = p1.exp_date,
                                    net_weight = p1.net_weight,
                                    procedureOfProduct = p1.procedureOfProduct,
                                    elementOfProduct = p1.elementOfProduct,
                                    tfactory = p1.tfactory,
                                    hfactory = p1.hfactory,
                                    storeId = p1.storeId,
                                    storeName = p1.storeName,
                                    storePhone = p1.storePhone,
                                    storeEmail = p1.storeEmail,
                                    addressStore = p1.addressStore,
                                    imageQR = p1.imageQR,
                                    imageProduct = p1.imageProduct,
                                });

            var e = d.Join(harvest, p1 => p1.harvestId
                                    , p2 => p2.harvestId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        productId = p1.productId,
                                        productName = p1.productName,
                                        factoryId = p1.factoryId,
                                        factoryName = p1.factoryName,
                                        factoryEmail = p1.factoryEmail,
                                        addressFactory = p1.addressFactory,
                                        ifId = p1.ifId,
                                        harvestId = p1.harvestId,
                                        date_harvest = p2.date_harvest,
                                        mfg_date = p1.mfg_date,
                                        exp_date = p1.exp_date,
                                        net_weight = p1.net_weight,
                                        procedureOfProduct = p1.procedureOfProduct,
                                        elementOfProduct = p1.elementOfProduct,
                                        tfactory = p1.tfactory,
                                        hfactory = p1.hfactory,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        fruitId = p2.fruitId,
                                        imageQR = p1.imageQR,
                                        imageProduct = p1.imageProduct,
                                        imageFH = p2.imageFH,
                                    });

            var g = e.Join(fruit, p1 => p1.fruitId
                                    , p2 => p2.fruitId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        productId = p1.productId,
                                        productName = p1.productName,
                                        factoryId = p1.factoryId,
                                        factoryName = p1.factoryName,
                                        factoryEmail = p1.factoryEmail,
                                        addressFactory = p1.addressFactory,
                                        ifId = p1.ifId,
                                        harvestId = p1.harvestId,
                                        date_harvest = p1.date_harvest,
                                        mfg_date = p1.mfg_date,
                                        exp_date = p1.exp_date,
                                        net_weight = p1.net_weight,
                                        procedureOfProduct = p1.procedureOfProduct,
                                        elementOfProduct = p1.elementOfProduct,
                                        tfactory = p1.tfactory,
                                        hfactory = p1.hfactory,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        fruitId = p1.fruitId,
                                        fruitName = p2.fruitName,
                                        technology = p2.technology,
                                        land = p2.land,
                                        fertilizer = p2.fertilizer,
                                        pesticides = p2.pesticides,
                                        date_plant = p2.date_plant,
                                        farmId = p2.farmId,
                                        imageQR = p1.imageQR,
                                        imageProduct = p1.imageProduct,
                                        imageFH = p1.imageFH,
                                    });

            var i = g.Join(farm, p1 => p1.farmId
                                    , p2 => p2.farmId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        productId = p1.productId,
                                        productName = p1.productName,
                                        factoryId = p1.factoryId,
                                        factoryName = p1.factoryName,
                                        factoryEmail = p1.factoryEmail,
                                        addressFactory = p1.addressFactory,
                                        ifId = p1.ifId,
                                        harvestId = p1.harvestId,
                                        date_harvest = p1.date_harvest,
                                        mfg_date = p1.mfg_date,
                                        exp_date = p1.exp_date,
                                        net_weight = p1.net_weight,
                                        procedureOfProduct = p1.procedureOfProduct,
                                        elementOfProduct = p1.elementOfProduct,
                                        tfactory = p1.tfactory,
                                        hfactory = p1.hfactory,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        fruitId = p1.fruitId,
                                        fruitName = p1.fruitName,
                                        technology = p1.technology,
                                        land = p1.land,
                                        fertilizer = p1.fertilizer,
                                        pesticides = p1.pesticides,
                                        date_plant = p1.date_plant,
                                        farmId = p1.farmId,
                                        farmName = p2.farmName,
                                        addressFarm = p2.addressFarm,
                                        imageQR = p1.imageQR,
                                        imageProduct = p1.imageProduct,
                                        imageFH = p1.imageFH,
                                    });

            var j = detailT.Join(PtoP, p1 => p1.billId
                                    , p2 => p2.billId, (p1, p2) => new
                                    {
                                        billId = p1.billId,
                                        itemBill = p1.itemBillId,
                                        placeId = p2.placeId,
                                        transportId = p2.transportId,
                                        tTransport = p2.temperature,
                                        hTransport = p2.humidity,
                                    });

            var k = j.Join(transport, p1 => p1.transportId,
                                     p2 => p2.transportId, (p1, p2) => new {
                                         billId = p1.billId,
                                         itemBill = p1.itemBill,
                                         placeId = p1.placeId,
                                         transportId = p1.transportId,
                                         transportName = p2.transportName,
                                         emailTransport = p2.email,
                                         addressTransport = p2.addressTransport,
                                         tTransport = p1.tTransport,
                                         hTransport = p1.hTransport,
                                     });

            var l = k.Join(UTO, p1 => p1.itemBill,
                                     p2 => p2.billId, (p1, p2) => new {
                                         billId = p1.billId,
                                         itemBill = p1.itemBill,
                                         placeId = p1.placeId,
                                         transportId = p1.transportId,
                                         transportName = p1.transportName,
                                         emailTransport = p1.emailTransport,
                                         addressTransport = p1.addressTransport,
                                         tTransportUTO = p1.tTransport,
                                         hTransportUTO = p1.hTransport,
                                         placeUTO = p2.placeId,
                                         goodsUTO = p2.goodsId,
                                         toPlaceUTO = p2.toPlace,
                                     });

            var m = k.Join(UTO, p1 => p1.itemBill,
                                     p2 => p2.billId, (p1, p2) => new {
                                         billId = p1.billId,
                                         itemBill = p1.itemBill,
                                         placeId = p1.placeId,
                                         transportId = p1.transportId,
                                         transportName = p1.transportName,
                                         emailTransport = p1.emailTransport,
                                         addressTransport = p1.addressTransport,
                                         tTransportUTO = p1.tTransport,
                                         hTransportUTO = p1.hTransport,
                                         placeUTO = p2.placeId,
                                         goodsUTO = p2.goodsId,
                                         toPlaceUTO = p2.toPlace,
                                     });

            var n = i.Join(l, p1 => p1.productId + p1.storeId + p1.factoryId, p2 => p2.goodsUTO + p2.toPlaceUTO + p2.placeUTO,
                                            (p1, p2) => new
                                            {
                                                id = p1.id,
                                                productId = p1.productId,
                                                productName = p1.productName,
                                                factoryId = p1.factoryId,
                                                factoryName = p1.factoryName,
                                                factoryEmail = p1.factoryEmail,
                                                addressFactory = p1.addressFactory,
                                                ifId = p1.ifId,
                                                harvestId = p1.harvestId,
                                                date_harvest = p1.date_harvest,
                                                mfg_date = p1.mfg_date,
                                                exp_date = p1.exp_date,
                                                net_weight = p1.net_weight,
                                                procedureOfProduct = p1.procedureOfProduct,
                                                elementOfProduct = p1.elementOfProduct,
                                                tfactory = p1.tfactory,
                                                hfactory = p1.hfactory,
                                                storeId = p1.storeId,
                                                storeName = p1.storeName,
                                                storePhone = p1.storePhone,
                                                storeEmail = p1.storeEmail,
                                                addressStore = p1.addressStore,
                                                fruitId = p1.fruitId,
                                                fruitName = p1.fruitName,
                                                technology = p1.technology,
                                                land = p1.land,
                                                fertilizer = p1.fertilizer,
                                                pesticides = p1.pesticides,
                                                date_plant = p1.date_plant,
                                                farmId = p1.farmId,
                                                farmName = p1.farmName,
                                                addressFarm = p1.addressFarm,
                                                billId1 = p2.billId,
                                                itemBill1 = p2.itemBill,
                                                placeId1 = p2.placeId,
                                                transportId1 = p2.transportId,
                                                transportName1 = p2.transportName,
                                                emailTransport1 = p2.emailTransport,
                                                addressTransport1 = p2.addressTransport,
                                                tTransportUTO = p2.tTransportUTO,
                                                hTransportUTO = p2.hTransportUTO,
                                                placeUTO = p2.placeUTO,
                                                goodsUTO = p2.goodsUTO,
                                                toPlaceUTO = p2.toPlaceUTO,
                                                imageQR = p1.imageQR,
                                                imageProduct = p1.imageProduct,
                                                imageFH = p1.imageFH,
                                            });

            var o = n.Join(m, p1 => p1.harvestId + p1.factoryId + p1.farmId, p2 => p2.goodsUTO + p2.toPlaceUTO + p2.placeUTO,
                                            (p1, p2) => new
                                            {
                                                id = p1.id,
                                                productId = p1.productId,
                                                productName = p1.productName,
                                                factoryId = p1.factoryId,
                                                factoryName = p1.factoryName,
                                                factoryEmail = p1.factoryEmail,
                                                addressFactory = p1.addressFactory,
                                                ifId = p1.ifId,
                                                harvestId = p1.harvestId,
                                                date_harvest = p1.date_harvest,
                                                mfg_date = p1.mfg_date,
                                                exp_date = p1.exp_date,
                                                net_weight = p1.net_weight,
                                                procedureOfProduct = p1.procedureOfProduct,
                                                elementOfProduct = p1.elementOfProduct,
                                                tfactory = p1.tfactory,
                                                hfactory = p1.hfactory,
                                                storeId = p1.storeId,
                                                storeName = p1.storeName,
                                                storePhone = p1.storePhone,
                                                storeEmail = p1.storeEmail,
                                                addressStore = p1.addressStore,
                                                fruitId = p1.fruitId,
                                                fruitName = p1.fruitName,
                                                technology = p1.technology,
                                                land = p1.land,
                                                fertilizer = p1.fertilizer,
                                                pesticides = p1.pesticides,
                                                date_plant = p1.date_plant,
                                                farmId = p1.farmId,
                                                farmName = p1.farmName,
                                                addressFarm = p1.addressFarm,
                                                billId1 = p1.billId1,
                                                itemBill1 = p1.itemBill1,
                                                placeId1 = p1.placeId1,
                                                transportId1 = p1.transportId1,
                                                transportName1 = p1.transportName1,
                                                emailTransport1 = p1.emailTransport1,
                                                addressTransport1 = p1.addressTransport1,
                                                tTransportUTO = p1.tTransportUTO,
                                                hTransportUTO = p1.hTransportUTO,
                                                placeUTO = p1.placeUTO,
                                                goodsUTO = p1.goodsUTO,
                                                toPlaceUTO = p1.toPlaceUTO,
                                                billId2 = p2.billId,
                                                itemBill2 = p2.itemBill,
                                                placeId2 = p2.placeId,
                                                transportId2 = p2.transportId,
                                                transportName2 = p2.transportName,
                                                emailTransport2 = p2.emailTransport,
                                                addressTransport2 = p2.addressTransport,
                                                tTransportUTO2 = p2.tTransportUTO,
                                                hTransportUTO2 = p2.hTransportUTO,
                                                placeUTO2 = p2.placeUTO,
                                                goodsUTO2 = p2.goodsUTO,
                                                toPlaceUTO2 = p2.toPlaceUTO,
                                                imageQR = p1.imageQR,
                                                imageProduct = p1.imageProduct,
                                                imageFH = p1.imageFH,
                                            });

            return new JsonResult(o);
        }

        public JsonResult detailProductLiveWTM(string id)
        {
            var istore = context.Inventories.Where(t => t.id == id && t._status == 1).ToList();
            var store = context.Stores.Where(t => t._status == 1).ToList();
            var ifactory = context.InventoryFactories.Where(t => t._status == 1).ToList();
            var product = context.Products.Where(t => t._status == 1).ToList();
            var harvest = context.FruitHarvests.Where(t => t._status == 1).ToList();
            var transport = context.Transports.Where(t => t._status == 1).ToList();
            var farm = context.Farms.Where(t => t._status == 1).ToList();
            var fruit = context.Fruits.Where(t => t._status == 1).ToList();
            var factory = context.Factorys.Where(t => t._status == 1).ToList();
            var UTO = context.UpToTransports.Where(t => t._status == 1).ToList();
            var detailT = context.DetailTransportPtoPs.ToList();
            var PtoP = context.TransportPtoPs.ToList();

            var a = store.Join(istore, i1 => i1.storeId,
                                i2 => i2.storeId, (i1, i2) => new
                                {
                                    id = i2.id,
                                    harvestId = i2.goodsId,
                                    storeId = i1.storeId,
                                    storeName = i1.storeName,
                                    storePhone = i1.phoneNumber,
                                    storeEmail = i1.email,
                                    addressStore = i1.addressStore,
                                    imageQR = i2.imageQR,
                                });

            var e = a.Join(harvest, p1 => p1.harvestId
                                    , p2 => p2.harvestId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        harvestId = p1.harvestId,
                                        date_harvest = p2.date_harvest,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        fruitId = p2.fruitId,
                                        imageQR = p1.imageQR,
                                        imageFH = p2.imageFH,
                                    });

            var g = e.Join(fruit, p1 => p1.fruitId
                                    , p2 => p2.fruitId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        harvestId = p1.harvestId,
                                        date_harvest = p1.date_harvest,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        fruitId = p1.fruitId,
                                        fruitName = p2.fruitName,
                                        technology = p2.technology,
                                        land = p2.land,
                                        fertilizer = p2.fertilizer,
                                        pesticides = p2.pesticides,
                                        date_plant = p2.date_plant,
                                        farmId = p2.farmId,
                                        imageQR = p1.imageQR,
                                        imageFH = p1.imageFH,
                                    });

            var i = g.Join(farm, p1 => p1.farmId
                                    , p2 => p2.farmId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        harvestId = p1.harvestId,
                                        date_harvest = p1.date_harvest,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        fruitId = p1.fruitId,
                                        fruitName = p1.fruitName,
                                        technology = p1.technology,
                                        land = p1.land,
                                        fertilizer = p1.fertilizer,
                                        pesticides = p1.pesticides,
                                        date_plant = p1.date_plant,
                                        farmId = p1.farmId,
                                        farmName = p2.farmName,
                                        addressFarm = p2.addressFarm,
                                        imageQR = p1.imageQR,
                                        imageFH = p1.imageFH,
                                    });

            var j = detailT.Join(PtoP, p1 => p1.billId
                                    , p2 => p2.billId, (p1, p2) => new
                                    {
                                        billId = p1.billId,
                                        itemBill = p1.itemBillId,
                                        placeId = p2.placeId,
                                        transportId = p2.transportId,
                                        tTransport = p2.temperature,
                                        hTransport = p2.humidity,
                                    });

            var k = j.Join(transport, p1 => p1.transportId,
                                     p2 => p2.transportId, (p1, p2) => new {
                                         billId = p1.billId,
                                         itemBill = p1.itemBill,
                                         placeId = p1.placeId,
                                         transportId = p1.transportId,
                                         transportName = p2.transportName,
                                         emailTransport = p2.email,
                                         addressTransport = p2.addressTransport,
                                         tTransport = p1.tTransport,
                                         hTransport = p1.hTransport,
                                     });

            var m = k.Join(UTO, p1 => p1.itemBill,
                                     p2 => p2.billId, (p1, p2) => new {
                                         billId = p1.billId,
                                         itemBill = p1.itemBill,
                                         placeId = p1.placeId,
                                         transportId = p1.transportId,
                                         transportName = p1.transportName,
                                         emailTransport = p1.emailTransport,
                                         addressTransport = p1.addressTransport,
                                         tTransportUTO = p1.tTransport,
                                         hTransportUTO = p1.hTransport,
                                         placeUTO = p2.placeId,
                                         goodsUTO = p2.goodsId,
                                         toPlaceUTO = p2.toPlace,
                                     });

            var o = i.Join(m, p1 => p1.harvestId + p1.storeId + p1.farmId, p2 => p2.goodsUTO + p2.toPlaceUTO + p2.placeUTO,
                                            (p1, p2) => new
                                            {
                                                id = p1.id,
                                                harvestId = p1.harvestId,
                                                date_harvest = p1.date_harvest,
                                                storeId = p1.storeId,
                                                storeName = p1.storeName,
                                                storePhone = p1.storePhone,
                                                storeEmail = p1.storeEmail,
                                                addressStore = p1.addressStore,
                                                fruitId = p1.fruitId,
                                                fruitName = p1.fruitName,
                                                technology = p1.technology,
                                                land = p1.land,
                                                fertilizer = p1.fertilizer,
                                                pesticides = p1.pesticides,
                                                date_plant = p1.date_plant,
                                                farmId = p1.farmId,
                                                farmName = p1.farmName,
                                                addressFarm = p1.addressFarm,
                                                billId = p2.billId,
                                                itemBill = p2.itemBill,
                                                placeId = p2.placeId,
                                                transportId = p2.transportId,
                                                transportName = p2.transportName,
                                                emailTransport = p2.emailTransport,
                                                addressTransport = p2.addressTransport,
                                                tTransportUTO = p2.tTransportUTO,
                                                hTransportUTO = p2.hTransportUTO,
                                                placeUTO = p2.placeUTO,
                                                goodsUTO = p2.goodsUTO,
                                                toPlaceUTO = p2.toPlaceUTO,
                                                imageQR = p1.imageQR,
                                                imageFH = p1.imageFH,
                                            });

            return new JsonResult(o);
        }

        public JsonResult detailProductLiveFull(string id)
        {
            var istore = context.Inventories.Where(t => t.id == id && t._status == 1).ToList();
            var store = context.Stores.Where(t => t._status == 1).ToList();
            var ifactory = context.InventoryFactories.Where(t => t._status == 1).ToList();
            var product = context.Products.Where(t => t._status == 1).ToList();
            var harvest = context.FruitHarvests.Where(t => t._status == 1).ToList();
            var transport = context.Transports.Where(t => t._status == 1).ToList();
            var farm = context.Farms.Where(t => t._status == 1).ToList();
            var fruit = context.Fruits.Where(t => t._status == 1).ToList();
            var factory = context.Factorys.Where(t => t._status == 1).ToList();
            var merchant = context.Merchants.Where(t => t._status == 1).ToList();
            var mcf = context.MerchantFarms.Where(t => t._status == 1).ToList();
            var detailT = context.DetailTransportPtoPs.ToList();
            var PtoP = context.TransportPtoPs.ToList();

            var a = store.Join(istore, i1 => i1.storeId,
                                i2 => i2.storeId, (i1, i2) => new
                                {
                                    id = i2.id,
                                    harvestId = i2.goodsId,
                                    storeId = i1.storeId,
                                    storeName = i1.storeName,
                                    storePhone = i1.phoneNumber,
                                    storeEmail = i1.email,
                                    addressStore = i1.addressStore,
                                    imageQR = i2.imageQR,
                                });

            var e = a.Join(harvest, p1 => p1.harvestId
                                    , p2 => p2.harvestId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        harvestId = p1.harvestId,
                                        date_harvest = p2.date_harvest,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        fruitId = p2.fruitId,
                                        imageQR = p1.imageQR,
                                        imageFH = p2.imageFH,
                                    });

            var g = e.Join(fruit, p1 => p1.fruitId
                                    , p2 => p2.fruitId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        harvestId = p1.harvestId,
                                        date_harvest = p1.date_harvest,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        fruitId = p1.fruitId,
                                        fruitName = p2.fruitName,
                                        technology = p2.technology,
                                        land = p2.land,
                                        fertilizer = p2.fertilizer,
                                        pesticides = p2.pesticides,
                                        date_plant = p2.date_plant,
                                        farmId = p2.farmId,
                                        imageQR = p1.imageQR,
                                        imageFH = p1.imageFH,
                                    });

            var i = g.Join(farm, p1 => p1.farmId
                                    , p2 => p2.farmId, (p1, p2) => new
                                    {
                                        id = p1.id,
                                        harvestId = p1.harvestId,
                                        date_harvest = p1.date_harvest,
                                        storeId = p1.storeId,
                                        storeName = p1.storeName,
                                        storePhone = p1.storePhone,
                                        storeEmail = p1.storeEmail,
                                        addressStore = p1.addressStore,
                                        fruitId = p1.fruitId,
                                        fruitName = p1.fruitName,
                                        technology = p1.technology,
                                        land = p1.land,
                                        fertilizer = p1.fertilizer,
                                        pesticides = p1.pesticides,
                                        date_plant = p1.date_plant,
                                        farmId = p1.farmId,
                                        farmName = p2.farmName,
                                        addressFarm = p2.addressFarm,
                                        imageQR = p1.imageQR,
                                        imageFH = p1.imageFH,
                                    });

            var j = detailT.Join(PtoP, p1 => p1.billId
                                    , p2 => p2.billId, (p1, p2) => new
                                    {
                                        billId = p1.billId,
                                        itemBill = p1.itemBillId,
                                        placeId = p2.placeId,
                                        transportId = p2.transportId,
                                        tTransport = p2.temperature,
                                        hTransport = p2.humidity,
                                    });

            var k = j.Join(transport, p1 => p1.transportId,
                                     p2 => p2.transportId, (p1, p2) => new {
                                         billId = p1.billId,
                                         itemBill = p1.itemBill,
                                         placeId = p1.placeId,
                                         transportId = p1.transportId,
                                         transportName = p2.transportName,
                                         emailTransport = p2.email,
                                         addressTransport = p2.addressTransport,
                                         tTransport = p1.tTransport,
                                         hTransport = p1.hTransport,
                                     });

            var m = k.Join(mcf, p1 => p1.itemBill,
                                     p2 => p2.billId, (p1, p2) => new {
                                         billId = p1.billId,
                                         itemBill = p1.itemBill,
                                         placeId = p1.placeId,
                                         transportId = p1.transportId,
                                         transportName = p1.transportName,
                                         emailTransport = p1.emailTransport,
                                         addressTransport = p1.addressTransport,
                                         tTransportMF = p1.tTransport,
                                         hTransportMF = p1.hTransport,
                                         placeMF = p2.farmId,
                                         goodsMF = p2.harvestId,
                                         toPlaceMF = p2.toPlace,
                                         merchantId = p2.merchantId,
                                     });

            var o = i.Join(m, p1 => p1.harvestId + p1.storeId + p1.farmId, p2 => p2.goodsMF + p2.toPlaceMF + p2.placeMF,
                                            (p1, p2) => new
                                            {
                                                id = p1.id,
                                                harvestId = p1.harvestId,
                                                date_harvest = p1.date_harvest,
                                                storeId = p1.storeId,
                                                storeName = p1.storeName,
                                                storePhone = p1.storePhone,
                                                storeEmail = p1.storeEmail,
                                                addressStore = p1.addressStore,
                                                fruitId = p1.fruitId,
                                                fruitName = p1.fruitName,
                                                technology = p1.technology,
                                                land = p1.land,
                                                fertilizer = p1.fertilizer,
                                                pesticides = p1.pesticides,
                                                date_plant = p1.date_plant,
                                                farmId = p1.farmId,
                                                farmName = p1.farmName,
                                                addressFarm = p1.addressFarm,
                                                billId = p2.billId,
                                                itemBill = p2.itemBill,
                                                placeId = p2.placeId,
                                                transportId = p2.transportId,
                                                transportName = p2.transportName,
                                                emailTransport = p2.emailTransport,
                                                addressTransport = p2.addressTransport,
                                                tTransportMF = p2.tTransportMF,
                                                hTransportMF = p2.hTransportMF,
                                                placeMF = p2.placeMF,
                                                goodsMF = p2.goodsMF,
                                                toPlaceMF = p2.toPlaceMF,
                                                merchantId = p2.merchantId,
                                                imageQR = p1.imageQR,
                                                imageFH = p1.imageFH,
                                            });

            var q = o.Join(merchant, p1 => p1.merchantId, p2 => p2.merchantId,
                                              (p1, p2) => new
                                              {
                                                  id = p1.id,
                                                  harvestId = p1.harvestId,
                                                  date_harvest = p1.date_harvest,
                                                  storeId = p1.storeId,
                                                  storeName = p1.storeName,
                                                  storePhone = p1.storePhone,
                                                  storeEmail = p1.storeEmail,
                                                  addressStore = p1.addressStore,
                                                  fruitId = p1.fruitId,
                                                  fruitName = p1.fruitName,
                                                  technology = p1.technology,
                                                  land = p1.land,
                                                  fertilizer = p1.fertilizer,
                                                  pesticides = p1.pesticides,
                                                  date_plant = p1.date_plant,
                                                  farmId = p1.farmId,
                                                  farmName = p1.farmName,
                                                  addressFarm = p1.addressFarm,
                                                  billId = p1.billId,
                                                  itemBill = p1.itemBill,
                                                  placeId = p1.placeId,
                                                  transportId = p1.transportId,
                                                  transportName = p1.transportName,
                                                  emailTransport = p1.emailTransport,
                                                  addressTransport = p1.addressTransport,
                                                  tTransportMF = p1.tTransportMF,
                                                  hTransportMF = p1.hTransportMF,
                                                  placeMF = p1.placeMF,
                                                  goodsMF = p1.goodsMF,
                                                  toPlaceMF = p1.toPlaceMF,
                                                  merchantId = p1.merchantId,
                                                  merchantName = p2.merchantName,
                                                  addressMerchant = p2.addressMerchant,
                                                  imageQR = p1.imageQR,
                                                  imageFH = p1.imageFH,
                                              });

            return new JsonResult(q);
        }

        public string id()
        {
            int result = context.Inventories.Count() + 1;
            if (result >= 0 && result < 10)
                return "IS00000000" + result;
            else if (result >= 10 && result < 100)
                return "IS0000000" + result;
            else if(result >= 100 && result < 1000) 
                return "IS00000" + result;
            else if (result >= 1000 && result < 10000)
                return "IS0000" + result;
            else if (result >= 10000 && result < 100000)
                return "IS000" + result;
            else if (result >= 100000 && result < 1000000)
                return "IS00" + result;
            else if (result >= 1000000 && result < 10000000)
                return "IS0" + result;
            else return "IS" + result;
        }
    }
}
