using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class InventoryFactoryRepository : BaseRepository<InventoryFactory>, IInventoryFactory
    {
        protected DataDbContext context;

        public InventoryFactoryRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.InventoryFactories.Where(t => t.factoryId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<InventoryFactory> getAllInventoryFactory()
        {
            return context.InventoryFactories.Where(t => t._status == 1).ToList();
        }

        public JsonResult getAllInventoryFactorybyProduct(string id)
        {
            var iveFactory = context.InventoryFactories.Where(t => t._status == 1 && t.amount > 0).OrderByDescending(t => t.date_create);
            var factory = context.Factorys.Where(t => t._status == 1 && t.factoryId == id);
            var fharvest = context.FruitHarvests.Where(t => t._status == 1);
            var fruit = context.Fruits.Where(t => t._status == 1);
            var farm = context.Farms.Where(t => t._status == 1);

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

            var iveharvest = farmlist.Join(iveFactory, f1 => f1.harvestId, f2 => f2.harvestId,
                                            (f1, f2) => new {
                                                id = f2.id,
                                                fruitName = f1.fruitName,
                                                harvestId = f1.harvestId,
                                                farmId = f1.farmId,
                                                farmName = f1.farmName,
                                                addressFarm = f1.addressFarm,
                                                factoryId = f2.factoryId,
                                                amount = f2.amount,
                                                unit = f2.unit,
                                                date = f2.date_create,
                                            });

            var factorylist = iveharvest.Join(factory, f1 => f1.factoryId, f2 => f2.factoryId,
                                                (f1, f2) => new
                                                {
                                                    id = f1.id,
                                                    fruitName = f1.fruitName + " " + f1.id,
                                                    harvestId = f1.harvestId,
                                                    farmId = f1.farmId,
                                                    farmName = f1.farmName,
                                                    addressFarm = f1.addressFarm,
                                                    factoryId = f1.factoryId,
                                                    factoryName = f2.factoryName,
                                                    addressFactory = f2.addressFactory,
                                                    amount = f1.amount,
                                                    unit = f1.unit,
                                                    date = f1.date,
                                                });

            return new JsonResult(factorylist);
        }

        public JsonResult getAllInventoryFactorybyFactory(string id, string searchString)
        {
            var iveFactory = context.InventoryFactories.Where(t => t._status == 1).OrderByDescending(t=>t.date_create);
            var factory = context.Factorys.Where(t => t._status == 1 && t.factoryId == id);
            var fharvest = context.FruitHarvests.Where(t => t._status == 1);
            var fruit = context.Fruits.Where(t => t._status == 1);
            var farm = context.Farms.Where(t => t._status == 1);

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

            var iveharvest = farmlist.Join(iveFactory, f1 => f1.harvestId, f2 => f2.harvestId,
                                            (f1, f2) => new {
                                                id = f2.id,
                                                fruitName = f1.fruitName,
                                                harvestId = f1.harvestId,
                                                farmId = f1.farmId,
                                                farmName = f1.farmName,
                                                addressFarm = f1.addressFarm,
                                                factoryId = f2.factoryId,
                                                amount = f2.amount,
                                                unit = f2.unit,
                                                date = f2.date_create,
                                            });

            var factorylist = iveharvest.Join(factory, f1 => f1.factoryId, f2 => f2.factoryId,
                                                (f1, f2) => new
                                                {
                                                    id = f1.id,
                                                    fruitName = f1.fruitName + " " + f1.id,
                                                    harvestId = f1.harvestId,
                                                    farmId = f1.farmId,
                                                    farmName = f1.farmName,
                                                    addressFarm = f1.addressFarm,
                                                    factoryId = f1.factoryId,
                                                    factoryName = f2.factoryName,
                                                    addressFactory = f2.addressFactory,
                                                    amount = f1.amount,
                                                    unit = f1.unit,
                                                    date = f1.date,
                                                });

            if (searchString == null)
            {

            }
            else
            {
                searchString = searchString.Trim();
                var search = searchString.Split("_");

                if (search[0] == "Today")
                {
                    return new JsonResult(factorylist.Where(t => t.date.Date == DateTime.Now.Date && t.farmId == search[1]).ToList());
                }
                else if (search[0] == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return new JsonResult(factorylist.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= a && t.farmId == search[1]).ToList());
                }
                else if (search[0] == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return new JsonResult(factorylist.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= a && t.farmId == search[1] ).ToList());
                }
                else if (search[0] == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return new JsonResult(factorylist.Where(t => t.date.Date <= DateTime.Now.Date && t.date.Date >= a && t.farmId == search[1]).ToList());
                }
                else
                {
                    return new JsonResult(factorylist.Where(t=> t.farmId == search[1]).ToList());
                }
            }

            return new JsonResult(factorylist);
        }

        public void useIF(string id, decimal w)
        {
            var result = context.InventoryFactories.Where(t => t.id == id).SingleOrDefault();
            if (result != null)
            {
                result.amount = w;
                result.date_update = DateTime.Now;
                context.Update(result);
            }

        }

        public string id()
        {
            int result = context.InventoryFactories.Count() + 1;
            if (result >= 0 && result < 10)
                return "IF00" + result;
            else if (result >= 10 && result < 100)
                return "IF0" + result;
            else return "IF" + result;
        }
    }
}
