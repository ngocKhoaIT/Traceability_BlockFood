using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class FarmsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public FarmsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public Farm Get(string id)
        {
            return _unit.Farms.GetString(id);
        }

        [HttpGet]
        public IEnumerable<Farm> GetAll()
        {
            return _unit.Farms.getAllFarm();
        }

        [HttpGet]
        public IEnumerable<Farm> GetAllFarmHarvest()
        {
            return _unit.Farms.getAllFarmHarvest();
        }

        [HttpGet]
        public JsonResult GetAllFarmHarvestbyMerchant()
        {
            return _unit.Farms.getAllFarmHarvestbyMerchant();
        }

        [HttpGet]
        [Route("{req}")]
        public JsonResult GetFarmsbyFilter(string req)
        {
            return _unit.Farms.getFarmsbyFilter(req);
        }

        [HttpPost]
        public JsonResult AddFarm(Farm f)
        {
            var Farms = new Farm
            {
                farmId = _unit.Farms.id(),
                farmName = f.farmName,
                addressFarm = f.addressFarm,
                farmerId = f.farmerId,
                note = f.note, 
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.Farms.Add(Farms);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateFarm(Farm f)
        {
            var Farms = new Farm
            {
                farmId = f.farmId,
                farmName = f.farmName,
                addressFarm = f.addressFarm,
                farmerId = f.farmerId,
                note = f.note,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.Farms.Update(Farms);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.Farms.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult RemoveFarm(Farm f)
        {
            _unit.Farms.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
