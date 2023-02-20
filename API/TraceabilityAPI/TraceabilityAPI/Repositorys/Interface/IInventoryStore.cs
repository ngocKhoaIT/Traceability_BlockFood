using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IInventoryStore : IBase<InventoryStore>
    {
        JsonResult getAllListInventoryStore(string id, string req, string search);
        JsonResult getAllInventorybyReceivedbyStores(string id);
        JsonResult getAllInventorybyReceived(string id, string req);
        JsonResult detailProductFull(string id);
        JsonResult detailProductFull2(string id);
        JsonResult detailProductWTM(string id);
        JsonResult detailProductLiveFull(string id);
        JsonResult detailProductLiveWTM(string id);
        InventoryStore checkId(string id);
        string id();
        void Delete(string id);
        void updateStatus(string id);
        IEnumerable<InventoryStore> getAllInventory();
        JsonResult getAllInventoryStorebyStore(string id);
    }
}
