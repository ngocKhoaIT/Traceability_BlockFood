using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Models.ModelViews;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class UpToTransportRepository: BaseRepository<UpToTransport>, IUpToTransport
    {
        protected DataDbContext context;

        public UpToTransportRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.UpToTransports.Where(t => t.billId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public void updateAmount(string id, decimal a)
        {
            var result = context.UpToTransports.Where(t => t.billId == id).SingleOrDefault();
            if (result != null)
            {
                result.amountDelivery = a;
                result.date_update = DateTime.Now;
                context.Update(result);
            }
        }

        public void UpdateStatus(string id, string req)
        {
            var result = context.UpToTransports.Where(t => t.billId== id).SingleOrDefault();
            if (result != null)
            {
                result.status_request = req;
                result.date_update = DateTime.Now;
                context.Update(result);
            }
        }

        public IEnumerable<UpToTransport> getAllUpToTransport()
        {
            return context.UpToTransports.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }

        public JsonResult getAllUpToTransportbyTransport()
        {
            var utt = context.UpToTransports.Where(t => t._status == 1 && t.status_request == "Đang tìm").OrderByDescending(t => t.date_create);
            var fharvest = context.FruitHarvests.Where(t => t._status == 1);
            var fruit = context.Fruits.Where(t => t._status == 1);
            var product = context.Products.Where(t => t._status == 1);
            var farm = context.Farms.Where(t => t._status == 1);
            var merchant = context.Merchants.Where(t => t._status == 1);
            var factory = context.Factorys.Where(t => t._status == 1);
            var store = context.Stores.Where(t => t._status == 1);

            var frfh = fruit.Join(fharvest, f1 => f1.fruitId, f2 => f2.fruitId,
                                            (f1, f2) => new
                                            {
                                                fruitName = f1.fruitName,
                                                harvestId = f2.harvestId,
                                                farmId = f1.farmId,
                                            });

            var farmlist = frfh.Join(farm, f1 => f1.farmId,
                                        f2 => f2.farmId, (f1, f2) => new
                                        {
                                            fruitName = f1.fruitName,
                                            harvestId = f1.harvestId,
                                            farmId = f1.farmId,
                                            farmName = f2.farmName,
                                            addressFarm = f2.addressFarm,
                                        });

            var factorylist = product.Join(factory, f1 => f1.factoryId, f2 => f2.factoryId,
                                                (f1, f2) => new
                                                {
                                                    factoryId = f1.factoryId,
                                                    factoryName = f2.factoryName,
                                                    addressFactory = f2.addressFactory,
                                                    productId = f1.productId,
                                                    productName = f1.productName,
                                                });

            var utofrfh = farmlist.Join(utt, f1 => f1.harvestId,
                                                f2 => f2.goodsId, (f1, f2) => new
                                                {
                                                    billId = f2.billId,
                                                    goodsName = f1.fruitName,
                                                    goodsId = f1.harvestId,
                                                    placeId = f1.farmId,
                                                    placeName = f1.farmName,
                                                    addressPlace = f1.addressFarm,
                                                    amount = f2.amount,
                                                    amountDelivery = f2.amountDelivery,
                                                    unit = f2.unit,
                                                    toPlace = f2.toPlace,
                                                    status_request = f2.status_request,
                                                    date = f2.date_create,
                                                });

            var utofrfhFactory = utofrfh.Join(factory, f1 => f1.toPlace, f2 => f2.factoryId,
                                                    (f1, f2) => new
                                                    {
                                                        billId = f1.billId,
                                                        goodsName = f1.goodsName,
                                                        goodsId = f1.goodsId,
                                                        placeId = f1.placeId,
                                                        placeName = f1.placeName,
                                                        addressPlace = f1.addressPlace,
                                                        amount = f1.amount,
                                                        amountDelivery = f1.amountDelivery,
                                                        unit = f1.unit,
                                                        toPlace = f1.toPlace,
                                                        toPlaceName = f2.factoryName,
                                                        addresstoPlace = f2.addressFactory,
                                                        status_request = f1.status_request,
                                                        date = f1.date,
                                                    });

            var utofrfhStore = utofrfh.Join(store, f1 => f1.toPlace, f2 => f2.storeId,
                                                    (f1, f2) => new
                                                    {
                                                        billId = f1.billId,
                                                        goodsName = f1.goodsName,
                                                        goodsId = f1.goodsId,
                                                        placeId = f1.placeId,
                                                        placeName = f1.placeName,
                                                        addressPlace = f1.addressPlace,
                                                        amount = f1.amount,
                                                        amountDelivery = f1.amountDelivery,
                                                        unit = f1.unit,
                                                        toPlace = f1.toPlace,
                                                        toPlaceName = f2.storeName,
                                                        addresstoPlace = f2.addressStore,
                                                        status_request = f1.status_request,
                                                        date = f1.date,
                                                    });

            var utoproduct = utt.Join(factorylist, f1 => f1.goodsId, f2 => f2.productId, (f1, f2) => new
                                                                {
                                                                    billId = f1.billId,
                                                                    goodsName = f2.productName,
                                                                    goodsId = f1.goodsId,
                                                                    placeId = f2.factoryId,
                                                                    placeName = f2.factoryName,
                                                                    addressPlace = f2.addressFactory,
                                                                    amount = f1.amount,
                                                                    amountDelivery = f1.amountDelivery,
                                                                    unit = f1.unit,
                                                                    toPlace = f1.toPlace,
                                                                    status_request = f1.status_request,
                                                                    date = f1.date_create,
                                                                });

            var utoproductStore = utoproduct.Join(store, f1 => f1.toPlace, f2 => f2.storeId,
                                                        (f1, f2) => new {
                                                            billId = f1.billId,
                                                            goodsName = f1.goodsName,
                                                            goodsId = f1.goodsId,
                                                            placeId = f1.placeId,
                                                            placeName = f1.placeName,
                                                            addressPlace = f1.addressPlace,
                                                            amount = f1.amount,
                                                            amountDelivery = f1.amountDelivery,
                                                            unit = f1.unit,
                                                            toPlace = f1.toPlace,
                                                            toPlaceName = f2.storeName,
                                                            addresstoPlace = f2.addressStore,
                                                            status_request = f1.status_request,
                                                            date = f1.date,
                                                        });

            List<UTO> uTOs = new List<UTO>();

            foreach(var f1 in utofrfhFactory)
            {
                UTO uTO = new UTO
                {
                    billId = f1.billId,
                    goodsName = f1.goodsName,
                    goodsId = f1.goodsId,
                    placeId = f1.placeId,
                    placeName = f1.placeName,
                    addressPlace = f1.addressPlace,
                    amount = f1.amount,
                    amountDelivery = f1.amountDelivery,
                    unit = f1.unit,
                    toPlace = f1.toPlace,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    status_request = f1.status_request,
                    date = f1.date,
                };
                uTOs.Add(uTO);
            }

            foreach (var f1 in utofrfhStore)
            {
                UTO uTO = new UTO
                {
                    billId = f1.billId,
                    goodsName = f1.goodsName,
                    goodsId = f1.goodsId,
                    placeId = f1.placeId,
                    placeName = f1.placeName,
                    addressPlace = f1.addressPlace,
                    amount = f1.amount,
                    amountDelivery = f1.amountDelivery,
                    unit = f1.unit,
                    toPlace = f1.toPlace,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    status_request = f1.status_request,
                    date = f1.date,
                };
                uTOs.Add(uTO);
            }

            foreach (var f1 in utoproductStore)
            {
                UTO uTO = new UTO
                {
                    billId = f1.billId,
                    goodsName = f1.goodsName,
                    goodsId = f1.goodsId,
                    placeId = f1.placeId,
                    placeName = f1.placeName,
                    addressPlace = f1.addressPlace,
                    amount = f1.amount,
                    amountDelivery = f1.amountDelivery,
                    unit = f1.unit,
                    toPlace = f1.toPlace,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    status_request = f1.status_request,
                    date = f1.date,
                };
                uTOs.Add(uTO);
            }

            return new JsonResult(uTOs.OrderByDescending(t=>t.date));
        }

        public IEnumerable<UpToTransport> getAllUpToTransportbyPlace(string id)
        {
            
            return context.UpToTransports.Where(t => t._status == 1 && t.toPlace == id).OrderByDescending(t => t.date_create).ToList();
        }

        public JsonResult getAllUpToTransportbyPlacesView(string id, string req)
        {
            var utt = context.UpToTransports.Where(t => t._status == 1 && t.status_request == req && t.toPlace == id).OrderByDescending(t => t.date_create);
            var fharvest = context.FruitHarvests.Where(t => t._status == 1);
            var fruit = context.Fruits.Where(t => t._status == 1);
            var product = context.Products.Where(t => t._status == 1);
            var farm = context.Farms.Where(t => t._status == 1);
            var merchant = context.Merchants.Where(t => t._status == 1);
            var factory = context.Factorys.Where(t => t._status == 1);
            var store = context.Stores.Where(t => t._status == 1);

            var frfh = fruit.Join(fharvest, f1 => f1.fruitId, f2 => f2.fruitId,
                                            (f1, f2) => new
                                            {
                                                fruitName = f1.fruitName,
                                                harvestId = f2.harvestId,
                                                farmId = f1.farmId,
                                            });

            var farmlist = frfh.Join(farm, f1 => f1.farmId,
                                        f2 => f2.farmId, (f1, f2) => new
                                        {
                                            fruitName = f1.fruitName,
                                            harvestId = f1.harvestId,
                                            farmId = f1.farmId,
                                            farmName = f2.farmName,
                                            addressFarm = f2.addressFarm,
                                        });

            var factorylist = product.Join(factory, f1 => f1.factoryId, f2 => f2.factoryId,
                                                (f1, f2) => new
                                                {
                                                    factoryId = f1.factoryId,
                                                    factoryName = f2.factoryName,
                                                    addressFactory = f2.addressFactory,
                                                    productId = f1.productId,
                                                    productName = f1.productName,
                                                });

            var utofrfh = farmlist.Join(utt, f1 => f1.harvestId,
                                                f2 => f2.goodsId, (f1, f2) => new
                                                {
                                                    billId = f2.billId,
                                                    goodsName = f1.fruitName,
                                                    goodsId = f1.harvestId,
                                                    placeId = f1.farmId,
                                                    placeName = f1.farmName,
                                                    addressPlace = f1.addressFarm,
                                                    amount = f2.amount,
                                                    amountDelivery = f2.amountDelivery,
                                                    unit = f2.unit,
                                                    toPlace = f2.toPlace,
                                                    status_request = f2.status_request,
                                                    date = f2.date_create,
                                                });

            var utofrfhFactory = utofrfh.Join(factory, f1 => f1.toPlace, f2 => f2.factoryId,
                                                    (f1, f2) => new
                                                    {
                                                        billId = f1.billId,
                                                        goodsName = f1.goodsName,
                                                        goodsId = f1.goodsId,
                                                        placeId = f1.placeId,
                                                        placeName = f1.placeName,
                                                        addressPlace = f1.addressPlace,
                                                        amount = f1.amount,
                                                        amountDelivery = f1.amountDelivery,
                                                        unit = f1.unit,
                                                        toPlace = f1.toPlace,
                                                        toPlaceName = f2.factoryName,
                                                        addresstoPlace = f2.addressFactory,
                                                        status_request = f1.status_request,
                                                        date = f1.date,
                                                    });

            var utofrfhStore = utofrfh.Join(store, f1 => f1.toPlace, f2 => f2.storeId,
                                                    (f1, f2) => new
                                                    {
                                                        billId = f1.billId,
                                                        goodsName = f1.goodsName,
                                                        goodsId = f1.goodsId,
                                                        placeId = f1.placeId,
                                                        placeName = f1.placeName,
                                                        addressPlace = f1.addressPlace,
                                                        amount = f1.amount,
                                                        amountDelivery = f1.amountDelivery,
                                                        unit = f1.unit,
                                                        toPlace = f1.toPlace,
                                                        toPlaceName = f2.storeName,
                                                        addresstoPlace = f2.addressStore,
                                                        status_request = f1.status_request,
                                                        date = f1.date,
                                                    });

            var utoproduct = utt.Join(factorylist, f1 => f1.goodsId, f2 => f2.productId, (f1, f2) => new
            {
                billId = f1.billId,
                goodsName = f2.productName,
                goodsId = f1.goodsId,
                placeId = f2.factoryId,
                placeName = f2.factoryName,
                addressPlace = f2.addressFactory,
                amount = f1.amount,
                amountDelivery = f1.amountDelivery,
                unit = f1.unit,
                toPlace = f1.toPlace,
                status_request = f1.status_request,
                date = f1.date_create,
            });

            var utoproductStore = utoproduct.Join(store, f1 => f1.toPlace, f2 => f2.storeId,
                                                        (f1, f2) => new {
                                                            billId = f1.billId,
                                                            goodsName = f1.goodsName,
                                                            goodsId = f1.goodsId,
                                                            placeId = f1.placeId,
                                                            placeName = f1.placeName,
                                                            addressPlace = f1.addressPlace,
                                                            amount = f1.amount,
                                                            amountDelivery = f1.amountDelivery,
                                                            unit = f1.unit,
                                                            toPlace = f1.toPlace,
                                                            toPlaceName = f2.storeName,
                                                            addresstoPlace = f2.addressStore,
                                                            status_request = f1.status_request,
                                                            date = f1.date,
                                                        });

            List<UTO> uTOs = new List<UTO>();

            foreach (var f1 in utofrfhFactory)
            {
                UTO uTO = new UTO
                {
                    billId = f1.billId,
                    goodsName = f1.goodsName,
                    goodsId = f1.goodsId,
                    placeId = f1.placeId,
                    placeName = f1.placeName,
                    addressPlace = f1.addressPlace,
                    amount = f1.amount,
                    amountDelivery = f1.amountDelivery,
                    unit = f1.unit,
                    toPlace = f1.toPlace,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    status_request = f1.status_request,
                    date = f1.date,
                };
                uTOs.Add(uTO);
            }

            foreach (var f1 in utofrfhStore)
            {
                UTO uTO = new UTO
                {
                    billId = f1.billId,
                    goodsName = f1.goodsName,
                    goodsId = f1.goodsId,
                    placeId = f1.placeId,
                    placeName = f1.placeName,
                    addressPlace = f1.addressPlace,
                    amount = f1.amount,
                    amountDelivery = f1.amountDelivery,
                    unit = f1.unit,
                    toPlace = f1.toPlace,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    status_request = f1.status_request,
                    date = f1.date,
                };
                uTOs.Add(uTO);
            }

            foreach (var f1 in utoproductStore)
            {
                UTO uTO = new UTO
                {
                    billId = f1.billId,
                    goodsName = f1.goodsName,
                    goodsId = f1.goodsId,
                    placeId = f1.placeId,
                    placeName = f1.placeName,
                    addressPlace = f1.addressPlace,
                    amount = f1.amount,
                    amountDelivery = f1.amountDelivery,
                    unit = f1.unit,
                    toPlace = f1.toPlace,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    status_request = f1.status_request,
                    date = f1.date,
                };
                uTOs.Add(uTO);
            }

            return new JsonResult(uTOs.OrderByDescending(t => t.date));
        }

        public JsonResult getAllUpToTransportbyPlacesViewbyFilter(string id, string req,string searchString)
        {
            var utt = context.UpToTransports.Where(t => t._status == 1 && t.status_request == req && t.toPlace == id).OrderByDescending(t => t.date_create);
            var fharvest = context.FruitHarvests.Where(t => t._status == 1);
            var fruit = context.Fruits.Where(t => t._status == 1);
            var product = context.Products.Where(t => t._status == 1);
            var farm = context.Farms.Where(t => t._status == 1);
            var merchant = context.Merchants.Where(t => t._status == 1);
            var factory = context.Factorys.Where(t => t._status == 1);
            var store = context.Stores.Where(t => t._status == 1);

            var frfh = fruit.Join(fharvest, f1 => f1.fruitId, f2 => f2.fruitId,
                                            (f1, f2) => new
                                            {
                                                fruitName = f1.fruitName,
                                                harvestId = f2.harvestId,
                                                farmId = f1.farmId,
                                            });

            var farmlist = frfh.Join(farm, f1 => f1.farmId,
                                        f2 => f2.farmId, (f1, f2) => new
                                        {
                                            fruitName = f1.fruitName,
                                            harvestId = f1.harvestId,
                                            farmId = f1.farmId,
                                            farmName = f2.farmName,
                                            addressFarm = f2.addressFarm,
                                        });

            var factorylist = product.Join(factory, f1 => f1.factoryId, f2 => f2.factoryId,
                                                (f1, f2) => new
                                                {
                                                    factoryId = f1.factoryId,
                                                    factoryName = f2.factoryName,
                                                    addressFactory = f2.addressFactory,
                                                    productId = f1.productId,
                                                    productName = f1.productName,
                                                });

            var utofrfh = farmlist.Join(utt, f1 => f1.harvestId,
                                                f2 => f2.goodsId, (f1, f2) => new
                                                {
                                                    billId = f2.billId,
                                                    goodsName = f1.fruitName,
                                                    goodsId = f1.harvestId,
                                                    placeId = f1.farmId,
                                                    placeName = f1.farmName,
                                                    addressPlace = f1.addressFarm,
                                                    amount = f2.amount,
                                                    amountDelivery = f2.amountDelivery,
                                                    unit = f2.unit,
                                                    toPlace = f2.toPlace,
                                                    status_request = f2.status_request,
                                                    date = f2.date_create,
                                                });

            var utofrfhFactory = utofrfh.Join(factory, f1 => f1.toPlace, f2 => f2.factoryId,
                                                    (f1, f2) => new
                                                    {
                                                        billId = f1.billId,
                                                        goodsName = f1.goodsName,
                                                        goodsId = f1.goodsId,
                                                        placeId = f1.placeId,
                                                        placeName = f1.placeName,
                                                        addressPlace = f1.addressPlace,
                                                        amount = f1.amount,
                                                        amountDelivery = f1.amountDelivery,
                                                        unit = f1.unit,
                                                        toPlace = f1.toPlace,
                                                        toPlaceName = f2.factoryName,
                                                        addresstoPlace = f2.addressFactory,
                                                        status_request = f1.status_request,
                                                        date = f1.date,
                                                    });

            var utofrfhStore = utofrfh.Join(store, f1 => f1.toPlace, f2 => f2.storeId,
                                                    (f1, f2) => new
                                                    {
                                                        billId = f1.billId,
                                                        goodsName = f1.goodsName,
                                                        goodsId = f1.goodsId,
                                                        placeId = f1.placeId,
                                                        placeName = f1.placeName,
                                                        addressPlace = f1.addressPlace,
                                                        amount = f1.amount,
                                                        amountDelivery = f1.amountDelivery,
                                                        unit = f1.unit,
                                                        toPlace = f1.toPlace,
                                                        toPlaceName = f2.storeName,
                                                        addresstoPlace = f2.addressStore,
                                                        status_request = f1.status_request,
                                                        date = f1.date,
                                                    });

            var utoproduct = utt.Join(factorylist, f1 => f1.goodsId, f2 => f2.productId, (f1, f2) => new
            {
                billId = f1.billId,
                goodsName = f2.productName,
                goodsId = f1.goodsId,
                placeId = f2.factoryId,
                placeName = f2.factoryName,
                addressPlace = f2.addressFactory,
                amount = f1.amount,
                amountDelivery = f1.amountDelivery,
                unit = f1.unit,
                toPlace = f1.toPlace,
                status_request = f1.status_request,
                date = f1.date_create,
            });

            var utoproductStore = utoproduct.Join(store, f1 => f1.toPlace, f2 => f2.storeId,
                                                        (f1, f2) => new {
                                                            billId = f1.billId,
                                                            goodsName = f1.goodsName,
                                                            goodsId = f1.goodsId,
                                                            placeId = f1.placeId,
                                                            placeName = f1.placeName,
                                                            addressPlace = f1.addressPlace,
                                                            amount = f1.amount,
                                                            amountDelivery = f1.amountDelivery,
                                                            unit = f1.unit,
                                                            toPlace = f1.toPlace,
                                                            toPlaceName = f2.storeName,
                                                            addresstoPlace = f2.addressStore,
                                                            status_request = f1.status_request,
                                                            date = f1.date,
                                                        });

            List<UTO> uTOs = new List<UTO>();

            foreach (var f1 in utofrfhFactory)
            {
                UTO uTO = new UTO
                {
                    billId = f1.billId,
                    goodsName = f1.goodsName,
                    goodsId = f1.goodsId,
                    placeId = f1.placeId,
                    placeName = f1.placeName,
                    addressPlace = f1.addressPlace,
                    amount = f1.amount,
                    amountDelivery = f1.amountDelivery,
                    unit = f1.unit,
                    toPlace = f1.toPlace,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    status_request = f1.status_request,
                    date = f1.date,
                };
                uTOs.Add(uTO);
            }

            foreach (var f1 in utofrfhStore)
            {
                UTO uTO = new UTO
                {
                    billId = f1.billId,
                    goodsName = f1.goodsName,
                    goodsId = f1.goodsId,
                    placeId = f1.placeId,
                    placeName = f1.placeName,
                    addressPlace = f1.addressPlace,
                    amount = f1.amount,
                    amountDelivery = f1.amountDelivery,
                    unit = f1.unit,
                    toPlace = f1.toPlace,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    status_request = f1.status_request,
                    date = f1.date,
                };
                uTOs.Add(uTO);
            }

            foreach (var f1 in utoproductStore)
            {
                UTO uTO = new UTO
                {
                    billId = f1.billId,
                    goodsName = f1.goodsName,
                    goodsId = f1.goodsId,
                    placeId = f1.placeId,
                    placeName = f1.placeName,
                    addressPlace = f1.addressPlace,
                    amount = f1.amount,
                    amountDelivery = f1.amountDelivery,
                    unit = f1.unit,
                    toPlace = f1.toPlace,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    status_request = f1.status_request,
                    date = f1.date,
                };
                uTOs.Add(uTO);
            }

            searchString = searchString.Trim();

            if (searchString == "Today")
            {
                return new JsonResult(uTOs.Where(t => t.date.Date == DateTime.Now.Date).ToList());
            }
            else if (searchString == "Last 7 Day")
            {
                var a = DateTime.Now.Date.AddDays(-7);
                return new JsonResult(uTOs.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= a).ToList());
            }
            else if (searchString == "Last Month")
            {
                var a = DateTime.Now.Date.AddMonths(-1);
                return new JsonResult(uTOs.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= a).ToList());
            }
            else if (searchString == "Last 12 Months")
            {
                var a = DateTime.Now.Date.AddYears(-1);
                return new JsonResult(uTOs.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= a).ToList());
            }
            else
            {
                return new JsonResult(uTOs.ToList());
            }

            return new JsonResult(uTOs.OrderByDescending(t => t.date));
        }

        public string id()
        {
            int result = context.UpToTransports.Count() + 1;
            if (result >= 0 && result < 10)
                return "UTT00" + result;
            else if (result >= 10 && result < 100)
                return "UTTP0" + result;
            else return "UTT" + result;
        }
    }
}
