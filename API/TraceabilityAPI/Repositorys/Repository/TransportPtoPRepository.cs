using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Models.ModelViews;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class TransportPtoPRepository : BaseRepository<TransportPtoP>, ITransportPtoP
    {
        protected DataDbContext context;

        public TransportPtoPRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.TransportPtoPs.Where(t => t.billId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public void updateStatus(string id)
        {
            var detail = context.DetailTransportPtoPs.Where(t => t.itemBillId == id).ToList();

            var transport = context.TransportPtoPs.ToList();
            var r = transport.Join(detail, t1 => t1.billId, t2 => t2.billId,
                                            (t1, t2) => new TransportPtoP
                                            {
                                                billId = t2.billId,
                                                transportId = t1.transportId,
                                                date_update= t1.date_update,
                                                status_request= t1.status_request,
                                                date_create= t1.date_create,
                                                humidity= t1.humidity,
                                                placeId= t1.placeId,
                                                temperature= t1.temperature,
                                                _status = t1._status
                                            }).Select(t=>t.billId).SingleOrDefault();

            var result = context.TransportPtoPs.Where(t => t.billId == r).SingleOrDefault();

            if (result != null)
            {
                result.status_request = "Đã giao";
                result.date_update = DateTime.Now;
                context.Update(result);
            }
        }

        public IEnumerable<TransportPtoP> getAllTransportPtoP()
        {
            return context.TransportPtoPs.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }

        public JsonResult getAllTransportPtoPbyTransport(string id, string searchString)
        {
            var tPtoP = context.TransportPtoPs.Where(t => t._status == 1 && t.transportId == id).OrderByDescending(t=>t.date_create);
            var transport = context.Transports;
            var merchant = context.Merchants.Where(t => t._status == 1);
            var factory = context.Factorys.Where(t => t._status == 1);
            var store = context.Stores.Where(t => t._status == 1);

            var tt = tPtoP.Join(transport, t1 => t1.transportId, t2 => t2.transportId,
                                            (t1, t2) => new
                                            {
                                                billId = t1.billId,
                                                transportId = t1.transportId,
                                                transportName = t2.transportName,
                                                placeId = t1.placeId,
                                                humidity = t1.humidity,
                                                temperature = t1.temperature,
                                                status_request = t1.status_request,
                                                date = t1.date_create,
                                            });

            var ttMerchant = tt.Join(merchant, t1 => t1.placeId, t2 => t2.merchantId,
                                                (t1, t2) => new {
                                                    billId = t1.billId,
                                                    transportId = t1.transportId,
                                                    transportName = t1.transportName,
                                                    placeId = t1.placeId,
                                                    placeName = t2.merchantName,
                                                    addressPlace = t2.addressMerchant,
                                                    humidity = t1.humidity,
                                                    temperature = t1.temperature,
                                                    status_request = t1.status_request,
                                                    date = t1.date,
                                                });

            var ttFactory = tt.Join(factory, t1 => t1.placeId, t2 => t2.factoryId,
                                               (t1, t2) => new {
                                                   billId = t1.billId,
                                                   transportId = t1.transportId,
                                                   transportName = t1.transportName,
                                                   placeId = t1.placeId,
                                                   placeName = t2.factoryName,
                                                   addressPlace = t2.addressFactory,
                                                   humidity = t1.humidity,
                                                   temperature = t1.temperature,
                                                   status_request = t1.status_request,
                                                   date = t1.date,
                                               });

            var ttStore = tt.Join(store, t1 => t1.placeId, t2 => t2.storeId,
                                               (t1, t2) => new {
                                                   billId = t1.billId,
                                                   transportId = t1.transportId,
                                                   transportName = t1.transportName,
                                                   placeId = t1.placeId,
                                                   placeName = t2.storeName,
                                                   addressPlace = t2.addressStore,
                                                   humidity = t1.humidity,
                                                   temperature = t1.temperature,
                                                   status_request = t1.status_request,
                                                   date = t1.date,
                                               });

            List<TPtoP> TPtoPs = new List<TPtoP>();

            foreach (var t1 in ttMerchant)
            {
                TPtoP ptoP = new TPtoP
                {
                    billId = t1.billId,
                    transportId = t1.transportId,
                    transportName = t1.transportName,
                    placeId = t1.placeId,
                    placeName = t1.placeName,
                    addressPlace = t1.addressPlace,
                    humidity = t1.humidity,
                    temperature = t1.temperature,
                    status_request = t1.status_request,
                    date = t1.date,
                };
                TPtoPs.Add(ptoP);
            }

            foreach (var t1 in ttFactory)
            {
                TPtoP ptoP = new TPtoP
                {
                    billId = t1.billId,
                    transportId = t1.transportId,
                    transportName = t1.transportName,
                    placeId = t1.placeId,
                    placeName = t1.placeName,
                    addressPlace = t1.addressPlace,
                    humidity = t1.humidity,
                    temperature = t1.temperature,
                    status_request = t1.status_request,
                    date = t1.date,
                };
                TPtoPs.Add(ptoP);
            }

            foreach (var t1 in ttStore)
            {
                TPtoP ptoP = new TPtoP
                {
                    billId = t1.billId,
                    transportId = t1.transportId,
                    transportName = t1.transportName,
                    placeId = t1.placeId,
                    placeName = t1.placeName,
                    addressPlace = t1.addressPlace,
                    humidity = t1.humidity,
                    temperature = t1.temperature,
                    status_request = t1.status_request,
                    date = t1.date,
                };
                TPtoPs.Add(ptoP);
            }

            var search = searchString.Split("_");

                if (search[0] == "Today")
                {
                    return new JsonResult(TPtoPs.Where(t => t.date.Date == DateTime.Now.Date && t.placeId.StartsWith(search[1])));
                }
                else if (search[0] == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return new JsonResult(TPtoPs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.placeId.StartsWith(search[1])));
                }
                else if (search[0] == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return new JsonResult(TPtoPs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.placeId.StartsWith(search[1])));
                }
                else if (search[0] == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return new JsonResult(TPtoPs.Where(t => t.date.Date >= a && t.date.Date <= DateTime.Now.Date && t.placeId.StartsWith(search[1])));
                }
                else
                {
                    return new JsonResult(TPtoPs.Where(t => t.placeId.StartsWith(search[1])));
                }

            return new JsonResult(TPtoPs);
        }

        public bool check(string id)
        {
            var checkT = context.DetailTransportPtoPs.Where(t => t.itemBillId == id).SingleOrDefault();

            if (checkT != null)
                return true;
            else
                return false;
        }

        public string id()
        {
            int result = context.TransportPtoPs.Count() + 1;
            if (result >= 0 && result < 10)
                return "TMB00" + result;
            else if (result >= 10 && result < 100)
                return "TMB0" + result;
            else return "TMB" + result;
        }
    }
}
