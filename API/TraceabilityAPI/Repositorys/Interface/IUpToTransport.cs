using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IUpToTransport : IBase<UpToTransport>
    {
        JsonResult getAllUpToTransportbyTransport();
        string id();
        void Delete(string id);
        void updateAmount(string id, decimal a);
        IEnumerable<UpToTransport> getAllUpToTransport();
        IEnumerable<UpToTransport> getAllUpToTransportbyPlace(string id);
        JsonResult getAllUpToTransportbyPlacesView(string id, string req);
        JsonResult getAllUpToTransportbyPlacesViewbyFilter(string id, string req, string searchString);
        void UpdateStatus(string id, string req);
    }
}
