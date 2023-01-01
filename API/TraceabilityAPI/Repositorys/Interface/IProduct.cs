using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IProduct : IBase<Product>
    {
        void sell(string id, int w);
        string id();
        void Delete(string id);
        IEnumerable<Product> getAllProduct();
        IEnumerable<Product> getAllProductbyFactory(string id, string search);
        JsonResult getAllProductbyFactoryView(string id, string p);
    }
}
