using TraceabilityAPI.Models;

namespace TraceabilityAPI.Repositorys.Interface
{
    public interface IAddress
    {
        Province getIdProvince(int id);
        District getIdDistrict(int id);
        Ward getIdWard(int id);
        IEnumerable<Province> GetProvince();
        IEnumerable<District> GetDistrictbyP(int p);
        IEnumerable<Ward> GetWardbyD(int d);
    }
}
