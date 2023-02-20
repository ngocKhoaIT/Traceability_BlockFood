using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IInventoryFactory: IBase<InventoryFactory>
    {
        void useIF(string id, decimal w);
        string id();
        void Delete(string id);
        IEnumerable<InventoryFactory> getAllInventoryFactory();
        JsonResult getAllInventoryFactorybyFactory(string id, string search);
        JsonResult getAllInventoryFactorybyProduct(string id);
    }
}
