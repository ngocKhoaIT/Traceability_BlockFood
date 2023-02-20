using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class TransportsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public TransportsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public Transport Get(string id)
        {
            return _unit.Transports.GetString(id);
        }

        [HttpGet]
        public IEnumerable<Transport> GetAll()
        {
            return _unit.Transports.getAllTransport();
        }

        [HttpGet]
        [Route("{req}")]
        public JsonResult GetTransportsbyFilter(string req)
        {
            return _unit.Transports.gettransportsbyFilter(req);
        }
        

        [HttpPost]
        public JsonResult AddTransport(Transport t)
        {
            var Transports = new Transport
            {
                transportId = _unit.Transports.id(),
                transportName = t.transportName,
                email = t.email,
                personInCharge = t.personInCharge,
                addressTransport = t.addressTransport,
                note = t.note,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.Transports.Add(Transports);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateTransport(Transport t)
        {
            var Transports = new Transport
            {
                transportId = t.transportId,
                transportName = t.transportName,
                email = t.email,
                personInCharge = t.personInCharge,
                addressTransport = t.addressTransport,
                note = t.note,
                _status = 1,
                date_create = t.date_create,
                date_update = DateTime.Now,
            };
            _unit.Transports.Update(Transports);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.Transports.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult RemoveTransport(Transport t)
        {
            _unit.Transports.Remove(t);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
