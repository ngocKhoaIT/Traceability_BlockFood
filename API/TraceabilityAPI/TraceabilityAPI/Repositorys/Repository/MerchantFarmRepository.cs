using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Models.ModelViews;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class MerchantFarmRepository : BaseRepository<MerchantFarm>, IMerchantFarm
    {
        protected DataDbContext context;

        public MerchantFarmRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.MerchantFarms.Where(t => t.billId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public void updateWeight(string id, decimal w)
        {
            var result = context.MerchantFarms.Where(t => t.billId == id).SingleOrDefault();
            if (result != null)
            {
                result.weight_delivery = w;
                result.date_update = DateTime.Now;
                context.Update(result);
            }
        }

        public void UpdateStatus(string id, string req)
        {
            var result = context.MerchantFarms.Where(t => t.billId == id).SingleOrDefault();
            if (result != null)
            {
                result.status_request = req;
                result.date_update = DateTime.Now;
                context.Update(result);
            }
        }

        public IEnumerable<MerchantFarm> getAllMerchantFarm()
        {
            return context.MerchantFarms.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }

        public JsonResult getAllMerchantFarmbyTransport()
        {
            var mf = context.MerchantFarms.Where(t => t._status == 1 && t.status_request == "Đang tìm").OrderByDescending(t=>t.date_create);
            var fh = context.FruitHarvests.Where(t => t._status == 1);
            var fr = context.Fruits.Where(t => t._status == 1);
            var farm = context.Farms.Where(t => t._status == 1);
            var merchant = context.Merchants.Where(t => t._status == 1);
            var factory = context.Factorys.Where(t => t._status == 1);
            var store = context.Stores.Where(t => t._status == 1);

            var frfh = fr.Join(fh, f1 => f1.fruitId, f2 => f2.fruitId,
                                            (f1, f2) => new
                                            {
                                                fruitName = f1.fruitName,
                                                harvestId = f2.harvestId,
                                                farmId = f1.farmId,
                                            });
            var flist = frfh.Join(farm, f1=> f1.farmId,
                                        f2=> f2.farmId, (f1,f2) => new
                                        {
                                            fruitName = f1.fruitName,
                                            harvestId = f1.harvestId,
                                            farmId = f1.farmId,
                                            farmName = f2.farmName,
                                            addressFarm = f2.addressFarm,
                                        });

            var mflist = flist.Join(mf, f1 => f1.harvestId, f2 => f2.harvestId,
                                        (f1,f2) => new
                                        {
                                            billId = f2.billId,
                                            fruitName = f1.fruitName,
                                            harvestId = f1.harvestId,
                                            farmId = f1.farmId,
                                            farmName = f1.farmName,
                                            addressFarm = f1.addressFarm,
                                            merchantId = f2.merchantId,
                                            toPlace = f2.toPlace,
                                            weight = f2.weight_mf,
                                            weightDelivery = f2.weight_delivery,
                                            unit = f2.unit,
                                            date = f2.date_create,
                                        });

            var mlist = mflist.Join(merchant, f1 => f1.merchantId,
                                               f2 => f2.merchantId, (f1,f2) => new
                                               {
                                                   billId = f1.billId,
                                                   fruitName = f1.fruitName,
                                                   harvestId = f1.harvestId,
                                                   farmId = f1.farmId,
                                                   farmName = f1.farmName,
                                                   addressFarm = f1.addressFarm,
                                                   merchantId = f1.merchantId,
                                                   toPlace = f1.toPlace,
                                                   weight = f1.weight,
                                                   weightDelivery = f1.weightDelivery,
                                                   unit = f1.unit,
                                                   merchantName = f2.merchantName,
                                                   addressMerchant = f2.addressMerchant,
                                                   traderId = f2.traderId,
                                                   date = f1.date,
                                               });

            var fst = mlist.Join(store, f1 => f1.toPlace,
                                          f2 => f2.storeId, (f1, f2) => new
                                          {
                                              billId = f1.billId,
                                              fruitName = f1.fruitName,
                                              harvestId = f1.harvestId,
                                              farmId = f1.farmId,
                                              farmName = f1.farmName,
                                              addressFarm = f1.addressFarm,
                                              merchantId = f1.merchantId,
                                              toPlace = f1.toPlace,
                                              weight = f1.weight,
                                              weightDelivery = f1.weightDelivery,
                                              unit = f1.unit,
                                              merchantName = f1.merchantName,
                                              addressMerchant = f1.addressMerchant,
                                              traderId = f1.traderId,
                                              toPlaceName = f2.storeName,
                                              addresstoPlace = f2.addressStore,
                                              date = f1.date,
                                          });

            var ffa = mlist.Join(factory, f1 => f1.toPlace,
                                          f2 => f2.factoryId, (f1, f2) => new
                                          {
                                              billId = f1.billId,
                                              fruitName = f1.fruitName,
                                              harvestId = f1.harvestId,
                                              farmId = f1.farmId,
                                              farmName = f1.farmName,
                                              addressFarm = f1.addressFarm,
                                              merchantId = f1.merchantId,
                                              toPlace = f1.toPlace,
                                              weight = f1.weight,
                                              weightDelivery = f1.weightDelivery,
                                              unit = f1.unit,
                                              merchantName = f1.merchantName,
                                              addressMerchant = f1.addressMerchant,
                                              traderId = f1.traderId,
                                              toPlaceName = f2.factoryName,
                                              addresstoPlace = f2.addressFactory,
                                              date = f1.date,
                                          });

            List<MF> mFs = new List<MF>();

            foreach(var f1 in fst)
            {
                MF mF = new MF
                {
                    billId = f1.billId,
                    fruitName = f1.fruitName,
                    harvestId = f1.harvestId,
                    farmId = f1.farmId,
                    farmName = f1.farmName,
                    addressFarm = f1.addressFarm,
                    merchantId = f1.merchantId,
                    toPlace = f1.toPlace,
                    weight = f1.weight,
                    weightDelivery = f1.weightDelivery,
                    unit = f1.unit,
                    merchantName = f1.merchantName,
                    addressMerchant = f1.addressMerchant,
                    traderId = f1.traderId,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    date = f1.date,
                };
                mFs.Add(mF);
            }

            foreach (var f1 in ffa)
            {
                MF mF = new MF
                {
                    billId = f1.billId,
                    fruitName = f1.fruitName,
                    harvestId = f1.harvestId,
                    farmId = f1.farmId,
                    farmName = f1.farmName,
                    addressFarm = f1.addressFarm,
                    merchantId = f1.merchantId,
                    toPlace = f1.toPlace,
                    weight = f1.weight,
                    weightDelivery = f1.weightDelivery,
                    unit = f1.unit,
                    merchantName = f1.merchantName,
                    addressMerchant = f1.addressMerchant,
                    traderId = f1.traderId,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    date = f1.date,
                };
                mFs.Add(mF);
            }

            return new JsonResult(mFs.OrderByDescending(t=>t.date));
        }

        public JsonResult getAllMerchantFarmbyFactory(string id, string req)
        {
            var mf = context.MerchantFarms.Where(t => t._status == 1 && t.status_request == req && t.toPlace == id).OrderByDescending(t => t.date_create);
            var fh = context.FruitHarvests.Where(t => t._status == 1);
            var fr = context.Fruits.Where(t => t._status == 1);
            var farm = context.Farms.Where(t => t._status == 1);
            var merchant = context.Merchants.Where(t => t._status == 1);
            var factory = context.Factorys.Where(t => t._status == 1 );
            var store = context.Stores.Where(t => t._status == 1);

            var frfh = fr.Join(fh, f1 => f1.fruitId, f2 => f2.fruitId,
                                            (f1, f2) => new
                                            {
                                                fruitName = f1.fruitName,
                                                harvestId = f2.harvestId,
                                                farmId = f1.farmId,
                                            });
            var flist = frfh.Join(farm, f1 => f1.farmId,
                                        f2 => f2.farmId, (f1, f2) => new
                                        {
                                            fruitName = f1.fruitName,
                                            harvestId = f1.harvestId,
                                            farmId = f1.farmId,
                                            farmName = f2.farmName,
                                            addressFarm = f2.addressFarm,
                                        });

            var mflist = flist.Join(mf, f1 => f1.harvestId, f2 => f2.harvestId,
                                        (f1, f2) => new
                                        {
                                            billId = f2.billId,
                                            fruitName = f1.fruitName,
                                            harvestId = f1.harvestId,
                                            farmId = f1.farmId,
                                            farmName = f1.farmName,
                                            addressFarm = f1.addressFarm,
                                            merchantId = f2.merchantId,
                                            toPlace = f2.toPlace,
                                            weight = f2.weight_mf,
                                            weightDelivery = f2.weight_delivery,
                                            unit = f2.unit,
                                            date = f2.date_create,
                                        });

            var mlist = mflist.Join(merchant, f1 => f1.merchantId,
                                               f2 => f2.merchantId, (f1, f2) => new
                                               {
                                                   billId = f1.billId,
                                                   fruitName = f1.fruitName,
                                                   harvestId = f1.harvestId,
                                                   farmId = f1.farmId,
                                                   farmName = f1.farmName,
                                                   addressFarm = f1.addressFarm,
                                                   merchantId = f1.merchantId,
                                                   toPlace = f1.toPlace,
                                                   weight = f1.weight,
                                                   weightDelivery = f1.weightDelivery,
                                                   unit = f1.unit,
                                                   merchantName = f2.merchantName,
                                                   addressMerchant = f2.addressMerchant,
                                                   traderId = f2.traderId,
                                                   date = f1.date,
                                               });

            var ffa = mlist.Join(factory, f1 => f1.toPlace,
                                          f2 => f2.factoryId, (f1, f2) => new
                                          {
                                              billId = f1.billId,
                                              fruitName = f1.fruitName,
                                              harvestId = f1.harvestId,
                                              farmId = f1.farmId,
                                              farmName = f1.farmName,
                                              addressFarm = f1.addressFarm,
                                              merchantId = f1.merchantId,
                                              toPlace = f1.toPlace,
                                              weight = f1.weight,
                                              weightDelivery = f1.weightDelivery,
                                              unit = f1.unit,
                                              merchantName = f1.merchantName,
                                              addressMerchant = f1.addressMerchant,
                                              traderId = f1.traderId,
                                              toPlaceName = f2.factoryName,
                                              addresstoPlace = f2.addressFactory,
                                              date = f1.date,
                                          });

            var fst = mlist.Join(store, f1 => f1.toPlace,
                                          f2 => f2.storeId, (f1, f2) => new
                                          {
                                              billId = f1.billId,
                                              fruitName = f1.fruitName,
                                              harvestId = f1.harvestId,
                                              farmId = f1.farmId,
                                              farmName = f1.farmName,
                                              addressFarm = f1.addressFarm,
                                              merchantId = f1.merchantId,
                                              toPlace = f1.toPlace,
                                              weight = f1.weight,
                                              weightDelivery = f1.weightDelivery,
                                              unit = f1.unit,
                                              merchantName = f1.merchantName,
                                              addressMerchant = f1.addressMerchant,
                                              traderId = f1.traderId,
                                              toPlaceName = f2.storeName,
                                              addresstoPlace = f2.addressStore,
                                              date = f1.date,
                                          });

            List<MF> mFs = new List<MF>();

            foreach (var f1 in ffa)
            {
                MF mF = new MF
                {
                    billId = f1.billId,
                    fruitName = f1.fruitName,
                    harvestId = f1.harvestId,
                    farmId = f1.farmId,
                    farmName = f1.farmName,
                    addressFarm = f1.addressFarm,
                    merchantId = f1.merchantId,
                    toPlace = f1.toPlace,
                    weight = f1.weight,
                    weightDelivery = f1.weightDelivery,
                    unit = f1.unit,
                    merchantName = f1.merchantName,
                    addressMerchant = f1.addressMerchant,
                    traderId = f1.traderId,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    date = f1.date,
                };
                mFs.Add(mF);
            }

            foreach (var f1 in fst)
            {
                MF mF = new MF
                {
                    billId = f1.billId,
                    fruitName = f1.fruitName,
                    harvestId = f1.harvestId,
                    farmId = f1.farmId,
                    farmName = f1.farmName,
                    addressFarm = f1.addressFarm,
                    merchantId = f1.merchantId,
                    toPlace = f1.toPlace,
                    weight = f1.weight,
                    weightDelivery = f1.weightDelivery,
                    unit = f1.unit,
                    merchantName = f1.merchantName,
                    addressMerchant = f1.addressMerchant,
                    traderId = f1.traderId,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    date = f1.date,
                };
                mFs.Add(mF);
            }

            return new JsonResult(mFs.OrderByDescending(t => t.date));
        }

        public JsonResult getAllMerchantFarmbyFactorybyFilter(string id, string req, string searchString)
        {
            var mf = context.MerchantFarms.Where(t => t._status == 1 && t.status_request == req && t.toPlace == id).OrderByDescending(t => t.date_create);
            var fh = context.FruitHarvests.Where(t => t._status == 1);
            var fr = context.Fruits.Where(t => t._status == 1);
            var farm = context.Farms.Where(t => t._status == 1);
            var merchant = context.Merchants.Where(t => t._status == 1);
            var factory = context.Factorys.Where(t => t._status == 1);
            var store = context.Stores.Where(t => t._status == 1);

            var frfh = fr.Join(fh, f1 => f1.fruitId, f2 => f2.fruitId,
                                            (f1, f2) => new
                                            {
                                                fruitName = f1.fruitName,
                                                harvestId = f2.harvestId,
                                                farmId = f1.farmId,
                                            });
            var flist = frfh.Join(farm, f1 => f1.farmId,
                                        f2 => f2.farmId, (f1, f2) => new
                                        {
                                            fruitName = f1.fruitName,
                                            harvestId = f1.harvestId,
                                            farmId = f1.farmId,
                                            farmName = f2.farmName,
                                            addressFarm = f2.addressFarm,
                                        });

            var mflist = flist.Join(mf, f1 => f1.harvestId, f2 => f2.harvestId,
                                        (f1, f2) => new
                                        {
                                            billId = f2.billId,
                                            fruitName = f1.fruitName,
                                            harvestId = f1.harvestId,
                                            farmId = f1.farmId,
                                            farmName = f1.farmName,
                                            addressFarm = f1.addressFarm,
                                            merchantId = f2.merchantId,
                                            toPlace = f2.toPlace,
                                            weight = f2.weight_mf,
                                            weightDelivery = f2.weight_delivery,
                                            unit = f2.unit,
                                            date = f2.date_create,
                                        });

            var mlist = mflist.Join(merchant, f1 => f1.merchantId,
                                               f2 => f2.merchantId, (f1, f2) => new
                                               {
                                                   billId = f1.billId,
                                                   fruitName = f1.fruitName,
                                                   harvestId = f1.harvestId,
                                                   farmId = f1.farmId,
                                                   farmName = f1.farmName,
                                                   addressFarm = f1.addressFarm,
                                                   merchantId = f1.merchantId,
                                                   toPlace = f1.toPlace,
                                                   weight = f1.weight,
                                                   weightDelivery = f1.weightDelivery,
                                                   unit = f1.unit,
                                                   merchantName = f2.merchantName,
                                                   addressMerchant = f2.addressMerchant,
                                                   traderId = f2.traderId,
                                                   date = f1.date,
                                               });

            var ffa = mlist.Join(factory, f1 => f1.toPlace,
                                          f2 => f2.factoryId, (f1, f2) => new
                                          {
                                              billId = f1.billId,
                                              fruitName = f1.fruitName,
                                              harvestId = f1.harvestId,
                                              farmId = f1.farmId,
                                              farmName = f1.farmName,
                                              addressFarm = f1.addressFarm,
                                              merchantId = f1.merchantId,
                                              toPlace = f1.toPlace,
                                              weight = f1.weight,
                                              weightDelivery = f1.weightDelivery,
                                              unit = f1.unit,
                                              merchantName = f1.merchantName,
                                              addressMerchant = f1.addressMerchant,
                                              traderId = f1.traderId,
                                              toPlaceName = f2.factoryName,
                                              addresstoPlace = f2.addressFactory,
                                              date = f1.date,
                                          });

            var fst = mlist.Join(store, f1 => f1.toPlace,
                                          f2 => f2.storeId, (f1, f2) => new
                                          {
                                              billId = f1.billId,
                                              fruitName = f1.fruitName,
                                              harvestId = f1.harvestId,
                                              farmId = f1.farmId,
                                              farmName = f1.farmName,
                                              addressFarm = f1.addressFarm,
                                              merchantId = f1.merchantId,
                                              toPlace = f1.toPlace,
                                              weight = f1.weight,
                                              weightDelivery = f1.weightDelivery,
                                              unit = f1.unit,
                                              merchantName = f1.merchantName,
                                              addressMerchant = f1.addressMerchant,
                                              traderId = f1.traderId,
                                              toPlaceName = f2.storeName,
                                              addresstoPlace = f2.addressStore,
                                              date = f1.date,
                                          });

            List<MF> mFs = new List<MF>();

            foreach (var f1 in ffa)
            {
                MF mF = new MF
                {
                    billId = f1.billId,
                    fruitName = f1.fruitName,
                    harvestId = f1.harvestId,
                    farmId = f1.farmId,
                    farmName = f1.farmName,
                    addressFarm = f1.addressFarm,
                    merchantId = f1.merchantId,
                    toPlace = f1.toPlace,
                    weight = f1.weight,
                    weightDelivery = f1.weightDelivery,
                    unit = f1.unit,
                    merchantName = f1.merchantName,
                    addressMerchant = f1.addressMerchant,
                    traderId = f1.traderId,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    date = f1.date,
                };
                mFs.Add(mF);
            }

            foreach (var f1 in fst)
            {
                MF mF = new MF
                {
                    billId = f1.billId,
                    fruitName = f1.fruitName,
                    harvestId = f1.harvestId,
                    farmId = f1.farmId,
                    farmName = f1.farmName,
                    addressFarm = f1.addressFarm,
                    merchantId = f1.merchantId,
                    toPlace = f1.toPlace,
                    weight = f1.weight,
                    weightDelivery = f1.weightDelivery,
                    unit = f1.unit,
                    merchantName = f1.merchantName,
                    addressMerchant = f1.addressMerchant,
                    traderId = f1.traderId,
                    toPlaceName = f1.toPlaceName,
                    addresstoPlace = f1.addresstoPlace,
                    date = f1.date,
                };
                mFs.Add(mF);
            }

            searchString = searchString.Trim();

            if (searchString == "Today")
            {
                return new JsonResult(mFs.Where(t => t.date.Date == DateTime.Now.Date).ToList());
            }
            else if (searchString == "Last 7 Day")
            {
                var a = DateTime.Now.Date.AddDays(-7);
                return new JsonResult(mFs.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= a).ToList());
            }
            else if (searchString == "Last Month")
            {
                var a = DateTime.Now.Date.AddMonths(-1);
                return new JsonResult(mFs.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= a).ToList());
            }
            else if (searchString == "Last 12 Months")
            {
                var a = DateTime.Now.Date.AddYears(-1);
                return new JsonResult(mFs.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= a).ToList());
            }
            else
            {
                return new JsonResult(mFs.ToList());
            }

            return new JsonResult(mFs.OrderByDescending(t => t.date));
        }

        public IEnumerable<MerchantFarm> getAllMerchantFarmbyPlace(string id)
        {
            var mf = context.MerchantFarms.Where(t => t._status == 1 && t.toPlace == id).OrderByDescending(t => t.date_create).ToList();
            var idi = context.UserLogins.Where(t => t._status == 1 && t.workingFor == id).Select(t => t._role).SingleOrDefault();
            if (idi == "Nhà máy sản xuất")
            {
                var inv = context.InventoryFactories.Where(t => t.factoryId == id).Select(t => t.harvestId);
                return context.MerchantFarms.Where(t => t._status == 1 && t.toPlace == id && !inv.Contains(t.harvestId)).OrderByDescending(t => t.date_create).ToList();
            }
            else
            {
                var inv = context.Inventories.Where(t => t.storeId == id).Select(t => t.goodsId);
                return context.MerchantFarms.Where(t => t._status == 1 && t.toPlace == id && !inv.Contains(t.harvestId)).OrderByDescending(t => t.date_create).ToList();
            }
        }

        public string id()
        {
            int result = context.MerchantFarms.Count() + 1;
            if (result >= 0 && result < 10)
                return "BMFP00" + result;
            else if (result >= 10 && result < 100)
                return "BMFP0" + result;
            else return "BMFP" + result;
        }
    }
}
