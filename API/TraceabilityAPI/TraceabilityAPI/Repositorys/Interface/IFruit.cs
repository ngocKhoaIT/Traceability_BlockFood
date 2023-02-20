using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IFruit : IBase<Fruit>
    {
        string id();
        Fruit getIdFruit(string id);
        void Delete(string id);
        IEnumerable<Fruit> getAllFruit(string id);
        IEnumerable<Fruit> getFruitsbyFilter(string id, string searchString);
    }
}
