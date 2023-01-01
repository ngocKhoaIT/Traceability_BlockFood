using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IFactory : IBase<Factory>
    {
        string id();
        void Delete(string id);
        IEnumerable<Factory> getAllFactory();
        IEnumerable<Factory> getAllFactorybyProduct();
        JsonResult getFactorysbyFilter(string searchString);
    }
}
