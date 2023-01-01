using TraceabilityAPI.Models;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface INotice : IBase<Notice>
    {
        JsonResult getIdNotice(string id);
        JsonResult getAllSendId(string id);
        JsonResult getAllSendIdRequest(string id, string req);
        JsonResult getAllReciveId(string id);
        JsonResult getAllReceiveIdRequest(string id, string req);
        string getID();
        void updateStatus(string id, string req);
    }
}
