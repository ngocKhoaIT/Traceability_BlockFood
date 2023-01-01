using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IFarmRequest : IBase<FarmRequest>
    {
        FarmRequest getIdFQ(string h, string p, string f);
        void updateStatusBtn(string id, string p, string req);
        JsonResult getAllFarmRequestByPlace(string p, string req, string search);
        JsonResult getAllFarmRequestByFarm(string id, string req, string search);
        void Delete(string id);
        void updateStatus(string id,string p,  string req);
        FarmRequest getStatusbyPlace(string h, string p);
    }
}
