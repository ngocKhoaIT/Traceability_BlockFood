using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class AddressRepository : IAddress
    {
        protected DataDbContext context;
        public AddressRepository(DataDbContext _context) {
            this.context = _context;
        }

        public Province getIdProvince(int id)
        {
            return context.Provinces.Find(id);
        }

        public District getIdDistrict(int id)
        {
            return context.Districts.Find(id);
        }

        public Ward getIdWard(int id)
        {
            return context.Wards.Find(id);
        }

        public IEnumerable<District> GetDistrictbyP(int p)
        {
            return context.Districts.Where(t => t.idP == p).OrderBy(t=>t.nameD).ToList();
        }

        public IEnumerable<Province> GetProvince()
        {
            return context.Provinces.OrderBy(t => t.nameP).ToList();
        }

        public IEnumerable<Ward> GetWardbyD(int d)
        {
            return context.Wards.Where(t=> t.idD == d).OrderBy(t => t.nameW).ToList();
        }
    }
}
