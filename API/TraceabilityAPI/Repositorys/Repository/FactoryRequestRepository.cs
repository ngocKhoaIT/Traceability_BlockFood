using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Models.ModelViews;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class FactoryRequestRepository : BaseRepository<FactoryRequest>, IFactoryRequest
    {
        protected DataDbContext context;

        public FactoryRequestRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.FactoryRequests.Where(t => t.productId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public JsonResult getAllFactoryRequestByFactory(string id, string req, string searchString)
        {
            var fq = context.FactoryRequests.Where(t => t._status == 1 && t.factoryId == id && t.status_request == req).OrderByDescending(t=>t.date_create);
            var factory = context.Factorys.Where(t=>t._status == 1);
            var store = context.Stores.Where(t => t._status == 1);
            var product = context.Products.Where(t => t._status == 1);

            var factorylist = fq.Join(factory, f1 => f1.factoryId, f2 => f2.factoryId,
                                                        (f1, f2) => new { 
                                                            productId = f1.productId,
                                                            factoryId = f1.factoryId,
                                                            factoryName = f2.factoryName,
                                                            addressFactory = f2.addressFactory,
                                                            placeId= f1.placeId,
                                                            amount= f1.amount,
                                                            unit = f1.unit,
                                                            status_btn = f1.status_btn,
                                                            date = f1.date_create
                                                        });

            var productlist = factorylist.Join(product, f1 => f1.productId, f2 => f2.productId,
                                                            (f1, f2) => new {
                                                                productId = f1.productId,
                                                                productName = f2.productName,
                                                                mfg_date = f2.mfg_date,
                                                                exp_date = f2.exp_date,
                                                                factoryId = f1.factoryId,
                                                                factoryName = f1.factoryName,
                                                                addressFactory = f1.addressFactory,
                                                                placeId = f1.placeId,
                                                                amount = f1.amount,
                                                                unit = f1.unit,
                                                                status_btn = f1.status_btn,
                                                                date = f1.date
                                                            });

            var storelist = productlist.Join(store, f1 => f1.placeId, f2 => f2.storeId, 
                                                        (f1, f2) => new {
                                                            productId = f1.productId,
                                                            productName = f1.productName,
                                                            mfg_date = f1.mfg_date,
                                                            exp_date = f1.exp_date,
                                                            factoryId = f1.factoryId,
                                                            factoryName = f1.factoryName,
                                                            addressFactory = f1.addressFactory,
                                                            placeId = f1.placeId,
                                                            placeName = f2.storeName,
                                                            addressPlace = f2.addressStore,
                                                            amount = f1.amount,
                                                            unit = f1.unit,
                                                            status_btn = f1.status_btn,
                                                            date = f1.date
                                                        });

            var search = searchString.Split("_");

            if (req != "Chờ xác nhận")
            {
                if (search[0] == "Today")
                {
                    return new JsonResult(storelist.Where(t => t.date.Date == DateTime.Now.Date && t.placeId == search[1]));
                }
                else if (search[0] == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return new JsonResult(storelist.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.placeId == search[1]));
                }
                else if (search[0] == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return new JsonResult(storelist.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.placeId == search[1]));
                }
                else if (search[0] == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return new JsonResult(storelist.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.placeId == search[1]));
                }
                else
                {
                    return new JsonResult(storelist.Where(t => t.placeId == search[1]));
                }
            }

            return new JsonResult(storelist);
        }

        public JsonResult getAllFactoryRequestByPlace(string p, string req, string searchString)
        {
            var fq = context.FactoryRequests.Where(t => t._status == 1 && t.placeId == p && t.status_request == req).OrderByDescending(t => t.date_create);
            var factory = context.Factorys.Where(t => t._status == 1);
            var store = context.Stores.Where(t => t._status == 1);
            var product = context.Products.Where(t => t._status == 1);

            var factorylist = fq.Join(factory, f1 => f1.factoryId, f2 => f2.factoryId,
                                                        (f1, f2) => new {
                                                            productId = f1.productId,
                                                            factoryId = f1.factoryId,
                                                            factoryName = f2.factoryName,
                                                            addressFactory = f2.addressFactory,
                                                            placeId = f1.placeId,
                                                            amount = f1.amount,
                                                            unit = f1.unit,
                                                            status_btn = f1.status_btn,
                                                            date = f1.date_update
                                                        });

            var productlist = factorylist.Join(product, f1 => f1.productId, f2 => f2.productId,
                                                            (f1, f2) => new {
                                                                productId = f1.productId,
                                                                productName = f2.productName,
                                                                mfg_date = f2.mfg_date,
                                                                exp_date = f2.exp_date,
                                                                factoryId = f1.factoryId,
                                                                factoryName = f1.factoryName,
                                                                addressFactory = f1.addressFactory,
                                                                placeId = f1.placeId,
                                                                amount = f1.amount,
                                                                unit = f1.unit,
                                                                status_btn = f1.status_btn,
                                                                date = f1.date
                                                            });

            var storelist = productlist.Join(store, f1 => f1.placeId, f2 => f2.storeId,
                                                        (f1, f2) => new {
                                                            productId = f1.productId,
                                                            productName = f1.productName,
                                                            mfg_date = f1.mfg_date,
                                                            exp_date = f1.exp_date,
                                                            factoryId = f1.factoryId,
                                                            factoryName = f1.factoryName,
                                                            addressFactory = f1.addressFactory,
                                                            placeId = f1.placeId,
                                                            placeName = f2.storeName,
                                                            addressPlace = f2.addressStore,
                                                            amount = f1.amount,
                                                            unit = f1.unit,
                                                            status_btn = f1.status_btn,
                                                            date = f1.date
                                                        });

            var search = searchString.Split("_");

            if (req == "Đã hủy")
            {
                if (search[0] == "Today")
                {
                    return new JsonResult(storelist.Where(t => t.date.Date == DateTime.Now.Date && t.factoryId == search[1]));
                }
                else if (search[0] == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return new JsonResult(storelist.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.factoryId == search[1]));
                }
                else if (search[0] == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return new JsonResult(storelist.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.factoryId == search[1]));
                }
                else if (search[0] == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return new JsonResult(storelist.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.factoryId == search[1]));
                }
                else
                {
                    return new JsonResult(storelist.Where(t => t.factoryId == search[1]));
                }
            }
            else if (req == "Đã xác nhận")
            {
                if (search[0] == "Today")
                {
                    return new JsonResult(storelist.Where(t => t.date.Date == DateTime.Now.Date && t.status_btn == search[1]));
                }
                else if (search[0] == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return new JsonResult(storelist.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.status_btn == search[1]));
                }
                else if (search[0] == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return new JsonResult(storelist.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.status_btn == search[1]));
                }
                else if (search[0] == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return new JsonResult(storelist.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.status_btn == search[1]));
                }
                else
                {
                    return new JsonResult(storelist.Where(t => t.status_btn == search[1]));
                }
            }

            return new JsonResult(storelist);
        }



        public void updateStatus(string id, string p, string req)
        {
            var result = context.FactoryRequests.Where(t => t.productId == id && t.placeId == p).SingleOrDefault();
            if (result != null)
            {
                result.status_request = req;
                result.date_update= DateTime.Now;
                context.Update(result);
            }
        }

        public FactoryRequest getStatusbyPlace(string h, string p)
        {
            return context.FactoryRequests.Where(t => t.productId == h && t.placeId == p).FirstOrDefault();
        }

        public void updateStatusBtn(string id, string p, string req)
        {
            var result = context.FactoryRequests.Where(t => t.productId == id && t.placeId == p).SingleOrDefault();
            if (result != null)
            {
                result.status_btn = req;
                result.date_update = DateTime.Now;
                context.Update(result);
            }
        }
    }
}
