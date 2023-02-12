using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;
using ZXing;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class ProductRepository : BaseRepository<Product>, IProduct
    {
        protected DataDbContext context;

        public ProductRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.Products.Where(t => t.productId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public void sell(string id, int w)
        {
            var result = context.Products.Where(t => t.productId == id).SingleOrDefault();
            if (result != null)
            {
                result.amountProduct = w;
                result.date_update = DateTime.Now;
                context.Update(result);
            }

        }

        public JsonResult checkDate(string mfg, string exp)
        {
            DateTime date_mfg = DateTime.Parse(mfg);
            DateTime date_exp = DateTime.Parse(exp);

            var date = date_exp - date_mfg;
            if (date.TotalDays <= 0)
            {
                return new JsonResult("Không hợp lệ");
            }
            else return new JsonResult("Hợp lệ");
        }

        public IEnumerable<Product> getAllProductbyFactory(string id, string searchString)
        {
            var fList = context.Factorys.Where(t => t._status == 1 && t.factoryId == id).OrderByDescending(t => t.date_create).ToList();
            var fp = context.Products.Where(t => t._status == 1).ToList();

            var f = fList.Join(fp,f1=>f1.factoryId,f2 => f2.factoryId
                                 ,(f1,f2) => new Product
                                 {
                                    factoryId = f2.factoryId,
                                    date_create = f2.date_create,
                                    _status = f2._status,
                                    amountProduct = f2.amountProduct,
                                    date_update = f2.date_update,
                                    elementOfProduct = f2.elementOfProduct,
                                    exp_date = f2.exp_date,
                                    harvestId = f2.harvestId,
                                    humidity = f2.humidity,
                                    mfg_date = f2.mfg_date,
                                    net_weight = f2.net_weight,
                                    procedureOfProduct = f2.procedureOfProduct,
                                    productId = f2.productId,
                                    productName = f2.productName,
                                    temperature = f2.temperature,
                                    typeProductId = f2.typeProductId,
                                    unit=f2.unit,
                                 });

            var search = searchString.Split("_");

            if (search[0] == "Today")
            {
                int type = int.Parse(search[1]);
                decimal w_from = decimal.Parse(search[2]);
                decimal w_to = decimal.Parse(search[3]);
                return f.Where(t => t.typeProductId == type || t.date_create.Date == DateTime.Now.Date || t.amountProduct >= w_from && t.amountProduct <= w_to).ToList();
            }
            else if (search[0] == "Last 7 Day")
            {
                var a = DateTime.Now.Date.AddDays(-7);

                int type = int.Parse(search[1]);
                decimal w_from = decimal.Parse(search[2]);
                decimal w_to = decimal.Parse(search[3]);
                return f.Where(t => t.typeProductId == type || t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a || t.amountProduct >= w_from && t.amountProduct <= w_to).ToList();
            }
            else if (search[0] == "Last Month")
            {
                var a = DateTime.Now.Date.AddMonths(-1);

                int type = int.Parse(search[1]);
                decimal w_from = decimal.Parse(search[2]);
                decimal w_to = decimal.Parse(search[3]);
                return f.Where(t => t.typeProductId == type || t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a || t.amountProduct >= w_from && t.amountProduct <= w_to).ToList();
            }
            else if (search[0] == "Last 12 Months")
            {
                var a = DateTime.Now.Date.AddYears(-1);

                int type = int.Parse(search[1]);
                decimal w_from = decimal.Parse(search[2]);
                decimal w_to = decimal.Parse(search[3]);
                return f.Where(t => t.typeProductId == type || t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a || t.amountProduct >= w_from && t.amountProduct <= w_to).ToList();
            }
            else
            {
                int type = int.Parse(search[1]);
                decimal w_from = decimal.Parse(search[2]);
                decimal w_to = decimal.Parse(search[3]);
                return f.Where(t => t.typeProductId == type ||  t.amountProduct >= w_from && t.amountProduct <= w_to).ToList();
            }

            return f;
        }

        public JsonResult getAllProductbyFactoryView(string id, string p)
        {
            var fList = context.Factorys.Where(t => t._status == 1 && t.factoryId == id);
            var fhList = context.Products.Where(t => t._status == 1 && t.amountProduct > 0).OrderByDescending(t => t.date_create).ToList();

            var fqList = context.FactoryRequests.Where(t => t._status == 1 && t.placeId == p).Select(t => t.productId);

            var h = fhList.Join(fList, h1 => h1.factoryId,
                                          h2 => h2.factoryId,
                                          (h1, h2) => new 
                                          {
                                              productId = h1.productId,
                                              productName = h1.productName,
                                              factoryId = h2.factoryId,
                                              factoryName = h2.factoryName,
                                              addressFactory = h2.addressFactory,
                                              harvestId = h1.harvestId,
                                              amountProduct = h1.amountProduct,
                                              typeProductId = h1.typeProductId,
                                              mfg_date = h1.mfg_date,
                                              exp_date = h1.exp_date,
                                              net_weight = h1.net_weight,
                                              unit = h1.unit,
                                              temperature = h1.temperature,
                                              humidity = h1.humidity,
                                              procedureOfProduct = h1.procedureOfProduct,
                                              elementOfProduct = h1.elementOfProduct,
                                          });

            return new JsonResult(h.Where(t => !fqList.Contains(t.productId)));
        }

        public IEnumerable<Product> getAllProduct()
        {
            return context.Products.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }

        public Product getIdProduct(string id)
        {
            return context.Products.Find(id);
        }

        public string id()
        {
            int result = context.Products.Count() + 1;
            if (result >= 0 && result < 10)
                return "SP00" + result;
            else if (result >= 10 && result < 100)
                return "SP0" + result;
            else return "SP" + result;
        }
    }
}
