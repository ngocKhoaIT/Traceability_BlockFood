using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IFruitHarvest : IBase<FruitHarvest>
    {
        string id();
        void Delete(string id);
        JsonResult getAllFruitHarvest(string id);
        void sell(string id, decimal w);
        IEnumerable<FruitHarvest> getAllFruitHarvestbyFarm(string id, string p);
        JsonResult ifDateHarvest(string id, string date);
        JsonResult getAllFruitHarvestbyFarmView(string id, string p);
        decimal exchange(decimal a, string b);
        JsonResult getFruitHarvestsbyFilter(string id, string searchString);
    }
}
