using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class SeedsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public SeedsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public Seed Get(int id)
        {
            return _unit.Seeds.Get(id);
        }

        [HttpGet]
        [Route("{id},{name}")]
        public JsonResult CheckName(string id, string name)
        {
            return _unit.Seeds.checkName(id,name);
        }

        [HttpGet]
        public IEnumerable<Seed> GetAllSeedExist()
        {
            return _unit.Seeds.getAllSeedExists();
        }

        [HttpGet]
        [Route("{id}")]
        public IEnumerable<Seed> GetAllbyFarm(string id)
        {
            return _unit.Seeds.getAllSeed(id);
        }

        [HttpGet]
        [Route("{id},{searchString}")]
        public IEnumerable<Seed> GetSeedsbyFilter(string id, string searchString) 
        {
            return _unit.Seeds.getSeedsbyFilter(id, searchString);
        }

        [HttpPost]
        public JsonResult AddSeed(Seed f)
        {
            var Seeds = new Seed
            {
                seedId = f.seedId,
                seedName = f.seedName,
                farmId = f.farmId,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.Seeds.Add(Seeds);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateSeed(Seed f)
        {
            var Seeds = new Seed
            {
                seedId = f.seedId,
                seedName = f.seedName,
                farmId = f.farmId,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.Seeds.Update(Seeds);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(int id)
        {
            _unit.Seeds.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult RemoveSeed(Seed f)
        {
            _unit.Seeds.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
