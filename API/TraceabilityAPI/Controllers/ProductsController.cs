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
    public class ProductsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public ProductsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public Product Get(string id)
        {
            return _unit.Products.GetString(id);
        }

        [HttpGet]
        public IEnumerable<Product> GetAll()
        {
            return _unit.Products.getAllProduct();
        }

        [HttpGet]
        [Route("{id},{req}")]
        public IEnumerable<Product> GetAllProductbyFactory(string id, string req)
        {
            return _unit.Products.getAllProductbyFactory(id,req);
        }

        [HttpGet]
        [Route("{id},{p}")]
        public JsonResult GetAllProductbyFactoryView(string id,string p)
        {
            return _unit.Products.getAllProductbyFactoryView(id,p);
        }

        [HttpGet]
        [Route("{mfg},{exp}")]
        public JsonResult CheckDate(string mfg, string exp)
        {
            return _unit.Products.checkDate(mfg, exp);
        }

        [HttpPost]
        public JsonResult AddProduct(Product fm)
        {
            var Products = new Product
            {
                productId= _unit.Products.id(),
                productName = fm.productName,
                factoryId = fm.factoryId,
                amountProduct=fm.amountProduct,
                elementOfProduct=fm.elementOfProduct,
                exp_date=fm.exp_date,
                humidity=fm.humidity,
                mfg_date=fm.mfg_date,
                net_weight=fm.net_weight,
                procedureOfProduct=fm.procedureOfProduct,
                temperature=fm.temperature,
                unit=fm.unit,
                harvestId=fm.harvestId,
                amountProduct_first = fm.amountProduct_first,
                typeProductId=fm.typeProductId,
                imageProduct = fm.imageProduct,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.Products.Add(Products);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateProduct(Product fm)
        {
            var Products = new Product
            {
                productId = fm.productId,
                productName = fm.productName,
                factoryId = fm.factoryId,
                amountProduct = fm.amountProduct,
                elementOfProduct = fm.elementOfProduct,
                exp_date = fm.exp_date,
                humidity = fm.humidity,
                mfg_date = fm.mfg_date,
                net_weight = fm.net_weight,
                procedureOfProduct = fm.procedureOfProduct,
                amountProduct_first = fm.amountProduct_first,
                temperature = fm.temperature,
                unit = fm.unit,
                harvestId = fm.harvestId,
                typeProductId = fm.typeProductId,
                imageProduct = fm.imageProduct,
                _status = 1,
                date_create = fm.date_create,
                date_update = DateTime.Now,
            };
            _unit.Products.Update(Products);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.Products.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        [Route("{id},{a}")]
        public JsonResult Sell(string id, int a)
        {
            _unit.Products.sell(id,a);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult RemoveProduct(Product fm)
        {
            _unit.Products.Remove(fm);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
