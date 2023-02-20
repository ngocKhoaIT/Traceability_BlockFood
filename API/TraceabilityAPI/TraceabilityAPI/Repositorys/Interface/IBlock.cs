using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IBlock : IBase<Blockchain>
    {
        IEnumerable<Blockchain> getAllbyFilter(string searchString);
        JsonResult AddDataBlock();
        string getLastBlock();
    }
}
