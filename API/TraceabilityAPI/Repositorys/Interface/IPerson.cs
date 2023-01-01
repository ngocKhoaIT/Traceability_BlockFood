using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IPerson : IBase<Person>
    {
        JsonResult checkAge(string req);
        string id();
        void Delete(string id);
        IEnumerable<Person> getAllPerson();
        IEnumerable<Person> getAllPersonbyD(string req);
        IEnumerable<Person> getPersonsbyFilter(string searchString);
    }
}
