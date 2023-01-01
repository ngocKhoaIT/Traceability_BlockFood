using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class FarmRepository : BaseRepository<Farm>, IFarm
    {
        protected DataDbContext context;

        public FarmRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.Farms.Where(t => t.farmId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<Farm> getAllFarm()
        {
            return context.Farms.Where(t => t._status == 1).OrderBy(t => t.farmName).ToList();
        }

        public JsonResult getFarmsbyFilter(string searchString)
        {
            var farms = context.Farms.Where(t=> t._status == 1).OrderByDescending(t=>t.date_create);
            var persons = context.Persons;
            var farmLists = farms.Join(persons, t1 => t1.farmerId, t2 => t2.identification
                                        , (t1, t2) => new {
                                            farmId = t1.farmId,
                                            farmName = t1.farmName,
                                            addressFarm = t1.addressFarm,
                                            note = t1.note,
                                            farmerId = t1.farmerId,
                                            farmerName = t2.lastName + " " + t2.firstName,
                                            date_create = t1.date_create
                                        });
            if (searchString == null)
            {

            }
            else
            {
                searchString = searchString.Trim();
                if (searchString == "Today")
                {
                    farmLists = farmLists.Where(t => t.date_create.Date == DateTime.Now.Date);
                }
                else if (searchString == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    farmLists = farmLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    farmLists = farmLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    farmLists = farmLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else
                {
                    farmLists = farmLists;
                }
            }
            return new JsonResult(farmLists.ToList());
        }

        public IEnumerable<Farm> getAllFarmHarvest()
        {
            IList<FruitHarvest> fhList = new List<FruitHarvest>();
            IList<Fruit> hList = context.Fruits.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
            IList<Farm> fList = context.Farms.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();

            var h = context.FruitHarvests.Where(t => t.weight_harvest > 0).Select(t => new FruitHarvest
            {
                unit = t.unit,
                date_create = t.date_create,
                date_harvest = t.date_harvest,
                fruitId = t.fruitId,
                date_update = t.date_update,
                harvestId = t.harvestId,
                weight_harvest = t.weight_harvest,
                _status = t._status
            });
            var f = hList.Join(h, h1 => h1.fruitId,
                                          h2 => h2.fruitId,
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
                                          }).DistinctBy(t=> t.fruitId);
            var fh = fList.Join(f, f1 => f1.farmId, f2 => f2.farmId,
                                            (f1, f2) => new Farm
                                            {
                                                farmId = f1.farmId,
                                                farmName = f1.farmName,
                                                addressFarm = f1.addressFarm,
                                                farmerId = f1.farmerId,
                                                note = f1.note,
                                                date_create = f1.date_create,
                                                date_update = f1.date_update,
                                                _status = f1._status,
                                            });
            return fh.DistinctBy(t=>t.farmId);
        }

        public JsonResult getAllFarmHarvestbyMerchant()
        {
            IList<FruitHarvest> fhList = new List<FruitHarvest>();
            IList<Fruit> hList = context.Fruits.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
            IList<Farm> fList = context.Farms.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();

            var h = context.FruitHarvests.Where(t => t.weight_harvest > 0).Select(t => new FruitHarvest
            {
                unit = t.unit,
                date_create = t.date_create,
                date_harvest = t.date_harvest,
                fruitId = t.fruitId,
                date_update = t.date_update,
                harvestId = t.harvestId,
                weight_harvest = t.weight_harvest,
                _status = t._status
            });
            var f = hList.Join(h, h1 => h1.fruitId,
                                          h2 => h2.fruitId,
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
                                          }).DistinctBy(t => t.fruitId);
            var fh = fList.Join(f, f1 => f1.farmId, f2 => f2.farmId,
                                            (f1, f2) => new Farm
                                            {
                                                farmId = f1.farmId,
                                                farmName = f1.farmName,
                                                addressFarm = f1.addressFarm,
                                                farmerId = f1.farmerId,
                                                note = f1.note,
                                                date_create = f1.date_create,
                                                date_update = f1.date_update,
                                                _status = f1._status,
                                            });
            IList<Person> p = context.Persons.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
            var ff = p.Join(fh, f1 => f1.identification,
                             f2 => f2.farmerId, (f1, f2) => new {
                                 farmId = f2.farmId,
                                 farmName = f2.farmName,
                                 addressFarm = f2.addressFarm,
                                 farmerId = f2.farmerId,
                                 note = f2.note,
                                 farmerName = f1.lastName + " " + f1.firstName,
                                 phoneNumber = f1.phoneNumber,
                                 email = f1.email,
                             });
            return new JsonResult(ff.DistinctBy(t => t.farmId));
        }

        public string id()
        {
            int result = context.Farms.Count() + 1;
            if (result >= 0 && result < 10)
                return "NT00" + result;
            else if (result >= 10 && result < 100)
                return "NT0" + result;
            else return "NT" + result;
        }
    }
}
