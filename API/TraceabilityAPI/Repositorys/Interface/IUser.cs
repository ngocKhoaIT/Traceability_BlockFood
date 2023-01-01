using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IUser : IBase<UserLogin>
    {
        UserLogin checkLogin(string user, string password);
        UserLogin GetId(string id);
        void Delete(string id);
        IEnumerable<UserLogin> getAllUser();
        IEnumerable<UserLogin> getAllUserbyRole(string r);
        JsonResult getUsersbyFilter(string searchString);
    }
}
