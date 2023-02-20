using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface ITransportPtoP : IBase<TransportPtoP>
    {
        void updateStatus(string id);
        string id();
        void Delete(string id);
        IEnumerable<TransportPtoP> getAllTransportPtoP();
        JsonResult getAllTransportPtoPbyTransport(string id, string searchString);
        bool check(string id);
    }
}
