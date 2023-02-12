using Google.Apis.Drive.v3.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        public IEnumerable<UserLogin> users;
        private readonly DataDbContext context;
        private readonly IUnitOfWork _unit;
        public AccountsController(IUnitOfWork unitOfWork, DataDbContext _context)
        {
            context = _context;
            _unit = unitOfWork;
        }

        [HttpGet]
        [Route("{user}")]
        public JsonResult checkUser(string user)
        {
            var check = context.UserLogins.Where(t=> t.userName == user).SingleOrDefault();
            if(check == null)
            {
                return new JsonResult("Chưa tồn tại");
            }
            else
            {
                return new JsonResult("Đã tồn tại");
            }
        }

        [HttpGet]
        [Route("{id},{pw}")]
        [AllowAnonymous]
        public async Task<ActionResult> changePassword(string id, string pw)
        {
            var check = context.UserLogins.Where(t=>t.userName == id).SingleOrDefault();
            if(check == null)
            {
                return new JsonResult("Không tồn tại tài khoảng này");
            }
            else
            {
                check._passwordHash = BCrypt.Net.BCrypt.HashPassword(pw);
                check._passwordSalt = BCrypt.Net.BCrypt.HashPassword(pw);
                context.Update(check);
                context.SaveChanges();
                return new JsonResult("Đổi mật khẩu thành công");
            }    
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Register(UserLogin user)
        {

            var u = new UserLogin
            {
                userName = user.userName,
                _passwordHash = BCrypt.Net.BCrypt.HashPassword(user._passwordHash),
                _passwordSalt = BCrypt.Net.BCrypt.HashPassword(user._passwordHash),
                represent = user.represent,
                workingFor = user.workingFor, 
                _role = user._role,
                _status = 1,
                date_create = DateTime.Now,
                date_update = DateTime.Now,
            };
            _unit.UserLogins.Add(u);
            _unit.Complete();

            return Ok(u);
        }



        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> LoginUser(UserLogin s)
        {
            var check = context.UserLogins.Where(t => t.userName == s.userName).FirstOrDefault();
            UserLogin u = _unit.UserLogins.GetString(s.userName);
            string Token;
            if (check == null)
            {
                return new JsonResult("User not Found or Wrong Password.");
            }
            else
            {
                bool bc = BCrypt.Net.BCrypt.Verify(s._passwordHash, check._passwordHash);
                if (!bc)
                {
                    return new JsonResult("User not Found or Wrong Password.");
                }
                Token = CreateToken(u);
            }

            return Ok(new JsonResult(Token));
        }

        private string CreateToken(UserLogin u)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, u.userName),
                new Claim(ClaimTypes.Role, u._role),
                new Claim("userName", u.userName),
                new Claim("Role", u._role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("NgocKhoaSecureKey28061409"));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                "https://localhost:7120",
                "https://localhost:4200",
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
