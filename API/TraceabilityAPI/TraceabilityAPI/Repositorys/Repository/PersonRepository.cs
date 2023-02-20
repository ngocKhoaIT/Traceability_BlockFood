using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class PersonRepository : BaseRepository<Person>, IPerson
    {
        protected DataDbContext context;

        public PersonRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.Persons.Where(t => t.identification == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<Person> getAllPerson()
        {
            return context.Persons.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }

        public IEnumerable<Person> getAllPersonbyD(string req)
        {
            return context.Persons.Where(t => t._status == 1 && t.working == req).OrderByDescending(t => t.date_create).ToList();
        }

        public JsonResult checkAge(string req)
        {
            var b = DateTime.Now.Year - DateTime.Parse(req).Year;
            if (b < 18)
                return new JsonResult("Chưa đủ 18 tuổi");
            else return new JsonResult("Đã đủ tuổi");
        }

        public IEnumerable<Person> getPersonsbyFilter(string searchString)
        {
            var persons = context.Persons.Where(t => t._status == 1).OrderByDescending(t => t.date_create);
            if (searchString == null)
            {

            }
            else
            {
                searchString = searchString.Trim();
                if (searchString == "Today")
                {
                    return persons.Where(t => t.date_create.Date == DateTime.Now.Date);
                }
                else if (searchString == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    return persons.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    return persons.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    return persons.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else
                {
                    return persons;
                }
            }
            return persons.ToList();
        }

        public string id()
        {
            int result = context.Persons.Count() + 1;
            if (result >= 0 && result < 10)
                return "CN00" + result;
            else if (result >= 10 && result < 100)
                return "CN0" + result;
            else return "CN" + result;
        }
    }
}
