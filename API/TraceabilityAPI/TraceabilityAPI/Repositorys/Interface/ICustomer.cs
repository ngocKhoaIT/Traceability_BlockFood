using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface ICustomer : IBase<Customer>
    {
        Customer checkLogin(string user, string password);
        void Delete(string id);
        IEnumerable<Customer> getAllCustomer();
    }
}
