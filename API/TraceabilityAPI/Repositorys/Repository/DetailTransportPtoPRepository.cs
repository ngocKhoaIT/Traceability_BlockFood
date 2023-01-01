using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class DetailTransportPtoPRepository : BaseRepository<DetailTransportPtoP>, IDetailTransportPtoP
    {
        protected DataDbContext context;

        public DetailTransportPtoPRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public IEnumerable<DetailTransportPtoP> getAllDetailTransportPtoP()
        {
            return context.DetailTransportPtoPs.ToList();
        }
    }
}
