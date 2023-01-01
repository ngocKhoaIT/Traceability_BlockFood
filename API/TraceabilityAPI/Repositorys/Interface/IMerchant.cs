using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IMerchant : IBase<Merchant>
    {
        string id();
        void Delete(string id);
        IEnumerable<Merchant> getAllMerchant();
        JsonResult getMerchantsbyFilter(string searchString);
    }
}
