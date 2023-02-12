using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [Authorize]
    [ApiController]
    public class StoresController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public StoresController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public Store Get(string id)
        {
            return _unit.Stores.GetString(id);
        }

        [HttpGet]
        public IEnumerable<Store> GetAll()
        {
            return _unit.Stores.getAllStore();
        }

        [HttpGet]
        [Route("{req}")]
        public IEnumerable<Store> GetStoresbyFilter(string req)
        {
            return _unit.Stores.getStoresbyFilter(req);
        }

        [HttpPost]
        public JsonResult AddStore(Store s)
        {
            var Stores = new Store
            {
                storeId = _unit.Stores.id(),
                storeName = s.storeName,
                addressStore = s.addressStore,
                email = s.email,
                phoneNumber = s.phoneNumber,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.Stores.Add(Stores);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateStore(Store s)
        {
            var Stores = new Store
            {
                storeId = s.storeId,
                storeName = s.storeName,
                addressStore = s.addressStore,
                email = s.email,
                phoneNumber = s.phoneNumber,
                _status = 1,
                date_create = s.date_create,
                date_update = DateTime.Now,
            };
            _unit.Stores.Update(Stores);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.Stores.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult RemoveStore(Store s)
        {
            _unit.Stores.Remove(s);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
