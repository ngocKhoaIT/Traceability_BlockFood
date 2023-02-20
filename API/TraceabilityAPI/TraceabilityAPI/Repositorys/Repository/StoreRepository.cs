using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class StoreRepository : BaseRepository<Store>, IStore
    {
        protected DataDbContext context;

        public StoreRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.Stores.Where(t => t.storeId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<Store> getAllStore()
        {
            return context.Stores.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }

        public IEnumerable<Store> getStoresbyFilter(string searchString)
        {
            var stores = context.Stores.Where(t => t._status == 1).OrderByDescending(t => t.date_create);
            if (searchString == null)
            {

            }
            else
            {
                searchString = searchString.Trim();
                if (searchString == "Today")
                {
                    return stores.Where(t => t.date_create.Date == DateTime.Now.Date);
                }
                else if (searchString == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return stores.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return stores.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return stores.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else
                {
                    return stores;
                }
            }
            return stores.ToList();
        }

        public string id()
        {
            int result = context.Stores.Count() + 1;
            if (result >= 0 && result < 10)
                return "CH00" + result;
            else if (result >= 10 && result < 100)
                return "CH0" + result;
            else return "CH" + result;
        }
    }
}
