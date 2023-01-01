using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class TransportPtoPsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public TransportPtoPsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public TransportPtoP Get(string id)
        {
            return _unit.TransportPtoPs.GetString(id);
        }

        [HttpGet]
        public IEnumerable<TransportPtoP> GetAll()
        {
            return _unit.TransportPtoPs.getAllTransportPtoP();
        }

        [HttpGet]
        [Route("{id},{searchString}")]
        public JsonResult GetAllbyTransport(string id, string searchString)
        {
            return _unit.TransportPtoPs.getAllTransportPtoPbyTransport(id, searchString);
        }

        [HttpGet]
        [Route("{id}")]
        public JsonResult Check(string id)
        {
            return new JsonResult(_unit.TransportPtoPs.check(id));
        }


        [HttpPost]
        public JsonResult AddTransportPtoP(TransportPtoP f)
        {
            var TransportPtoPs = new TransportPtoP
            {
                billId = _unit.TransportPtoPs.id(),
                transportId = f.transportId,
                status_request = f.status_request,
                placeId = f.placeId,
                humidity = f.humidity,
                temperature = f.temperature,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.TransportPtoPs.Add(TransportPtoPs);
            _unit.Complete();
            return new JsonResult(TransportPtoPs);
        }

        [HttpPost]
        public JsonResult UpdateTransportPtoP(TransportPtoP f)
        {
            var TransportPtoPs = new TransportPtoP
            {
                billId = f.billId,
                transportId = f.transportId,
                status_request = f.status_request,
                placeId = f.placeId,
                humidity = f.humidity,
                temperature = f.temperature,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.TransportPtoPs.Update(TransportPtoPs);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.TransportPtoPs.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult UpdateStatus(string id)
        {
            _unit.TransportPtoPs.updateStatus(id);
            _unit.Complete();
            return new JsonResult("Successfully");
        }

        [HttpPost]
        public JsonResult RemoveTransportPtoP(TransportPtoP f)
        {
            _unit.TransportPtoPs.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
