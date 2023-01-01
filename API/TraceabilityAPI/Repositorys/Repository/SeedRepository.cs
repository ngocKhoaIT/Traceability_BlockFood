using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class SeedRepository : BaseRepository<Seed>, ISeed
    {
        protected DataDbContext context;

        public SeedRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(int id)
        {
            var result = context.Seeds.Where(t => t.seedId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<Seed> getAllSeed(string id)
        {
            return context.Seeds.Where(t => t._status == 1 && t.farmId == id).OrderByDescending(t => t.date_create).ToList();
        }

        public IEnumerable<Seed> getSeedsbyFilter(string id,string searchString)
        {
            var seeds = context.Seeds.Where(t => t._status == 1 && t.farmId == id);
            if (searchString == null)
            {

            }    
            else
            {
                searchString = searchString.Trim();
                if (searchString == "Today")
                {
                    return seeds.Where(t => t.date_create.Date == DateTime.Now.Date).ToList();
                }
                else if (searchString == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return seeds.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a).ToList();
                }
                else if (searchString == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return seeds.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a).ToList();
                }
                else if (searchString == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return seeds.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a).ToList();
                } 
                else
                {
                    return seeds.ToList();
                }
            }
            return seeds.ToList();
        }
    }
}
