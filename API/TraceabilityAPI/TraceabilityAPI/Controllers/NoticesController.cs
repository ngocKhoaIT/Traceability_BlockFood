using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class NoticesController : ControllerBase
    {
        private readonly DataDbContext context;
        private readonly IUnitOfWork _unit;
        public NoticesController(IUnitOfWork unitOfWork, DataDbContext context)
        {
            _unit = unitOfWork;
            this.context = context;
        }

        [HttpGet]
        [Route("{id}")]
        public Notice Get(string id)
        {
            return _unit.Notices.GetString(id);
        }

        [HttpGet]
        [Route("{id}")]
        public JsonResult GetIdNotice(string id)
        {
            return _unit.Notices.getIdNotice(id);
        }

        [HttpGet]
        [Route("{id},{req}")]
        public JsonResult GetAllSendId(string id, string req)
        {
            return _unit.Notices.getAllSendId(id, req);
        }


        [HttpGet]
        [Route("{id},{req}")]
        public JsonResult GetAllSendIdRequest(string id, string req)
        {
            return _unit.Notices.getAllSendIdRequest(id, req);
        }

        [HttpGet]
        [Route("{id},{req}")]
        public JsonResult GetAllReceiveId(string id, string req)
        {
            return _unit.Notices.getAllReciveId(id, req);
        }


        [HttpGet]
        [Route("{id},{req}")]
        public JsonResult GetAllReceiveIdRequest(string id, string req)
        {
            return _unit.Notices.getAllReceiveIdRequest(id, req);
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult Add(Notice og)
        {
            var Notices = new Notice
            {
                id = _unit.Notices.getID(),
                content = og.content,
                sendId = og.sendId,
                receiveId = og.receiveId,
                status_request = og.status_request,
                title = og.title,
                receiveDate = DateTime.Now,
                sendDate = DateTime.Now,
            };
            _unit.Notices.Add(Notices);
            _unit.Complete();
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult AddNoticeHarvest(Notice og)
        {
            var factory = context.UserLogins.Where(t => t._status == 1 && t._role == "factory").ToList();
            var merchant = context.UserLogins.Where(t => t._status == 1 && t._role == "merchant").ToList();
            var store = context.UserLogins.Where(t => t._status == 1 && t._role == "store").ToList();

            foreach(var item in factory)
            {
                var Notices = new Notice
                {
                    id = _unit.Notices.getID(),
                    content = "Nông sản đã và đang thu hoạch sẵn sàng để bán.",
                    sendId = og.sendId,
                    receiveId = item.userName,
                    status_request = "Đã gửi",
                    title = "Nông sản thu hoạch",
                    receiveDate = DateTime.Now,
                    sendDate = DateTime.Now,
                };
                _unit.Notices.Add(Notices);
                _unit.Complete();
            }

            foreach (var item in merchant)
            {
                var Notices = new Notice
                {
                    id = _unit.Notices.getID(),
                    content = "Nông sản đã và đang thu hoạch sẵn sàng để bán.",
                    sendId = og.sendId,
                    receiveId = item.userName,
                    status_request = "Đã gửi",
                    title = "Nông sản thu hoạch",
                    receiveDate = DateTime.Now,
                    sendDate = DateTime.Now,
                };
                _unit.Notices.Add(Notices);
                _unit.Complete();
            }

            foreach (var item in store)
            {
                var Notices = new Notice
                {
                    id = _unit.Notices.getID(),
                    content = "Nông sản đã và đang thu hoạch sẵn sàng để bán.",
                    sendId = og.sendId,
                    receiveId = item.userName,
                    status_request = "Đã gửi",
                    title = "Nông sản thu hoạch",
                    receiveDate = DateTime.Now,
                    sendDate = DateTime.Now,
                };
                _unit.Notices.Add(Notices);
                _unit.Complete();
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult AddNoticeFarm(Notice og)
        {
            var farm = context.UserLogins.Where(t => t._status == 1 && t._role == "farm").ToList();
            foreach (var item in farm)
            {
                var Notices = new Notice
                {
                    id = _unit.Notices.getID(),
                    content = og.content,
                    sendId = og.sendId,
                    receiveId = item.userName,
                    status_request = "Đã gửi",
                    title = og.title,
                    receiveDate = DateTime.Now,
                    sendDate = DateTime.Now,
                };
                _unit.Notices.Add(Notices);
                _unit.Complete();
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult AddNoticeFactory(Notice og)
        {
            var factory = context.UserLogins.Where(t => t._status == 1 && t.workingFor == og.receiveId).ToList();
            foreach (var item in factory)
            {
                var Notices = new Notice
                {
                    id = _unit.Notices.getID(),
                    content = og.content,
                    sendId = og.sendId,
                    receiveId = item.userName,
                    status_request = "Đã gửi",
                    title = og.title,
                    receiveDate = DateTime.Now,
                    sendDate = DateTime.Now,
                };
                _unit.Notices.Add(Notices);
                _unit.Complete();
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult AddNoticeMerchant(Notice og)
        {
            var merchant = context.UserLogins.Where(t => t._status == 1 && t.workingFor == og.receiveId).ToList();
            foreach (var item in merchant)
            {
                var Notices = new Notice
                {
                    id = _unit.Notices.getID(),
                    content = og.content,
                    sendId = og.sendId,
                    receiveId = item.userName,
                    status_request = "Đã gửi",
                    title = og.title,
                    receiveDate = DateTime.Now,
                    sendDate = DateTime.Now,
                };
                _unit.Notices.Add(Notices);
                _unit.Complete();
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult AddNoticeAllTransport(Notice og)
        {
            var transport = context.UserLogins.Where(t => t._status == 1 && t._role == "transport").ToList();
            foreach (var item in transport)
            {
                var Notices = new Notice
                {
                    id = _unit.Notices.getID(),
                    content = og.content,
                    sendId = og.sendId,
                    receiveId = item.userName,
                    status_request = "Đã gửi",
                    title = og.title,
                    receiveDate = DateTime.Now,
                    sendDate = DateTime.Now,
                };
                _unit.Notices.Add(Notices);
                _unit.Complete();
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult AddNoticeTransport(Notice og)
        {
            var transport = context.UserLogins.Where(t => t._status == 1 && t.workingFor == og.receiveId).ToList();
            foreach (var item in transport)
            {
                var Notices = new Notice
                {
                    id = _unit.Notices.getID(),
                    content = og.content,
                    sendId = og.sendId,
                    receiveId = item.userName,
                    status_request = "Đã gửi",
                    title = og.title,
                    receiveDate = DateTime.Now,
                    sendDate = DateTime.Now,
                };
                _unit.Notices.Add(Notices);
                _unit.Complete();
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult AddNoticeStore(Notice og)
        {
            var store = context.UserLogins.Where(t => t._status == 1 && t.workingFor == og.receiveId).ToList();
            foreach (var item in store)
            {
                var Notices = new Notice
                {
                    id = _unit.Notices.getID(),
                    content = og.content,
                    sendId = og.sendId,
                    receiveId = item.userName,
                    status_request = "Đã gửi",
                    title = og.title,
                    receiveDate = DateTime.Now,
                    sendDate = DateTime.Now,
                };
                _unit.Notices.Add(Notices);
                _unit.Complete();
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult AddNoticeAllStore(Notice og)
        {
            var store = context.UserLogins.Where(t => t._status == 1 && t._role == "store").ToList();
            foreach (var item in store)
            {
                var Notices = new Notice
                {
                    id = _unit.Notices.getID(),
                    content = og.content,
                    sendId = og.sendId,
                    receiveId = item.userName,
                    status_request = "Đã gửi",
                    title = og.title,
                    receiveDate = DateTime.Now,
                    sendDate = DateTime.Now,
                };
                _unit.Notices.Add(Notices);
                _unit.Complete();
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPost]
        public JsonResult Update(Notice og)
        {
            _unit.Notices.Update(og);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id},{req}")]
        public JsonResult UpdateStatus(string id, string req)
        {
            _unit.Notices.updateStatus(id, req);
            _unit.Complete();
            return new JsonResult("Successfully");
        }
    }
}
