using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class InventoryFactoriesController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public InventoryFactoriesController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public InventoryFactory Get(string id)
        {
            return _unit.InventoryFactories.GetString(id);
        }

        [HttpGet]
        public IEnumerable<InventoryFactory> GetAll()
        {
            return _unit.InventoryFactories.getAllInventoryFactory();
        }

        [HttpGet]
        [Route("{id},{req}")]
        public JsonResult GetAllbyFactory(string id, string req)
        {
            return _unit.InventoryFactories.getAllInventoryFactorybyFactory(id,req);
        }

        [HttpGet]
        [Route("{id}")]
        public JsonResult GetAllbyProduct(string id)
        {
            return _unit.InventoryFactories.getAllInventoryFactorybyProduct(id);
        }

        [HttpPost]
        public JsonResult AddInventoryFactory(InventoryFactory f)
        {
            var InventoryFactories = new InventoryFactory
            {
                id = _unit.InventoryFactories.id(),
                factoryId = f.factoryId,
                harvestId = f.harvestId,
                amount = f.amount,
                unit = f.unit,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
                checkM = f.checkM,
            };
            _unit.InventoryFactories.Add(InventoryFactories);
            _unit.Complete();
            return new JsonResult(InventoryFactories);
        }

        [HttpPost]
        public JsonResult UpdateInventoryFactory(InventoryFactory f)
        {
            var InventoryFactories = new InventoryFactory
            {
                id = f.id,
                factoryId = f.factoryId,
                harvestId = f.harvestId,
                amount = f.amount,
                unit = f.unit,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
                checkM = f.checkM,
            };
            _unit.InventoryFactories.Update(InventoryFactories);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.InventoryFactories.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        [Route("{id},{w}")]
        public JsonResult UseIF(string id, decimal w)
        {
            _unit.InventoryFactories.useIF(id,w);
            _unit.Complete();
            return new JsonResult("Successfully");
        }

        [HttpPost]
        public JsonResult RemoveInventoryFactory(InventoryFactory f)
        {
            _unit.InventoryFactories.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
