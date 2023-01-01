using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IFactoryRequest : IBase<FactoryRequest>
    {
        void updateStatusBtn(string id, string p, string req);
        JsonResult getAllFactoryRequestByPlace(string p, string req, string search);
        JsonResult getAllFactoryRequestByFactory(string id, string req, string search);
        void Delete(string id);
        void updateStatus(string id, string p, string req);
        FactoryRequest getStatusbyPlace(string h, string p);
    }
}
