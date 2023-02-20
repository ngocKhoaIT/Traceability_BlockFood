using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface ITransport : IBase<Transport>
    {
        string id();
        void Delete(string id);
        IEnumerable<Transport> getAllTransport();
        JsonResult gettransportsbyFilter(string searchString);
    }
}
