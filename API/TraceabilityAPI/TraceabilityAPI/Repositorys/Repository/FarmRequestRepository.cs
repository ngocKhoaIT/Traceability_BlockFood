using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Models.ModelViews;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class FarmRequestRepository : BaseRepository<FarmRequest>, IFarmRequest
    {
        protected DataDbContext context;

        public FarmRequestRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public FarmRequest getIdFQ(string h, string p, string f)
        {
            return context.FarmRequests.Where(t => t.harvestId == h && t.placeId == p && t.farmId == f).SingleOrDefault();
        }

        public void Delete(string id)
        {
            var result = context.FarmRequests.Where(t => t.harvestId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public JsonResult getAllFarmRequestByFarm(string id, string req, string searchString)
        {
            var fq = context.FarmRequests.Where(t => t.farmId == id && t.status_request == req).OrderByDescending(t => t.date_create);
            var fh = context.FruitHarvests.Where(t => t._status == 1);
            var fr = context.Fruits.Where(t=>t._status == 1);
            var farm = context.Farms.Where(t => t._status == 1 && t.farmId == id);
            var merchant = context.Merchants.Where(t => t._status == 1);
            var factory = context.Factorys.Where(t => t._status == 1);
            var store = context.Stores.Where(t => t._status == 1);

            var frfh = fr.Join(fh, f1 => f1.fruitId, f2 => f2.fruitId,
                                            (f1, f2) => new
                                            {
                                                fruitName= f1.fruitName,
                                                harvestId = f2.harvestId,
                                            });

            var flist = fq.Join(farm, f1 => f1.farmId,
                                        f2 => f2.farmId, (f1, f2) => new
                                        {
                                            farmId = f1.farmId,
                                            farm = f2.farmName,
                                            placeId = f1.placeId,
                                            harvestId = f1.harvestId,
                                            amount = f1.amount,
                                            unit = f1.unit,
                                            status_btn = f1.status_btn,
                                            date = f1.date_update
                                        });

            var fhlist = flist.Join(frfh, f1 => f1.harvestId, f2 => f2.harvestId,
                                        (f1, f2) => new
                                        {
                                            farmId = f1.farmId,
                                            harvestId = f1.harvestId,
                                            farm = f1.farm,
                                            placeId = f1.placeId,
                                            fruitName = f2.fruitName,
                                            amount = f1.amount,
                                            unit = f1.unit,
                                            status_btn = f1.status_btn,
                                            date = f1.date
                                        });

            var fmc = fhlist.Join(merchant, f1 => f1.placeId,
                                    f2 => f2.merchantId, (f1, f2) => new {
                                        farmId = f1.farmId,
                                        placeId = f1.placeId,
                                        harvestId = f1.harvestId,
                                        farm = f1.farm,
                                        placeName = f2.merchantName,
                                        fruitName = f1.fruitName,
                                        address = f2.addressMerchant,
                                        amount = f1.amount,
                                        unit = f1.unit,
                                        status_btn = f1.status_btn,
                                        date = f1.date
                                    });

            var ffa = fhlist.Join(factory, f1 => f1.placeId,
                                    f2 => f2.factoryId, (f1, f2) => new {
                                        farmId = f1.farmId,
                                        placeId = f1.placeId,
                                        harvestId = f1.harvestId,
                                        farm = f1.farm,
                                        placeName = f2.factoryName,
                                        fruitName = f1.fruitName,
                                        address = f2.addressFactory,
                                        amount = f1.amount,
                                        unit = f1.unit,
                                        status_btn = f1.status_btn,
                                        date = f1.date
                                    });

            var fst = fhlist.Join(store, f1 => f1.placeId,
                                    f2 => f2.storeId, (f1, f2) => new {
                                        farmId = f1.farmId,
                                        placeId = f1.placeId,
                                        harvestId = f1.harvestId,
                                        farm = f1.farm,
                                        placeName = f2.storeName,
                                        fruitName = f1.fruitName,
                                        address = f2.addressStore,
                                        amount = f1.amount,
                                        unit = f1.unit,
                                        status_btn = f1.status_btn,
                                        date = f1.date
                                    });

            List<FQ> fQs= new List<FQ>();
            foreach (var item in fmc)
            {
                FQ fQ = new FQ{
                    farmId = item.farmId,
                    haverstId = item.harvestId,
                    placeId = item.placeId,
                    farm = item.farm,
                    placeName = item.placeName,
                    address= item.address,
                    amount= item.amount,
                    fruitName= item.fruitName,
                    unit= item.unit,
                    status_btn = item.status_btn,
                    date = item.date
                };
                fQs.Add(fQ);
            }
            foreach (var item in ffa)
            {
                FQ fQ = new FQ
                {
                    farmId = item.farmId,
                    haverstId = item.harvestId,
                    placeId = item.placeId,
                    farm = item.farm,
                    placeName = item.placeName,
                    address = item.address,
                    amount = item.amount,
                    fruitName = item.fruitName,
                    unit = item.unit,
                    status_btn = item.status_btn,
                    date = item.date
                };
                fQs.Add(fQ);
            }
            foreach (var item in fst)
            {
                FQ fQ = new FQ
                {
                    farmId = item.farmId,
                    haverstId = item.harvestId,
                    placeId = item.placeId,
                    farm = item.farm,
                    placeName = item.placeName,
                    address = item.address,
                    amount = item.amount,
                    fruitName = item.fruitName,
                    unit = item.unit,
                    status_btn = item.status_btn,
                    date = item.date
                };
                fQs.Add(fQ);
            }

            var search = searchString.Split("_");

            if (req != "Chờ xác nhận")
            {
                if (search[0] == "Today")
                {
                    return new JsonResult(fQs.Where(t=> t.date.Date == DateTime.Now.Date && t.placeId.StartsWith(search[1])));
                }
                    else if (search[0] == "Last 7 Day")
                    {
                        var a = DateTime.Now.Date.AddDays(-7);
                        return new JsonResult(fQs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.placeId.StartsWith(search[1])));
                }
                    else if (search[0] == "Last Month")
                    {
                        var a = DateTime.Now.Date.AddMonths(-1);
                        return new JsonResult(fQs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.placeId.StartsWith(search[1])));
                }
                    else if (search[0] == "Last 12 Months")
                    {
                        var a = DateTime.Now.Date.AddYears(-1);
                        return new JsonResult(fQs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.placeId.StartsWith(search[1])));
                }
                    else
                    {
                        return new JsonResult(fQs.Where(t => t.placeId.StartsWith(search[1])));
                }
            }

            return new JsonResult(fQs);
        }

        public JsonResult getAllFarmRequestByPlace(string p, string req, string searchString)
        {
            var fq = context.FarmRequests.Where(t => t.placeId == p && t.status_request == req).OrderByDescending(t => t.date_create);
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
                                            });

            var flist = fq.Join(farm, f1 => f1.farmId,
                                        f2 => f2.farmId, (f1, f2) => new
                                        {
                                            farmId = f1.farmId,
                                            farm = f2.farmName,
                                            placeId = f1.placeId,
                                            harvestId = f1.harvestId,
                                            amount = f1.amount,
                                            unit = f1.unit,
                                            status_btn = f1.status_btn,
                                            date = f1.date_update,
                                        });

            var fhlist = flist.Join(frfh, f1 => f1.harvestId, f2 => f2.harvestId,
                                        (f1, f2) => new
                                        {
                                            farmId = f1.farmId,
                                            harvestId = f1.harvestId,
                                            farm = f1.farm,
                                            placeId = f1.placeId,
                                            fruitName = f2.fruitName,
                                            amount = f1.amount,
                                            unit = f1.unit,
                                            status_btn = f1.status_btn,
                                            date = f1.date,
                                        });

            var fmc = fhlist.Join(merchant, f1 => f1.placeId,
                                    f2 => f2.merchantId, (f1, f2) => new {
                                        farmId = f1.farmId,
                                        placeId = f1.placeId,
                                        harvestId = f1.harvestId,
                                        farm = f1.farm,
                                        placeName = f2.merchantName,
                                        fruitName = f1.fruitName,
                                        address = f2.addressMerchant,
                                        amount = f1.amount,
                                        unit = f1.unit,
                                        status_btn = f1.status_btn,
                                        date = f1.date,
                                    });

            var ffa = fhlist.Join(factory, f1 => f1.placeId,
                                    f2 => f2.factoryId, (f1, f2) => new {
                                        farmId = f1.farmId,
                                        placeId = f1.placeId,
                                        harvestId = f1.harvestId,
                                        farm = f1.farm,
                                        placeName = f2.factoryName,
                                        fruitName = f1.fruitName,
                                        address = f2.addressFactory,
                                        amount = f1.amount,
                                        unit = f1.unit,
                                        status_btn = f1.status_btn,
                                        date = f1.date,
                                    });

            var fst = fhlist.Join(store, f1 => f1.placeId,
                                    f2 => f2.storeId, (f1, f2) => new {
                                        farmId = f1.farmId,
                                        placeId = f1.placeId,
                                        harvestId = f1.harvestId,
                                        farm = f1.farm,
                                        placeName = f2.storeName,
                                        fruitName = f1.fruitName,
                                        address = f2.addressStore,
                                        amount = f1.amount,
                                        unit = f1.unit,
                                        status_btn = f1.status_btn,
                                        date = f1.date,
                                    });

            List<FQ> fQs = new List<FQ>();

            if (p.StartsWith("NM") == true)
            {
                foreach (var item in ffa)
                {
                    FQ fQ = new FQ
                    {
                        farmId = item.farmId,
                        haverstId = item.harvestId,
                        placeId = item.placeId,
                        farm = item.farm,
                        placeName = item.placeName,
                        address = item.address,
                        amount = item.amount,
                        fruitName = item.fruitName,
                        unit = item.unit,
                        status_btn = item.status_btn,
                        date = item.date,
                    };
                    fQs.Add(fQ);
                }
            }
            else if (p.StartsWith("TL") == true)
            {
                foreach (var item in fmc)
                {
                    FQ fQ = new FQ
                    {
                        farmId = item.farmId,
                        haverstId = item.harvestId,
                        placeId = item.placeId,
                        farm = item.farm,
                        placeName = item.placeName,
                        address = item.address,
                        amount = item.amount,
                        fruitName = item.fruitName,
                        unit = item.unit,
                        status_btn = item.status_btn,
                        date = item.date,
                    };
                    fQs.Add(fQ);
                }
            }    
            else
            {
                foreach (var item in fst)
                {
                    FQ fQ = new FQ
                    {
                        farmId = item.farmId,
                        haverstId = item.harvestId,
                        placeId = item.placeId,
                        farm = item.farm,
                        placeName = item.placeName,
                        address = item.address,
                        amount = item.amount,
                        fruitName = item.fruitName,
                        unit = item.unit,
                        status_btn = item.status_btn,
                        date = item.date,
                    };
                    fQs.Add(fQ);
                }
            }

            var search = searchString.Split("_");

            if (req == "Đã hủy")
            {
                if (search[0] == "Today")
                {
                    return new JsonResult(fQs.Where(t => t.date.Date == DateTime.Now.Date && t.farmId == search[1]));
                }
                else if (search[0] == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return new JsonResult(fQs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.farmId == search[1]));
                }
                else if (search[0] == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return new JsonResult(fQs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.farmId == search[1]));
                }
                else if (search[0] == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return new JsonResult(fQs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.farmId == search[1]));
                }
                else
                {
                    return new JsonResult(fQs.Where(t => t.farmId == search[1]));
                }
            }
            else if(req == "Đã xác nhận")
            {
                if (search[0] == "Today")
                {
                    return new JsonResult(fQs.Where(t => t.date.Date == DateTime.Now.Date && t.status_btn == search[1]));
                }
                else if (search[0] == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return new JsonResult(fQs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.status_btn == search[1]));
                }
                else if (search[0] == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return new JsonResult(fQs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.status_btn == search[1]));
                }
                else if (search[0] == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return new JsonResult(fQs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.status_btn == search[1]));
                }
                else
                {
                    return new JsonResult(fQs.Where(t => t.status_btn == search[1]));
                }
            }    

            return new JsonResult(fQs);
        }

        public void updateStatus(string id,string p, string req)
        {
            var result = context.FarmRequests.Where(t => t.harvestId == id && t.placeId == p).SingleOrDefault();
            if (result != null)
            {
                result.status_request = req;
                result.date_update = DateTime.Now;
                context.Update(result);
            }
        }

        public void updateStatusBtn(string id, string p, string req)
        {
            var result = context.FarmRequests.Where(t => t.harvestId == id && t.placeId == p).SingleOrDefault();
            if (result != null)
            {
                result.status_btn = req;
                result.date_update = DateTime.Now;
                context.Update(result);
            }
        }

        public FarmRequest getStatusbyPlace(string h, string p)
        {
            return context.FarmRequests.Where(t => t.harvestId == h && t.placeId == p).FirstOrDefault();
        }
    }
}
