using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class MerchantRepository : BaseRepository<Merchant>, IMerchant
    {
        protected DataDbContext context;
        public MerchantRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.Merchants.Where(t => t.merchantId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<Merchant> getAllMerchant()
        {
            return context.Merchants.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }

        public JsonResult getMerchantsbyFilter(string searchString)
        {
            var merchants = context.Merchants.Where(t => t._status == 1).OrderByDescending(t=>t.date_create);
            var persons = context.Persons;
            var merchantLists = merchants.Join(persons, t1 => t1.traderId, t2 => t2.identification
                                        , (t1, t2) => new {
                                            merchantId = t1.merchantId,
                                            merchantName = t1.merchantName,
                                            addressMerchant = t1.addressMerchant,
                                            note = t1.note,
                                            traderId = t1.traderId,
                                            traderName = t2.lastName + " " + t2.firstName,
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
                    merchantLists = merchantLists.Where(t => t.date_create.Date == DateTime.Now.Date);
                }
                else if (searchString == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    merchantLists = merchantLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    merchantLists = merchantLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    merchantLists = merchantLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else
                {
                    merchantLists = merchantLists;
                }
            }
            return new JsonResult(merchantLists.ToList());
        }

        public string id()
        {
            int result = context.Merchants.Count() + 1;
            if (result >= 0 && result < 10)
                return "TL00" + result;
            else if (result >= 10 && result < 100)
                return "TL0" + result;
            else return "TL" + result;
        }
    }
}
