using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.Interface;
using ZXing;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class OrderRepository : IOrder
    {
        private DataDbContext context;
        public OrderRepository(DataDbContext _context) { 
            this.context = _context;
        }

        public IEnumerable<OrderBill> getAllBills()
        {
            return context.OrderBills.ToList();
        }

        public void Delete(string id)
        {
            var result1 = context.DetailOrders.Where(t=>t.billId == id).ToList();
            var result2 = context.OrderBills.Where(t => t.billId == id).ToList();
            if(result1!=null && result2 != null)
            {

            }
        }

        public string id()
        {
            int result = context.OrderBills.Count() + 1;
            if (result >= 1 && result < 10)
                return "HD00" + result;
            else if (result >= 10 && result < 100)
                return "HD0" + result;
            else return "HD" + result;
        }
    }
}
