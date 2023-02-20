using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TraceabilityAPI.Models;
using TraceabilityAPI.Models.ModelViews;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class BlockchainRepository : BaseRepository<Blockchain>, IBlock
    {
        protected DataDbContext _context;
        private InventoryStoreRepository iven;
        public BlockchainRepository(DataDbContext context) : base(context) {
            _context = context;
            iven = new InventoryStoreRepository(context);
        }

        public string getLastBlock()
        {
            var result = _context.Blocks.Select(t => t.hash).Last();
            if(result == null)
            {
                return "000000000000000000000";
            }
            return result;
        }

        public IEnumerable<Blockchain> getAllbyFilter(string searchString)
        {
            var blocks = _context.Blocks.ToList();

            searchString = searchString.Trim();
            if (searchString == "Today")
            {
                blocks = blocks.Where(t => t.timestamp.Date == DateTime.Now.Date).ToList();
            }
            else if (searchString == "Last 7 Day")
            {
                var a = DateTime.Now.Date.AddDays(-7);
                blocks = blocks.Where(t => t.timestamp.Date <= DateTime.Now.Date && t.timestamp.Date >= a).ToList();
            }
            else if (searchString == "Last Month")
            {
                var a = DateTime.Now.Date.AddMonths(-1);
                blocks = blocks.Where(t => t.timestamp.Date <= DateTime.Now.Date && t.timestamp.Date >= a).ToList();
            }
            else if (searchString == "Last 12 Months")
            {
                var a = DateTime.Now.Date.AddYears(-1);
                blocks = blocks.Where(t => t.timestamp.Date <= DateTime.Now.Date && t.timestamp.Date >= a).ToList();
            }
            else
            {
                blocks = blocks;
            }

            return blocks;
        }

        public JsonResult AddDataBlock()
        {
            var inventory = _context.Inventories.Where(t=>t.date_create.Date == DateTime.Now.Date).ToList();
            string data = "";
            string data1 = "";
            string data2 = "";
            string data3 = "";
            foreach (var block in inventory)
            {
                if (detailProductFull(block.id) != null && detailProductFull(block.id).checkM == 1)
                {
                    data += JsonConvert.SerializeObject(detailProductFull(block.id)) + "_";
                }
                else
                if (iven.detailProductWTM(block.id) != null && JsonConvert.SerializeObject(iven.detailProductWTM(block.id).Value) != "[]")
                {
                    data1 += JsonConvert.SerializeObject(iven.detailProductWTM(block.id).Value) + "_";
                }
                else
                if(iven.detailProductLiveFull(block.id) != null && JsonConvert.SerializeObject(iven.detailProductLiveFull(block.id).Value) != "[]")
                {
                    data2 += JsonConvert.SerializeObject(iven.detailProductLiveFull(block.id).Value) + "_";
                }
                else
                {
                    data3 += JsonConvert.SerializeObject(iven.detailProductLiveWTM(block.id).Value) + "_";
                }
            }
            return new JsonResult(new
            {
                detailFull = data,
                detailWTM = data1,
                detailLiveFull = data2,
                detailLiveWTM = data3
            });
        }

        private DetailFull detailProductFull(string id)
        {
            var istore = _context.Inventories.Where(t => t.id == id && t._status == 1).ToList();
            var store = _context.Stores.Where(t => t._status == 1).ToList();
            var ifactory = _context.InventoryFactories.Where(t => t._status == 1).ToList();
            var product = _context.Products.Where(t => t._status == 1).ToList();
            var harvest = _context.FruitHarvests.Where(t => t._status == 1).ToList();
            var transport = _context.Transports.Where(t => t._status == 1).ToList();
            var farm = _context.Farms.Where(t => t._status == 1).ToList();
            var fruit = _context.Fruits.Where(t => t._status == 1).ToList();
            var factory = _context.Factorys.Where(t => t._status == 1).ToList();
            var UTO = _context.UpToTransports.Where(t => t._status == 1).ToList();
            var merchant = _context.Merchants.Where(t => t._status == 1).ToList();
            var mcf = _context.MerchantFarms.Where(t => t._status == 1).ToList();
            var detailT = _context.DetailTransportPtoPs.ToList();
            var PtoP = _context.TransportPtoPs.ToList();

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
                                           (p1, p2) => new DetailFull{
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
                                           }).SingleOrDefault();

            return q;
        }

    }
}
