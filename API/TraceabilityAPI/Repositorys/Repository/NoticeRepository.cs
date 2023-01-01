using Microsoft.AspNetCore.Mvc;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using TraceabilityAPI.Repositorys.Interface;

namespace TraceabilityAPI.Repositorys.Repository
{
    public class NoticeRepository : BaseRepository<Notice>, INotice
    {
        protected DataDbContext context;

        public NoticeRepository(DataDbContext context) : base(context)
        {
            this.context = context;
        }

        public JsonResult getAllReceiveIdRequest(string id, string req)
        {
            var a = context.Notices.Where(t => t.receiveId == id && t.status_request == req).ToList();
            var c = context.UserLogins.ToList();
            var b = context.Persons.ToList();

            var ac = a.Join(c, t1 => t1.sendId, t2 => t2.userName,
                                        (t1, t2) => new
                                        {
                                            id = t1.id,
                                            sendId = t1.sendId,
                                            receiveId = t1.receiveId,
                                            title = t1.title,
                                            content = t1.content,
                                            status_request = t1.status_request,
                                            sendDate = t1.sendDate,
                                            receiveDate = t1.receiveDate,
                                            represent = t2.represent,
                                            role = t2._role,
                                            workingFor = t2.workingFor,
                                        });

            var acb = ac.Join(b, t1 => t1.represent, t2 => t2.identification,
                                                (t1, t2) => new
                                                {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.represent,
                                                    roleSend = t1.role,
                                                    workingForSend = t1.workingFor,
                                                    sendName = t2.lastName + " " + t2.firstName,
                                                    photoSend = t2.imagePerson,
                                                });

            var acb2 = acb.Join(c, t1 => t1.receiveId, t2 => t2.userName,
                                                (t1, t2) => new {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.representSend,
                                                    roleSend = t1.roleSend,
                                                    workingForSend = t1.workingForSend,
                                                    sendName = t1.sendName,
                                                    photoSend = t1.photoSend,
                                                    representReiceive = t2.represent,
                                                    roleReceive = t2._role,
                                                    workingForReceive = t2.workingFor,
                                                });

            var acb3 = acb2.Join(b, t1 => t1.representReiceive, t2 => t2.identification,
                                                (t1, t2) => new {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.representSend,
                                                    roleSend = t1.roleSend,
                                                    workingForSend = t1.workingForSend,
                                                    sendName = t1.sendName,
                                                    photoSend = t1.photoSend,
                                                    representReiceive = t1.representReiceive,
                                                    roleReceive = t1.roleReceive,
                                                    workingForReceive = t1.workingForReceive,
                                                    receiveName = t2.lastName + " " + t2.firstName,
                                                    photoReceive = t2.imagePerson,
                                                });
            return new JsonResult(acb3.OrderByDescending(t=>t.sendDate));
        }

        public JsonResult getAllReciveId(string id)
        {
            var a = context.Notices.Where(t => t.receiveId == id).ToList();
            var c = context.UserLogins.ToList();
            var b = context.Persons.ToList();

            var ac = a.Join(c, t1 => t1.sendId, t2 => t2.userName,
                                        (t1, t2) => new
                                        {
                                            id = t1.id,
                                            sendId = t1.sendId,
                                            receiveId = t1.receiveId,
                                            title = t1.title,
                                            content = t1.content,
                                            status_request = t1.status_request,
                                            sendDate = t1.sendDate,
                                            receiveDate = t1.receiveDate,
                                            represent = t2.represent,
                                            role = t2._role,
                                            workingFor = t2.workingFor,
                                        });

            var acb = ac.Join(b, t1 => t1.represent, t2 => t2.identification,
                                                (t1, t2) => new
                                                {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.represent,
                                                    roleSend = t1.role,
                                                    workingForSend = t1.workingFor,
                                                    sendName = t2.lastName + " " + t2.firstName,
                                                    photoSend = t2.imagePerson,
                                                });

            var acb2 = acb.Join(c, t1 => t1.receiveId, t2 => t2.userName,
                                                (t1, t2) => new {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.representSend,
                                                    roleSend = t1.roleSend,
                                                    workingForSend = t1.workingForSend,
                                                    sendName = t1.sendName,
                                                    photoSend = t1.photoSend,
                                                    representReiceive = t2.represent,
                                                    roleReceive = t2._role,
                                                    workingForReceive = t2.workingFor,
                                                });

            var acb3 = acb2.Join(b, t1 => t1.representReiceive, t2 => t2.identification,
                                                (t1, t2) => new {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.representSend,
                                                    roleSend = t1.roleSend,
                                                    workingForSend = t1.workingForSend,
                                                    sendName = t1.sendName,
                                                    photoSend = t1.photoSend,
                                                    representReiceive = t1.representReiceive,
                                                    roleReceive = t1.roleReceive,
                                                    workingForReceive = t1.workingForReceive,
                                                    receiveName = t2.lastName + " " + t2.firstName,
                                                    photoReceive = t2.imagePerson,
                                                });

            return new JsonResult(acb3.OrderByDescending(t => t.sendDate));
        }

        public JsonResult getAllSendId(string id)
        {
            var a = context.Notices.Where(t => t.sendId == id).ToList();
            var c = context.UserLogins.ToList();
            var b = context.Persons.ToList();

            var ac = a.Join(c, t1 => t1.sendId, t2 => t2.userName,
                                        (t1, t2) => new
                                        {
                                            id = t1.id,
                                            sendId = t1.sendId,
                                            receiveId = t1.receiveId,
                                            title = t1.title,
                                            content = t1.content,
                                            status_request = t1.status_request,
                                            sendDate = t1.sendDate,
                                            receiveDate = t1.receiveDate,
                                            represent = t2.represent,
                                            role = t2._role,
                                            workingFor = t2.workingFor,
                                        });

            var acb = ac.Join(b, t1 => t1.represent, t2 => t2.identification,
                                                (t1, t2) => new
                                                {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.represent,
                                                    roleSend = t1.role,
                                                    workingForSend = t1.workingFor,
                                                    sendName = t2.lastName + " " + t2.firstName,
                                                    photoSend = t2.imagePerson,
                                                });

            var acb2 = acb.Join(c, t1 => t1.receiveId, t2 => t2.userName,
                                                (t1, t2) => new {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.representSend,
                                                    roleSend = t1.roleSend,
                                                    workingForSend = t1.workingForSend,
                                                    sendName = t1.sendName,
                                                    photoSend = t1.photoSend,
                                                    representReiceive = t2.represent,
                                                    roleReceive = t2._role,
                                                    workingForReceive = t2.workingFor,
                                                });

            var acb3 = acb2.Join(b, t1 => t1.representReiceive, t2 => t2.identification,
                                                (t1, t2) => new {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.representSend,
                                                    roleSend = t1.roleSend,
                                                    workingForSend = t1.workingForSend,
                                                    sendName = t1.sendName,
                                                    photoSend = t1.photoSend,
                                                    representReiceive = t1.representReiceive,
                                                    roleReceive = t1.roleReceive,
                                                    workingForReceive = t1.workingForReceive,
                                                    receiveName = t2.lastName + " " + t2.firstName,
                                                    photoReceive = t2.imagePerson,
                                                });

            return new JsonResult(acb3.OrderByDescending(t => t.sendDate));
        }

        public JsonResult getAllSendIdRequest(string id, string req)
        {
            var a = context.Notices.Where(t => t.sendId == id && t.status_request == req).ToList();
            var c = context.UserLogins.ToList();
            var b = context.Persons.ToList();

            var ac = a.Join(c, t1 => t1.sendId, t2 => t2.userName,
                                        (t1, t2) => new
                                        {
                                            id = t1.id,
                                            sendId = t1.sendId,
                                            receiveId = t1.receiveId,
                                            title = t1.title,
                                            content = t1.content,
                                            status_request = t1.status_request,
                                            sendDate = t1.sendDate,
                                            receiveDate = t1.receiveDate,
                                            represent = t2.represent,
                                            role = t2._role,
                                            workingFor = t2.workingFor,
                                        });

            var acb = ac.Join(b, t1 => t1.represent, t2 => t2.identification,
                                                (t1, t2) => new
                                                {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.represent,
                                                    roleSend = t1.role,
                                                    workingForSend = t1.workingFor,
                                                    sendName = t2.lastName + " " + t2.firstName,
                                                    photoSend = t2.imagePerson,
                                                });

            var acb2 = acb.Join(c, t1 => t1.receiveId, t2 => t2.userName,
                                                (t1, t2) => new {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.representSend,
                                                    roleSend = t1.roleSend,
                                                    workingForSend = t1.workingForSend,
                                                    sendName = t1.sendName,
                                                    photoSend = t1.photoSend,
                                                    representReiceive = t2.represent,
                                                    roleReceive = t2._role,
                                                    workingForReceive = t2.workingFor,
                                                });

            var acb3 = acb2.Join(b, t1 => t1.representReiceive, t2 => t2.identification,
                                                (t1, t2) => new {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.representSend,
                                                    roleSend = t1.roleSend,
                                                    workingForSend = t1.workingForSend,
                                                    sendName = t1.sendName,
                                                    photoSend = t1.photoSend,
                                                    representReiceive = t1.representReiceive,
                                                    roleReceive = t1.roleReceive,
                                                    workingForReceive = t1.workingForReceive,
                                                    receiveName = t2.lastName + " " + t2.firstName,
                                                    photoReceive = t2.imagePerson,
                                                });

            return new JsonResult(acb3.OrderByDescending(t => t.sendDate));
        }

        public string getID()
        {
            int result = context.Notices.ToList().Count;
            string reString = (result + 1).ToString();
            if (result >= 0 && result < 10)
                return "TB00" + reString;
            else if (result >= 10 && result < 100)
                return "TB0" + reString;
            else if (result >= 100)
                return "TB" + reString;
            return "";
        }

        public JsonResult getIdNotice(string id)
        {
            var a = context.Notices.Where(t => t.id == id).ToList();
            var c = context.UserLogins.ToList();
            var b = context.Persons.ToList();

            var ac = a.Join(c, t1 => t1.sendId, t2 => t2.userName, 
                                        (t1, t2) => new
                                        {
                                            id = t1.id,
                                            sendId = t1.sendId,
                                            receiveId = t1.receiveId,
                                            title = t1.title,
                                            content = t1.content,
                                            status_request = t1.status_request,
                                            sendDate = t1.sendDate,
                                            receiveDate = t1.receiveDate,
                                            represent = t2.represent,
                                            role = t2._role,
                                            workingFor = t2.workingFor,
                                        });

            var acb = ac.Join(b, t1 => t1.represent, t2 => t2.identification,
                                                (t1, t2) => new
                                                {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.represent,
                                                    roleSend = t1.role,
                                                    workingForSend = t1.workingFor,
                                                    sendName = t2.lastName + " " + t2.firstName,
                                                    photoSend = t2.imagePerson,
                                                });

            var acb2 = acb.Join(c, t1 => t1.receiveId, t2 => t2.userName,
                                                (t1, t2) => new {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.representSend,
                                                    roleSend = t1.roleSend,
                                                    workingForSend = t1.workingForSend,
                                                    sendName = t1.sendName,
                                                    photoSend = t1.photoSend,
                                                    representReiceive = t2.represent,
                                                    roleReceive = t2._role,
                                                    workingForReceive = t2.workingFor,
                                                });

            var acb3 = acb2.Join(b, t1 => t1.representReiceive, t2 => t2.identification,
                                                (t1, t2) => new {
                                                    id = t1.id,
                                                    sendId = t1.sendId,
                                                    receiveId = t1.receiveId,
                                                    title = t1.title,
                                                    content = t1.content,
                                                    status_request = t1.status_request,
                                                    sendDate = t1.sendDate,
                                                    receiveDate = t1.receiveDate,
                                                    representSend = t1.representSend,
                                                    roleSend = t1.roleSend,
                                                    workingForSend = t1.workingForSend,
                                                    sendName = t1.sendName,
                                                    photoSend = t1.photoSend,
                                                    representReiceive = t1.representReiceive,
                                                    roleReceive = t1.roleReceive,
                                                    workingForReceive = t1.workingForReceive,
                                                    receiveName = t2.lastName + " " + t2.firstName,
                                                    photoReceive = t2.imagePerson,
                                                });

            return new JsonResult(acb3.OrderByDescending(t => t.sendDate));
        }

        public void updateStatus(string id, string req)
        {
            var result = context.Notices.Where(t => t.id == id).SingleOrDefault();
            if (result != null)
            {
                result.status_request = req;
                result.receiveDate = DateTime.Now;
                context.Update(result);
            }
        }
    }
}
