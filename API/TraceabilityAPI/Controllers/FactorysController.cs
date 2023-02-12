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
    public class FactorysController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public FactorysController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public Factory Get(string id)
        {
            return _unit.Factorys.GetString(id);
        }

        [HttpGet]
        [Route("{req}")]
        public JsonResult GetFactoriesbyFilter(string req)
        {
            return _unit.Factorys.getFactorysbyFilter(req);
        }

        [HttpGet]
        public IEnumerable<Factory> GetAll()
        {
            return _unit.Factorys.getAllFactory();
        }

        [HttpGet]
        public IEnumerable<Factory> GetAllFactorybyProduct()
        {
            return _unit.Factorys.getAllFactorybyProduct();
        }

        [HttpPost]
        public JsonResult AddFactory(Factory f)
        {
            var Factorys = new Factory
            {
                factoryId = _unit.Factorys.id(),
                factoryName = f.factoryName,
                addressFactory = f.addressFactory,
                note = f.note,
                email = f.email,
                personInCharge = f.personInCharge,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.Factorys.Add(Factorys);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateFactory(Factory f)
        {
            var Factorys = new Factory
            {
                factoryId = f.factoryId,
                factoryName = f.factoryName,
                addressFactory = f.addressFactory,
                note = f.note,
                email = f.email,
                personInCharge = f.personInCharge,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.Factorys.Update(Factorys);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.Factorys.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult RemoveFactory(Factory f)
        {
            _unit.Factorys.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
