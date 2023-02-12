using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [Authorize]
    [ApiController]
    public class BlockchainsController : ControllerBase
    {
        private readonly IUnitOfWork _unit;
        public BlockchainsController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet]
        [Route("{req}")]
        public IEnumerable<Blockchain> GetAllFilter(string req) {
            return _unit.Blocks.getAllbyFilter(req);
        }

        [HttpGet]
        public JsonResult Data()
        {
            return new JsonResult(_unit.Blocks.AddDataBlock());

        }

        [HttpPost]
        public JsonResult Add(Blockchain blockchain)
        {

            var Blockchains = new Blockchain
            {
                hash = CalculateHash(DateTime.Now, _unit.Blocks.getLastBlock(), _unit.Blocks.AddDataBlock()),
                data = _unit.Blocks.AddDataBlock(),
                timestamp = DateTime.Now,
                previousHash = _unit.Blocks.getLastBlock(),
            };
            _unit.Blocks.Add(Blockchains);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        private string CalculateHash(DateTime TimeStamp, string PreviousHash, string Data)
        {
            SHA256 sha256 = SHA256.Create();

            byte[] inputBytes = Encoding.ASCII.GetBytes($"{TimeStamp}-{PreviousHash ?? ""}-{Data}");
            byte[] outputBytes = sha256.ComputeHash(inputBytes);

            return Convert.ToBase64String(outputBytes);
        }
    }
}
