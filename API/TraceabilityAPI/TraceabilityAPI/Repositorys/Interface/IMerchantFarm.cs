using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IMerchantFarm : IBase<MerchantFarm>
    {
        string id();
        void updateWeight(string id, decimal w);
        void Delete(string id);
        IEnumerable<MerchantFarm> getAllMerchantFarm();
        IEnumerable<MerchantFarm> getAllMerchantFarmbyPlace(string id);
        JsonResult getAllMerchantFarmbyTransport();
        JsonResult getAllMerchantFarmbyFactory(string id, string req);
        JsonResult getAllMerchantFarmbyFactorybyFilter(string id, string req, string searchString);
        void UpdateStatus(string id, string req);
    }
}
