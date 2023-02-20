using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class FarmRequestsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public FarmRequestsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{h},{p},{f}")]
        public FarmRequest Get(string h, string p, string f)
        {
            return _unit.FarmRequests.getIdFQ(h,p,f);
        }

        [HttpGet]
        [Route("{id},{req},{search}")]
        public JsonResult GetAllFarmRequestbyFarm(string id, string req, string search)
        {
            return _unit.FarmRequests.getAllFarmRequestByFarm(id,req,search);
        }

        [HttpGet]
        [Route("{p},{req},{search}")]
        public JsonResult GetAllFarmRequestbyPlace(string p, string req, string search)
        {
            return _unit.FarmRequests.getAllFarmRequestByPlace(p,req, search);
        }

        [HttpGet]
        [Route("{h},{p}")]
        public FarmRequest GetStatusbyPlace(string h, string p)
        {
            return _unit.FarmRequests.getStatusbyPlace(h,p);
        }

        [HttpPost]
        public JsonResult AddFarmRequest(FarmRequest f)
        {
            var FarmRequests = new FarmRequest
            {
                farmId = f.farmId,
                harvestId = f.harvestId,
                placeId = f.placeId,
                amount = f.amount,
                unit = f.unit,
                status_request = f.status_request,
                status_btn = f.status_btn,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.FarmRequests.Add(FarmRequests);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateFarmRequest(FarmRequest f)
        {
            var FarmRequests = new FarmRequest
            {
                farmId = f.farmId,
                harvestId = f.harvestId,
                placeId = f.placeId,
                amount = f.amount,
                status_btn = f.status_btn,
                unit = f.unit,
                status_request = f.status_request,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.FarmRequests.Update(FarmRequests);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.FarmRequests.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        [Route("{id},{p},{req}")]
        public JsonResult updateStatus(string id, string p, string req)
        {
            _unit.FarmRequests.updateStatus(id,p, req);
            _unit.Complete();
            return new JsonResult("");
        }

        [HttpPost]
        [Route("{id},{p},{req}")]
        public JsonResult updateStatusBtn(string id, string p, string req)
        {
            _unit.FarmRequests.updateStatusBtn(id, p, req);
            _unit.Complete();
            return new JsonResult("");
        }

        [HttpPost]
        public JsonResult RemoveFarmRequest(FarmRequest f)
        {
            _unit.FarmRequests.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
