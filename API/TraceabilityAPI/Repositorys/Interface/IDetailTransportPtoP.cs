using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IDetailTransportPtoP : IBase<DetailTransportPtoP>
    {
        IEnumerable<DetailTransportPtoP> getAllDetailTransportPtoP();
    }
}
