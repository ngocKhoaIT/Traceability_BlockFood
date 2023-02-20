using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Models;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public UsersController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public UserLogin Get(string id)
        {
            return _unit.UserLogins.GetId(id);
        }

        [HttpGet]
        [Route("{r}")]
        public IEnumerable<UserLogin> GetAllUserbyRole(string r)
        {
            return _unit.UserLogins.getAllUserbyRole(r);
        }

        [HttpGet]
        public IEnumerable<UserLogin> GetAll()
        {
            return _unit.UserLogins.getAllUser();
        }

        [HttpGet]
        [Route("{req}")]
        public JsonResult GetUsersbyFilter(string req)
        {
            return _unit.UserLogins.getUsersbyFilter(req);
        }

        [HttpGet]
        [Route("{user},{password}")]
        public UserLogin check(string user, string password)
        {
            return _unit.UserLogins.checkLogin(user, password);
        }

        //[HttpPost]
        //public JsonResult Add(UserLogin u)
        //{
        //    var users = new UserLogin
        //    {
        //        userName = u.userName,
        //        pass = u.pass,
        //        _role = u._role,
        //        represent = u.represent,
        //        workingFor = u.workingFor,
        //        _status = 1,
        //        date_create = DateTime.Now,
        //        date_update = DateTime.Now,
        //    };
        //    _unit.UserLogins.Add(users);
        //    _unit.Complete();
        //    return new JsonResult("Added Successfully");
        //}

        //[HttpPost]
        //public JsonResult Update(UserLogin u)
        //{
        //    var users = new UserLogin
        //    {
        //        userName = u.userName,
        //        pass = u.pass,
        //        _role = u._role,
        //        workingFor =u.workingFor,
        //        represent = u.represent,
        //        _status = 1,
        //        date_create = u.date_create,
        //        date_update = DateTime.Now,
        //    };
        //    _unit.UserLogins.Update(users);
        //    _unit.Complete();
        //    return new JsonResult("Updated Successfully");
        //}

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.UserLogins.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult Remove(UserLogin u)
        {
            _unit.UserLogins.Remove(u);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
