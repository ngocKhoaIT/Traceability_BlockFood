using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class FruitsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public FruitsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public Fruit Get(string id)
        {
            return _unit.Fruits.getIdFruit(id);
        }

        [HttpGet]
        [Route("{id}")]
        public IEnumerable<Fruit> GetAll(string id)
        {
            return _unit.Fruits.getAllFruit(id);
        }

        [HttpGet]
        [Route("{id},{req}")]
        public IEnumerable<Fruit> GetFruitsbyFilter(string id, string req)
        {
            return _unit.Fruits.getFruitsbyFilter(id,req);
        }

        [HttpPost]
        public JsonResult AddFruit(Fruit fm)
        {
            var Fruits = new Fruit
            {
                fruitId= _unit.Fruits.id(),
                fruitName = fm.fruitName, 
                status_activity=fm.status_activity,
                date_plant=fm.date_plant,
                farmId=fm.farmId,
                amount=fm.amount,
                pesticides=fm.pesticides,
                fertilizer=fm.fertilizer,
                seedId=fm.seedId,
                unit = fm.unit,
                technology=fm.technology,
                land=fm.land,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.Fruits.Add(Fruits);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateFruit(Fruit fm)
        {
            var Fruits = new Fruit
            {
                fruitId = fm.fruitId,
                fruitName = fm.fruitName,
                status_activity = fm.status_activity,
                date_plant = fm.date_plant,
                farmId = fm.farmId,
                amount = fm.amount,
                pesticides = fm.pesticides,
                fertilizer = fm.fertilizer,
                seedId = fm.seedId,
                unit = fm.unit,
                technology = fm.technology,
                land = fm.land,
                _status = 1,
                date_create = fm.date_create,
                date_update = DateTime.Now,
            };
            _unit.Fruits.Update(Fruits);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.Fruits.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult RemoveFruit(Fruit fm)
        {
            _unit.Fruits.Remove(fm);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
