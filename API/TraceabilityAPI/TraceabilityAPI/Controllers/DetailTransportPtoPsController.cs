using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class DetailTransportPtoPsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public DetailTransportPtoPsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public DetailTransportPtoP Get(string id)
        {
            return _unit.DetailTransportPtoPs.GetString(id);
        }

        [HttpGet]
        public IEnumerable<DetailTransportPtoP> GetAll()
        {
            return _unit.DetailTransportPtoPs.getAllDetailTransportPtoP();
        }

        [HttpPost]
        public JsonResult AddDetailTransportPtoP(DetailTransportPtoP f)
        {
            var DetailTransportPtoPs = new DetailTransportPtoP
            {
                billId = f.billId,
                itemBillId = f.itemBillId,
                status_request = f.status_request,
            };
            _unit.DetailTransportPtoPs.Add(DetailTransportPtoPs);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateDetailTransportPtoP(DetailTransportPtoP f)
        {
            var DetailTransportPtoPs = new DetailTransportPtoP
            {
                billId = f.billId,
                itemBillId = f.itemBillId,
                status_request = f.status_request,
            };
            _unit.DetailTransportPtoPs.Update(DetailTransportPtoPs);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        public JsonResult RemoveDetailTransportPtoP(DetailTransportPtoP f)
        {
            _unit.DetailTransportPtoPs.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
