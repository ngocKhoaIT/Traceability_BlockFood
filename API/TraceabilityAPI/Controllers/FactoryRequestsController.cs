using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class FactoryRequestsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public FactoryRequestsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public FactoryRequest Get(string id)
        {
            return _unit.FactoryRequests.GetString(id);
        }

        [HttpGet]
        [Route("{id},{req},{search}")]
        public JsonResult GetAllFactoryRequestbyFactory(string id, string req, string search)
        {
            return _unit.FactoryRequests.getAllFactoryRequestByFactory(id, req, search);
        }

        [HttpGet]
        [Route("{p},{req},{search}")]
        public JsonResult GetAllFactoryRequestbyPlace(string p, string req, string search)
        {
            return _unit.FactoryRequests.getAllFactoryRequestByPlace(p, req, search);
        }

        [HttpGet]
        [Route("{h},{p}")]
        public FactoryRequest GetStatusbyPlace(string h, string p)
        {
            return _unit.FactoryRequests.getStatusbyPlace(h,p);
        }

        [HttpPost]
        public JsonResult AddFactoryRequest(FactoryRequest f)
        {
            var FactoryRequests = new FactoryRequest
            {
                productId = f.productId,
                factoryId = f.factoryId,
                placeId = f.placeId,
                amount = f.amount,
                unit = f.unit,
                status_request = f.status_request,
                status_btn = f.status_btn,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.FactoryRequests.Add(FactoryRequests);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateFactoryRequest(FactoryRequest f)
        {
            var FactoryRequests = new FactoryRequest
            {
                productId = f.productId,
                factoryId = f.factoryId,
                placeId = f.placeId,
                amount = f.amount,
                unit = f.unit,
                status_request = f.status_request,
                status_btn = f.status_btn,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.FactoryRequests.Update(FactoryRequests);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.FactoryRequests.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        [Route("{id},{p},{req}")]
        public JsonResult updateStatus(string id, string p, string req)
        {
            _unit.FactoryRequests.updateStatus(id,p, req);
            _unit.Complete();
            return new JsonResult("");
        }

        [HttpPost]
        [Route("{id},{p},{req}")]
        public JsonResult updateStatusBtn(string id, string p, string req)
        {
            _unit.FactoryRequests.updateStatusBtn(id, p, req);
            _unit.Complete();
            return new JsonResult("");
        }

        [HttpPost]
        public JsonResult RemoveFactoryRequest(FactoryRequest f)
        {
            _unit.FactoryRequests.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
