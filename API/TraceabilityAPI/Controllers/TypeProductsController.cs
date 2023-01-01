using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class TypeProductsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public TypeProductsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public TypeProduct Get(int id)
        {
            return _unit.TypeProducts.Get(id);
        }

        [HttpGet]
        public IEnumerable<TypeProduct> GetAll()
        {
            return _unit.TypeProducts.getAllTypeProduct();
        }

        [HttpGet]
        [Route("{id},{req}")]
        public IEnumerable<TypeProduct> GetTypeProductsbyFilter(string id, string req)
        {
            return _unit.TypeProducts.getTypeProductsbyFilter(id, req);
        }

        [HttpPost]
        public JsonResult AddTypeProduct(TypeProduct f)
        {
            var TypeProducts = new TypeProduct
            {
                typeProductId=f.typeProductId,
                typeName=f.typeName,
                brand = f.brand,
                elementOfProduct=f.elementOfProduct,
                factoryId=f.factoryId,
                imageProduct=f.imageProduct,
                net_weight=f.net_weight,
                procedureOfProduct =f.procedureOfProduct,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.TypeProducts.Add(TypeProducts);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdateTypeProduct(TypeProduct f)
        {
            var TypeProducts = new TypeProduct
            {
                typeProductId = f.typeProductId,
                typeName = f.typeName,
                brand = f.brand,
                elementOfProduct = f.elementOfProduct,
                factoryId = f.factoryId,
                imageProduct = f.imageProduct,
                net_weight = f.net_weight,
                procedureOfProduct = f.procedureOfProduct,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.TypeProducts.Update(TypeProducts);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(int id)
        {
            _unit.TypeProducts.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult RemoveTypeProduct(TypeProduct f)
        {
            _unit.TypeProducts.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
