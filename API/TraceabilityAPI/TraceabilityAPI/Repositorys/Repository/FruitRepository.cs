using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class FruitRepository : BaseRepository<Fruit>, IFruit
    {
        protected DataDbContext context;

        public FruitRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.Fruits.Where(t => t.fruitId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<Fruit> getAllFruit(string id)
        {
            return context.Fruits.Where(t => t._status == 1 && t.farmId == id).OrderByDescending(t=>t.date_create).ToList();
        }

        public IEnumerable<Fruit> getFruitsbyFilter(string id, string searchString)
        { 
            var fruits = context.Fruits.Where(t => t._status == 1 && t.farmId == id).OrderByDescending(t => t.date_create);
            var search = searchString.Split("_");
            if (search[0] == "" && search[1] == "")
            {
                return fruits.Where(t => t._status == 3);
            }
            else
            {
                var sId = int.Parse(search[1]);
                var seedS = context.Seeds.Where(t => t._status == 1 && t.farmId == id && t.seedId == sId).Select(x => x.seedId).ToList();

                search[0] = search[0].Trim();

                if (search[0] == "Today")
                {
                    return fruits.Where(t => seedS.Contains(t.seedId) && t.date_create.Date == DateTime.Now.Date).ToList();
                }
                else if (search[0] == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return fruits.Where(t => seedS.Contains(t.seedId) && t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a).ToList();
                }
                else if (search[0] == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return fruits.Where(t => seedS.Contains(t.seedId) && t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a).ToList();
                }
                else if (search[0] == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return fruits.Where(t => seedS.Contains(t.seedId) && t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a).ToList();
                }
                else
                {
                    return fruits.Where(t => seedS.Contains(t.seedId)).ToList();
                }
            }
        }

        public Fruit getIdFruit(string id)
        {
            return context.Fruits.Find(id);
        }

        public string id()
        {
            int result = context.Fruits.Count() + 1;
            if (result >= 0 && result < 10)
                return "TC00" + result;
            else if (result >= 10 && result < 100)
                return "TC0" + result;
            else return "TC" + result;
        }
    }
}
