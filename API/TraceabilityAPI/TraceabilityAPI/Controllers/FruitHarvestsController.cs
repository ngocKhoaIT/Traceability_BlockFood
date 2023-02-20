using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class FruitHarvestsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public FruitHarvestsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public FruitHarvest Get(string id)
        {
            return _unit.FruitHarvests.GetString(id);
        }

        [HttpGet]
        [Route("{id},{p}")]
        public IEnumerable<FruitHarvest> GetIdFruitHarvestbyFarm(string id, string p)
        {
            return _unit.FruitHarvests.getAllFruitHarvestbyFarm(id,p);
        }

        [HttpGet]
        [Route("{id},{p}")]
        public JsonResult GetIdFruitHarvestbyFarmView(string id, string p)
        {
            return _unit.FruitHarvests.getAllFruitHarvestbyFarmView(id, p);
        }

        [HttpGet]
        [Route("{id},{req}")]
        public JsonResult GetFruitHarvestsbyFilter(string id, string req)
        {
            return _unit.FruitHarvests.getFruitHarvestsbyFilter(id, req);
        }

        [HttpGet]
        [Route("{a},{b}")]
        public JsonResult exChange(decimal a, string b)
        {
            return new JsonResult(_unit.FruitHarvests.exchange(a, b));
        }

        [HttpGet]
        [Route("{id}")]
        public JsonResult GetAll(string id)
        {
            return _unit.FruitHarvests.getAllFruitHarvest(id);
        }

        [HttpGet]
        [Route("{id},{date}")]
        public JsonResult GetIfDateHarvest(string id, string date)
        {
            return _unit.FruitHarvests.ifDateHarvest(id,date);
        }

        [HttpPost]
        public JsonResult AddFruitHarvest(FruitHarvest f)
        {
            var FruitHarvests = new FruitHarvest
            {
                harvestId=_unit.FruitHarvests.id(),
                unit=f.unit,
                date_harvest=f.date_harvest,
                weight_harvest=f.weight_harvest,
                fruitId=f.fruitId,
                status_request = f.status_request,
                weight_harvest_first = f.weight_harvest_first,
                _status = 1,
                imageFH = f.imageFH,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.FruitHarvests.Add(FruitHarvests);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateFruitHarvest(FruitHarvest f)
        {
            var FruitHarvests = new FruitHarvest
            {
                harvestId = f.harvestId,
                unit = f.unit,
                date_harvest = f.date_harvest,
                weight_harvest = f.weight_harvest,
                fruitId = f.fruitId,
                status_request = f.status_request,
                weight_harvest_first = f.weight_harvest_first,
                imageFH = f.imageFH,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.FruitHarvests.Update(FruitHarvests);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.FruitHarvests.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpGet]
        [Route("{id},{w}")]
        public JsonResult Sell(string id, decimal w)
        {
            _unit.FruitHarvests.sell(id,w);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult RemoveFruitHarvest(FruitHarvest f)
        {
            _unit.FruitHarvests.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
