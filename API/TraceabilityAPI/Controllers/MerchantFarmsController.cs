using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [Authorize]
    [ApiController]
    public class MerchantFarmsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public MerchantFarmsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public MerchantFarm Get(string id)
        {
            return _unit.MerchantFarms.GetString(id);
        }

        [HttpGet]
        public IEnumerable<MerchantFarm> GetAll()
        {
            return _unit.MerchantFarms.getAllMerchantFarm();
        }

        [HttpGet]
        public JsonResult GetAllbyTransport()
        {
            return _unit.MerchantFarms.getAllMerchantFarmbyTransport();
        }

        [HttpGet]
        [Route("{id},{req}")]
        public JsonResult GetAllbyFactory(string id, string req)
        {
            return _unit.MerchantFarms.getAllMerchantFarmbyFactory(id, req);
        }

        [HttpGet]
        [Route("{id},{req},{search}")]
        public JsonResult GetAllbyFactorybyFilter(string id, string req, string search)
        {
            return _unit.MerchantFarms.getAllMerchantFarmbyFactorybyFilter(id, req,search);
        }

        [HttpGet]
        [Route("{id}")]
        public IEnumerable<MerchantFarm> GetAllbyPlace(string id)
        {
            return _unit.MerchantFarms.getAllMerchantFarmbyPlace(id);
        }

        [HttpPost]
        public JsonResult AddMerchantFarm(MerchantFarm f)
        {
            var MerchantFarms = new MerchantFarm
            {
                billId = _unit.MerchantFarms.id(),
                farmId = f.farmId,
                harvestId = f.harvestId,
                merchantId = f.merchantId,
                toPlace = f.toPlace,
                unit = f.unit,
                weight_mf = f.weight_mf,
                weight_delivery = f.weight_delivery,
                status_request = f.status_request,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.MerchantFarms.Add(MerchantFarms);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateMerchantFarm(MerchantFarm f)
        {
            var MerchantFarms = new MerchantFarm
            {
                billId = _unit.MerchantFarms.id(),
                farmId = f.farmId,
                harvestId = f.harvestId,
                merchantId = f.merchantId,
                toPlace = f.toPlace,
                unit = f.unit,
                weight_mf = f.weight_mf,
                weight_delivery = f.weight_delivery,
                status_request = f.status_request,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.MerchantFarms.Update(MerchantFarms);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.MerchantFarms.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        [Route("{id},{req}")]
        public JsonResult UpdateStatus(string id, string req)
        {
            _unit.MerchantFarms.UpdateStatus(id, req);
            _unit.Complete();
            return new JsonResult("Successfully");
        }

        [HttpPost]
        [Route("{id},{w}")]
        public JsonResult UpdateWeight(string id, decimal w)
        {
            _unit.MerchantFarms.updateWeight(id, w  );
            _unit.Complete();
            return new JsonResult("Successfully");
        }

        [HttpPost]
        public JsonResult RemoveMerchantFarm(MerchantFarm f)
        {
            _unit.MerchantFarms.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
