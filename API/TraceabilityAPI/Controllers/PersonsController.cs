using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;

        public PersonsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{id}")]
        public Person Get(string id)
        {
            return _unit.Persons.GetString(id);
        }

        [HttpGet]
        [Route("{req}")]
        public IEnumerable<Person> GetPersonsbyFilter(string req)
        {
            return _unit.Persons.getPersonsbyFilter(req);
        }

        [HttpGet]
        [Route("{req}")]
        public JsonResult CheckAge(string req)
        {
            return _unit.Persons.checkAge(req);
        }

        [HttpGet]
        [Route("{id}")]
        public IEnumerable<Person> GetAllPersonbyD(string id)
        {
            return _unit.Persons.getAllPersonbyD(id);
        }


        [HttpGet]
        public IEnumerable<Person> GetAll()
        {
            return _unit.Persons.getAllPerson();
        }

        [HttpPost]
        public JsonResult AddPerson(Person ps)
        {
            var Persons = new Person
            {
                identification = _unit.Persons.id(),
                firstName = ps.firstName,
                lastName = ps.lastName,
                imagePerson = ps.imagePerson,
                birthDay = ps.birthDay, 
                working = ps.working,
                sex = ps.sex,
                addressPerson = ps.addressPerson,
                email = ps.email,
                phoneNumber = ps.phoneNumber,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.Persons.Add(Persons);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult UpdatePerson(Person ps)
        {
            var Persons = new Person
            {
                identification = ps.identification,
                firstName = ps.firstName,
                lastName = ps.lastName,
                imagePerson = ps.imagePerson,
                birthDay = ps.birthDay,
                working = ps.working,
                sex = ps.sex,
                addressPerson = ps.addressPerson,
                email = ps.email,
                phoneNumber = ps.phoneNumber,
                _status = 1,
                date_create = ps.date_create,
                date_update = DateTime.Now,
            };
            _unit.Persons.Update(Persons);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.Persons.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        public JsonResult RemovePerson(Person ps)
        {
            _unit.Persons.Remove(ps);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
