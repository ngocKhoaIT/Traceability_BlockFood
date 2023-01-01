using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IFarm : IBase<Farm>
    {
        IEnumerable<Farm> getAllFarmHarvest();
        JsonResult getFarmsbyFilter(string searchString);
        string id();
        void Delete(string id);
        IEnumerable<Farm> getAllFarm();
        JsonResult getAllFarmHarvestbyMerchant();
    }
}
