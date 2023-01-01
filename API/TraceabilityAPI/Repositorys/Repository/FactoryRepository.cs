using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class FactoryRepository : BaseRepository<Factory>, IFactory
    {
        protected DataDbContext context;

        public FactoryRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.Factorys.Where(t => t.factoryId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<Factory> getAllFactorybyProduct()
        {
            IList<Factory> fList = context.Factorys.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();

            var p = context.Products.Where(t => t._status == 1 && t.amountProduct > 0);
            var fa = fList.Join(p, p1 => p1.factoryId, p2 => p2.factoryId
                                     ,(p1,p2) => new Factory
                                     {
                                         factoryId = p1.factoryId,
                                         factoryName = p1.factoryName,
                                         addressFactory = p1.addressFactory,
                                         email = p1.email,
                                         personInCharge = p1.personInCharge,
                                         note = p1.note ,
                                         _status = p1._status,
                                         date_create = p1.date_create,
                                         date_update = p1.date_update
                                     }).DistinctBy(t=>t.factoryId);

            
            return fa;
        }

        public IEnumerable<Factory> getAllFactory()
        {
            return context.Factorys.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }

        public JsonResult getFactorysbyFilter(string searchString)
        {
            var factorys = context.Factorys.Where(t => t._status == 1).OrderByDescending(t => t.date_create);
            var persons = context.Persons;
            var factoryLists = factorys.Join(persons, t1 => t1.personInCharge, t2 => t2.identification
                                        , (t1, t2) => new {
                                            factoryId = t1.factoryId,
                                            factoryName = t1.factoryName,
                                            addressFactory = t1.addressFactory,
                                            note = t1.note,
                                            email = t1.email,
                                            personInCharge = t1.personInCharge,
                                            personName = t2.lastName + " " + t2.firstName,
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
                    factoryLists = factoryLists.Where(t => t.date_create.Date == DateTime.Now.Date);
                }
                else if (searchString == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    factoryLists = factoryLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    factoryLists = factoryLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    factoryLists = factoryLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else
                {
                    factoryLists = factoryLists;
                }
            }
            return new JsonResult(factoryLists.ToList());
        }

        public string id()
        {
            int result = context.Factorys.Count() + 1;
            if (result >= 0 && result < 10)
                return "NM00" + result;
            else if (result >= 10 && result < 100)
                return "NM0" + result;
            else return "NM" + result;
        }
    }
}
