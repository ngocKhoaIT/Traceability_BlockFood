using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public CustomersController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public Customer Get(string id)
        {
            return _unit.Customers.GetString(id);
        }

        [HttpGet]
        public IEnumerable<Customer> GetAll()
        {
            return _unit.Customers.getAllCustomer();
        }

        [HttpGet]
        [Route("{user},{password}")]
        public Customer check(string user, string password)
        {
            return _unit.Customers.checkLogin(user, password);
        }

        [HttpPost]
        public JsonResult Add(Customer u)
        {
            var users = new Customer
            {
                userName = u.userName,
                pass = u.pass,
                represent = u.represent,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.Customers.Add(users);
            _unit.Complete();
            return new JsonResult(users);
        }

        [HttpPost]
        public JsonResult Update(Customer u)
        {
            var users = new Customer
            {
                userName = u.userName,
                pass = u.pass,
                represent = u.represent,
                _status = 1,
                date_create = u.date_create,
                date_update = DateTime.Now,
            };
            _unit.Customers.Update(users);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.Customers.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult Remove(Customer u)
        {
            _unit.Customers.Remove(u);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
