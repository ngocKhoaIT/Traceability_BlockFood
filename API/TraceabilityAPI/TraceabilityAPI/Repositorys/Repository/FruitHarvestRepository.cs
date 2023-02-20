using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class FruitHarvestRepository : BaseRepository<FruitHarvest>, IFruitHarvest
    {
        protected DataDbContext context;

        public FruitHarvestRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.FruitHarvests.Where(t => t.harvestId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public decimal exchange(decimal a, string b)
        {
            if (b == "Tấn")
            {
                return a * 1000;
            }
            else if (b == "Tạ")
            {
                return a * 100;
            }
            else if (b == "Yến")
            {
                return a * 10;
            }
            else
            {
                return a * 1;
            }
        }

        public JsonResult ifDateHarvest(string id, string date)
        {
            var a = context.Fruits.Where(t => t.fruitId== id).Select(t=>t.date_plant).FirstOrDefault();
            var b = DateTime.Parse(date) - a;
            var d = "";
            if (b.TotalDays < 190)
            {
                d = "Chưa đủ thời gian để thu hoạch";
                return new JsonResult(d);
            } 
             else
                return new JsonResult( d = "Đủ thời gian" );
        }

        public JsonResult ifExceedDate(string date)
        {
            var b = DateTime.Now - DateTime.Parse(date);
            var d = "";
            if (b.TotalDays < 0)
            {
                d = "Thời gian không hợp lệ";
                return new JsonResult(d);
            }
            else
                return new JsonResult(d = "Thời gian hợp lệ");
        }

        public JsonResult getFruitHarvestsbyFilter(string id, string searchString)
        {
            IList<Fruit> hList = context.Fruits.Where(t => t._status == 1 && t.farmId == id).ToList();
            IList<FruitHarvest> fhList = context.FruitHarvests.Where(t => t._status == 1).OrderByDescending(t=>t.date_harvest).ToList();
            var result = fhList.Join(hList, h1 => h1.fruitId,
                h2 => h2.fruitId, (h1, h2) => new
                {
                    fruitId = h1.fruitId,
                    harvestId = h1.harvestId,
                    date_harvest = h1.date_harvest,
                    date_plant = h2.date_plant,
                    weight_harvest = h1.weight_harvest,
                    weight_harvest_first = h1.weight_harvest_first,
                    status_request = h1.status_request,
                    unit = h1.unit,
                    fruitName = h2.fruitName,
                });

            var search = searchString.Split("_");

            if (search[0] == "Today")
            {   
                decimal w_from = decimal.Parse(search[2]);
                decimal w_to = decimal.Parse(search[3]);
                return new JsonResult(result.Where(t => t.fruitName == search[1] || t.date_harvest.Date == DateTime.Now.Date || t.weight_harvest >= w_from && t.weight_harvest <= w_to).ToList());
            }
            else if (search[0] == "Last 7 Day")
            {
                var a = DateTime.Now.Date.AddDays(-7);

                decimal w_from = decimal.Parse(search[2]);
                decimal w_to = decimal.Parse(search[3]);
                return new JsonResult(result.Where(t => t.fruitName == search[1] || t.date_harvest.Date <= DateTime.Now.Date && t.date_harvest.Date >= a || t.weight_harvest >= w_from && t.weight_harvest <= w_to).ToList());
            }
            else if (search[0] == "Last Month")
            {
                var a = DateTime.Now.Date.AddMonths(-1);
                decimal w_from = decimal.Parse(search[2]);
                decimal w_to = decimal.Parse(search[3]);
                return new JsonResult(result.Where(t => t.fruitName == search[1] || t.date_harvest.Date <= DateTime.Now.Date && t.date_harvest.Date >= a || t.weight_harvest >= w_from && t.weight_harvest <= w_to).ToList());
            }
            else if (search[0] == "Last 12 Months")
            {
                var a = DateTime.Now.Date.AddYears(-1);
                decimal w_from = decimal.Parse(search[2]);
                decimal w_to = decimal.Parse(search[3]);
                return new JsonResult(result.Where(t => t.fruitName == search[1] || t.date_harvest.Date <= DateTime.Now.Date && t.date_harvest.Date >= a || t.weight_harvest >= w_from && t.weight_harvest <= w_to).ToList());
            }
            else
            {
                decimal w_from = decimal.Parse(search[2]);
                decimal w_to = decimal.Parse(search[3]);
                return new JsonResult(result.Where(t => t.fruitName == search[1] || t.weight_harvest >= w_from && t.weight_harvest <= w_to).ToList());
            }

        }

        public JsonResult getAllFruitHarvest(string id)
        {
            IList<Fruit> hList = context.Fruits.Where(t => t._status == 1 && t.farmId == id).OrderByDescending(t => t.date_create).ToList();
            IList<FruitHarvest> fhList = context.FruitHarvests.Where(t => t._status == 1 && t.weight_harvest > 0).ToList();
            var result = fhList.Join(hList, h1 => h1.fruitId,
                h2 => h2.fruitId, (h1, h2) => new 
                {
                    fruitId = h1.fruitId,
                    harvestId = h1.harvestId,
                    date_harvest = h1.date_harvest,
                    date_plant = h2.date_plant,
                    weight_harvest = h1.weight_harvest,
                    weight_harvest_first = h1.weight_harvest_first,
                    status_request = h1.status_request,
                    unit = h1.unit,
                    fruitName = h2.fruitName,
                }); 
            return new JsonResult(result.OrderByDescending(t=>t.date_harvest));
        }

        public IEnumerable<FruitHarvest> getAllFruitHarvestbyFarm(string id, string p)
        {
            IList<Farm> fList = context.Farms.Where(t => t._status == 1 && t.farmId == id).OrderByDescending(t => t.date_create).ToList();
            IList<Fruit> hList = context.Fruits.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
            IList<FruitHarvest> fhList = context.FruitHarvests.Where(t => t._status == 1 && t.weight_harvest > 0).OrderByDescending(t => t.date_create).ToList();
            
            var fqList = context.FarmRequests.Where(t => t._status == 1 && t.placeId == p).Select(t=>t.harvestId);

            var h = hList.Join(fList, h1 => h1.farmId,
                                          h2 => h2.farmId,
                                          (h1, h2) => new Fruit
                                          {
                                              farmId = h1.farmId,
                                              amount = h1.amount,
                                              _status = h1._status,
                                              date_create = h1.date_create,
                                              date_plant = h1.date_plant,
                                              date_update = h1.date_update,
                                              fertilizer = h1.fertilizer,
                                              fruitId = h1.fruitId,
                                              fruitName = h1.fruitName,
                                              pesticides = h1.pesticides,
                                              land = h1.land,
                                              seedId = h1.seedId,
                                              status_activity = h1.status_activity,
                                              technology = h1.technology,
                                              unit = h1.unit,
                                          });
            var f = fhList.Join(h, h1 => h1.fruitId,
                                          h2 => h2.fruitId,
                                          (h2, h1) => new FruitHarvest
                                          {
                                              date_create = h2.date_create,
                                              date_harvest = h2.date_harvest,
                                              date_update = h2.date_update,
                                              fruitId = h2.fruitId,
                                              harvestId = h2.harvestId,
                                              unit = h2.unit,
                                              weight_harvest = h2.weight_harvest,
                                              _status = h2._status,
                                          });

            return f.Where(t=> !fqList.Contains(t.harvestId));
        }

        public JsonResult getAllFruitHarvestbyFarmView(string id, string p)
        {
            IList<Farm> fList = context.Farms.Where(t => t._status == 1 && t.farmId == id).OrderByDescending(t => t.date_create).ToList();
            IList<Fruit> hList = context.Fruits.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
            IList<FruitHarvest> fhList = context.FruitHarvests.Where(t => t._status == 1 && t.weight_harvest > 0).OrderByDescending(t => t.date_create).ToList();

            var fqList = context.FarmRequests.Where(t => t._status == 1 && t.placeId == p).Select(t => t.harvestId);

            var h = hList.Join(fList, h1 => h1.farmId,
                                          h2 => h2.farmId,
                                          (h1, h2) => new Fruit
                                          {
                                              farmId = h1.farmId,
                                              amount = h1.amount,
                                              _status = h1._status,
                                              date_create = h1.date_create,
                                              date_plant = h1.date_plant,
                                              date_update = h1.date_update,
                                              fertilizer = h1.fertilizer,
                                              fruitId = h1.fruitId,
                                              fruitName = h1.fruitName,
                                              pesticides = h1.pesticides,
                                              land = h1.land,
                                              seedId = h1.seedId,
                                              status_activity = h1.status_activity,
                                              technology = h1.technology,
                                              unit = h1.unit,
                                          });
            var f = fhList.Join(h, h1 => h1.fruitId,
                                          h2 => h2.fruitId,
                                          (h2, h1) => new 
                                          {
                                              date_harvest = h2.date_harvest,
                                              fruitId = h2.fruitId,
                                              harvestId = h2.harvestId,
                                              unit = h2.unit,
                                              weight_harvest = h2.weight_harvest,
                                              date_plant = h1.date_plant,
                                              fruitName = h1.fruitName,
                                          });

            return new JsonResult(f.Where(t => !fqList.Contains(t.harvestId)));
        }


        public void sell(string id, decimal w)
        {
            var result = context.FruitHarvests.Where(t => t.harvestId == id).SingleOrDefault();
            if (result != null)
            {
                result.weight_harvest = w;
                context.Update(result);
            }

        }

        public string id()
        {
            int result = context.FruitHarvests.Count() + 1;
            if (result >= 0 && result < 10)
                return "TH00" + result;
            else if (result >= 10 && result < 100)
                return "TH0" + result;
            else return "TH" + result;
        }
    }
}
