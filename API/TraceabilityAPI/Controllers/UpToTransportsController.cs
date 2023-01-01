using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class UpToTransportsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public UpToTransportsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public UpToTransport Get(string id)
        {
            return _unit.UpToTransports.GetString(id);
        }

        [HttpGet]
        public IEnumerable<UpToTransport> GetAll()
        {
            return _unit.UpToTransports.getAllUpToTransport();
        }

        [HttpGet]
        public JsonResult GetAllbyTransport()
        {
            return _unit.UpToTransports.getAllUpToTransportbyTransport();
        }

        [HttpGet]
        [Route("{id}")]
        public IEnumerable<UpToTransport> GetAllbyPlace(string id)
        {
            return _unit.UpToTransports.getAllUpToTransportbyPlace(id);
        }

        [HttpGet]
        [Route("{id},{req}")]
        public JsonResult GetAllbyPlaceView(string id, string req)
        {
            return _unit.UpToTransports.getAllUpToTransportbyPlacesView(id,req);
        }

        [HttpGet]
        [Route("{id},{req},{search}")]
        public JsonResult GetAllbyPlaceViewbyFilter(string id, string req, string search)
        {
            return _unit.UpToTransports.getAllUpToTransportbyPlacesViewbyFilter(id, req, search);
        }

        [HttpPost]
        public JsonResult AddUpToTransport(UpToTransport f)
        {
            var UpToTransports = new UpToTransport
            {
                billId = _unit.UpToTransports.id(),
                placeId = f.placeId,
                goodsId = f.goodsId,
                amount = f.amount,
                amountDelivery = f.amountDelivery,
                status_request = f.status_request,
                toPlace = f.toPlace,
                unit = f.unit,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.UpToTransports.Add(UpToTransports);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateUpToTransport(UpToTransport f)
        {
            var UpToTransports = new UpToTransport
            {
                billId = _unit.UpToTransports.id(),
                placeId = f.placeId,
                goodsId = f.goodsId,
                amount = f.amount,
                amountDelivery = f.amountDelivery,
                status_request = f.status_request,
                toPlace = f.toPlace,
                unit = f.unit,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.UpToTransports.Update(UpToTransports);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.UpToTransports.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        [Route("{id},{req}")]
        public JsonResult UpdateStatus(string id, string req)
        {
            _unit.UpToTransports.UpdateStatus(id, req);
            _unit.Complete();
            return new JsonResult("Successfully");
        }

        [HttpPost]
        [Route("{id},{a}")]
        public JsonResult UpdateAmount(string id, decimal a)
        {
            _unit.UpToTransports.updateAmount(id, a);
            _unit.Complete();
            return new JsonResult("Successfully");
        }

        [HttpPost]
        public JsonResult RemoveUpToTransport(UpToTransport f)
        {
            _unit.UpToTransports.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
