using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class TransportRepository : BaseRepository<Transport>, ITransport
    {
        protected DataDbContext context;

        public TransportRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.Transports.Where(t => t.transportId == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<Transport> getAllTransport()
        {
            return context.Transports.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }

        public JsonResult gettransportsbyFilter(string searchString)
        {
            var transports = context.Transports.Where(t => t._status == 1).OrderByDescending(t => t.date_create);
            var persons = context.Persons;
            var transportLists = transports.Join(persons, t1 => t1.personInCharge, t2 => t2.identification
                                        , (t1, t2) => new {
                                            transportId = t1.transportId,
                                            transportName = t1.transportName,
                                            addressTransport = t1.addressTransport,
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
                    transportLists = transportLists.Where(t => t.date_create.Date == DateTime.Now.Date);
                }
                else if (searchString == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    transportLists = transportLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    transportLists = transportLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    transportLists = transportLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else
                {
                    transportLists = transportLists;
                }
            }
            return new JsonResult(transportLists.ToList());
        }

        public string id()
        {
            int result = context.Transports.Count() + 1;
            if (result >= 0 && result < 10)
                return "VC00" + result;
            else if (result >= 10 && result < 100)
                return "VC0" + result;
            else return "VC" + result;
        }
    }
}
