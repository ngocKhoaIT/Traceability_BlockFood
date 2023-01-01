using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IUnitOfWork _unit;
        private readonly DataDbContext context;
        public OrdersController(IUnitOfWork unit, DataDbContext context)
        {
            _unit = unit;
            this.context = context;
        }

        [HttpGet]
        [Route("{id}")]
        public DetailOrder GetIdDetail(string id)
        {
            return context.DetailOrders.Where(t => t.billId == id).SingleOrDefault();
        }

        [HttpGet]
        [Route("{id}")]
        public OrderBill GetIdOrder(string id)
        {
            return context.OrderBills.Where(t => t.billId == id).SingleOrDefault();
        }

        [HttpGet]
        public IEnumerable<OrderBill> GetAll()
        {
            return context.OrderBills.ToList();
        }

        [HttpPost]
        public JsonResult Add(OrderBill orderBill)
        {
            OrderBill orderBill1 = new OrderBill
            {
                billId= _unit.Orders.id(),
                customerId= orderBill.customerId,
                date_create= DateTime.Now,
                employeeId= orderBill.employeeId,
                totalBill = orderBill.totalBill
            };
            context.Set<OrderBill>().Add(orderBill1);
            _unit.Complete();
            return new JsonResult(orderBill1);
        }

        [HttpPost]
        public JsonResult AddDetail(DetailOrder detailOrder)
        {
            DetailOrder detailOrder1 = new DetailOrder { 
            discount= detailOrder.discount,
                billId= detailOrder.billId,
                amount= detailOrder.amount,
                goodsId= detailOrder.goodsId,
                intoMoney= detailOrder.intoMoney,
                price = detailOrder.price 
            };
            context.Set<DetailOrder>().Add(detailOrder1);
            _unit.Complete();
            return new JsonResult(detailOrder1);
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Remove(string id)
        {
            context.DetailOrders.Remove(GetIdDetail(id));
            _unit.Complete();
            context.OrderBills.Remove(GetIdOrder(id));
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
