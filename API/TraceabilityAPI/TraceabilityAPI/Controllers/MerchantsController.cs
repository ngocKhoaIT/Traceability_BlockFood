using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class MerchantsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public MerchantsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public Merchant Get(string id)
        {
            return _unit.Merchants.GetString(id);
        }

        [HttpGet]
        [Route("{req}")]
        public JsonResult GetMerchantsbyFilter(string req)
        {
            return _unit.Merchants.getMerchantsbyFilter(req);
        }

        [HttpGet]
        public IEnumerable<Merchant> GetAll()
        {
            return _unit.Merchants.getAllMerchant();
        }

        [HttpPost]
        public JsonResult AddMerchant(Merchant f)
        {
            var Merchants = new Merchant
            {
                merchantId = _unit.Merchants.id(),
                merchantName = f.merchantName,
                addressMerchant = f.addressMerchant,
                traderId = f.traderId,
                note = f.note, 
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.Merchants.Add(Merchants);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateMerchant(Merchant f)
        {
            var Merchants = new Merchant
            {
                merchantId = f.merchantId,
                merchantName = f.merchantName,
                addressMerchant = f.addressMerchant,
                traderId = f.traderId,
                note = f.note,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.Merchants.Update(Merchants);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.Merchants.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult RemoveMerchant(Merchant f)
        {
            _unit.Merchants.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
