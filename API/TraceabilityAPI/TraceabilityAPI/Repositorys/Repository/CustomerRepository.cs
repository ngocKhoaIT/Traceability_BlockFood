using Microsoft.EntityFrameworkCore;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class CustomerRepository : BaseRepository<Customer>, ICustomer
    {
        private DataDbContext context;
        public CustomerRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public Customer checkLogin(string user, string password)
        {
            var result = context.Customers.Where(u => u.pass == password && u.userName == user && u._status == 1).OrderByDescending(t => t.date_create).Count();
            if (result == 0)
                return new Customer();
            return context.Customers.Find(user);
        }

        public void Delete(string id)
        {
            var result = context.Customers.Where(t => t.userName == id).SingleOrDefault();
            if (result != null)
            {
                result._status = 0;
                context.Update(result);
            }
        }

        public IEnumerable<Customer> getAllCustomer()
        {
            return context.Customers.Where(t => t._status == 1).OrderByDescending(t => t.date_create).ToList();
        }

    }
}
