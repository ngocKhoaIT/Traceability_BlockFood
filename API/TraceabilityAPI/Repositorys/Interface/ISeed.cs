using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface ISeed : IBase<Seed>
    {
        void Delete(int id);
        IEnumerable<Seed> getAllSeedExists();
        JsonResult checkName(string id, string name);
        IEnumerable<Seed> getAllSeed(string id);
        IEnumerable<Seed> getSeedsbyFilter(string id, string searchString);
    }
}
