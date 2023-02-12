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
    public class AddressesController : ControllerBase
    {
        private readonly IUnitOfWork _unit;
        public AddressesController(IUnitOfWork unitOfWork)
        {
            _unit = unitOfWork;
        }

        [HttpGet]
        [Route("{id}")]
        public Province GetIdProvince(int id) {
            return _unit.Addresses.getIdProvince(id);
        }

        [HttpGet]
        [Route("{id}")]
        public District GetIdDistrict(int id)
        {
            return _unit.Addresses.getIdDistrict(id);
        }

        [HttpGet]
        [Route("{id}")]
        public Ward GetIdWard(int id)
        {
            return _unit.Addresses.getIdWard(id);
        }

        [HttpGet]
        [Route("{id}")]
        public IEnumerable<Ward> GetWard(int id)
        {
            return _unit.Addresses.GetWardbyD(id);
        }

        [HttpGet]
        [Route("{id}")]
        public IEnumerable<District> GetDistrict(int id)
        {
            return _unit.Addresses.GetDistrictbyP(id);
        }

        [HttpGet]
        public IEnumerable<Province> GetProvince()
        {
            return _unit.Addresses.GetProvince();
        }
    }
}
