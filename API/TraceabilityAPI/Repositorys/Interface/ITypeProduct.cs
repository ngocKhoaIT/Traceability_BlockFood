using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface ITypeProduct : IBase<TypeProduct>
    {
        void Delete(int id);
        IEnumerable<TypeProduct> getAllTypeProduct();
        IEnumerable<TypeProduct> getTypeProductsbyFilter(string id, string searchString);
    }
}
