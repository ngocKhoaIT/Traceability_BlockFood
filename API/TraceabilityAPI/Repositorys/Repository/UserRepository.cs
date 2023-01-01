using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class UserRepository : BaseRepository<UserLogin>, IUser
    {
        protected DataDbContext context;
        public UserRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public void Delete(string id)
        {
            var result = context.UserLogins.Where(t => t.userName == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<UserLogin> getAllUser()
        {
            return context.UserLogins.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }

        public IEnumerable<UserLogin> getAllUserbyRole(string r)
        {
            return context.UserLogins.Where(t => t._status == 1 && t._role == r).OrderByDescending(t => t.date_create).ToList();
        }

        public UserLogin checkLogin(string user, string password)
        {
            //var result = context.UserLogins.Where(u => u.pass == password && u.userName == user && u._status == 1).OrderByDescending(t => t.date_create).Count();
            //if (result == 0)
            //    return new UserLogin();
            return context.UserLogins.Find(user);
        }

        public JsonResult getUsersbyFilter(string searchString)
        {
            var users = context.UserLogins.Where(t => t._status == 1).OrderByDescending(t => t.date_create);
            var persons = context.Persons;
            var userLists = users.Join(persons, t1 => t1.represent, t2 => t2.identification
                                        , (t1, t2) => new {
                                            userName = t1.userName,
                                            password = t1._passwordHash,
                                            role = t1._role,
                                            represent = t1.represent,
                                            workingFor = t1.workingFor,
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
                    userLists = userLists.Where(t => t.date_create.Date == DateTime.Now.Date);
                }
                else if (searchString == "Last 7 Day")
                {
                    var a = DateTime.Now.Date.AddDays(-7);
                    userLists = userLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last Month")
                {
                    var a = DateTime.Now.Date.AddMonths(-1);
                    userLists = userLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else if (searchString == "Last 12 Months")
                {
                    var a = DateTime.Now.Date.AddYears(-1);
                    userLists = userLists.Where(t => t.date_create.Date <= DateTime.Now.Date && t.date_create.Date >= a);
                }
                else
                {
                    userLists = userLists;
                }
            }
            return new JsonResult(userLists.ToList());
        }

        public UserLogin GetId(string id)
        {
            return context.UserLogins.Find(id);
        }
    }
}
