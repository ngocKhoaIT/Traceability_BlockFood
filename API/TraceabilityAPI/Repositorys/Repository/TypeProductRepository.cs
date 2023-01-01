using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class TypeProductRepository : BaseRepository<TypeProduct>, ITypeProduct
    {
        protected DataDbContext context;

        public TypeProductRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(int id)
        {
            var result = context.TypeProducts.Where(t => t.typeProductId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<TypeProduct> getTypeProductsbyFilter(string id, string searchString)
        {
            var types = context.TypeProducts.Where(t => t._status == 1 && t.factoryId == id);
            if (searchString == null)
            {

            }
            else
            {
                searchString = searchString.Trim();
                if (searchString == "Today")
                {
                    return types.Where(t => t.date_create.Date == DateTime.Now.Date).ToList();
                }
                else if (searchString == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return types.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a).ToList();
                }
                else if (searchString == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return types.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a).ToList();
                }
                else if (searchString == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return types.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a).ToList();
                }
                else
                {
                    return types.ToList();
                }
            }
            return types.ToList();
        }

        public IEnumerable<TypeProduct> getAllTypeProduct()
        {
            return context.TypeProducts.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }
    }
}
