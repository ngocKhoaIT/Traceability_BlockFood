using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IStore : IBase<Store>
    {
        IEnumerable<Store> getStoresbyFilter(string searchString);
        string id();
        void Delete(string id);
        IEnumerable<Store> getAllStore();
    }
}
