using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.Text;
using TraceabilityAPI.Models;
using TraceabilityAPI.Repositorys.BaseRepoUnit;
using QRCoder;
using TraceabilityAPI.Models.ModelViews;
using Microsoft.AspNetCore.Authorization;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [Authorize]
    [ApiController]
    public class InventorysController : ControllerBase
    {
        private readonly IUnitOfWork _unit;
        private readonly IWebHostEnvironment _env;

        public InventorysController(IUnitOfWork unit, IWebHostEnvironment env)
        {
            _unit = unit;
            _env = env;
        }

        [HttpGet]
        [Route("{id}")]
        public InventoryStore Get(string id)
        {
            return _unit.Inventorys .GetString(id);
        }

        [HttpGet]
        [Route("{id}")]
        public InventoryStore Check(string id)
        {
            return _unit.Inventorys.checkId(id); 
        }

        [HttpGet]
        [Route("{id}")]
        public JsonResult detailProductFull(string id)
        {
            return _unit.Inventorys.detailProductFull(id);
        }

        [HttpGet]
        [Route("{id}")]
        public JsonResult detailProductWTM(string id)
        {
            return _unit.Inventorys.detailProductWTM(id);
        }

        [HttpGet]
        [Route("{id}")]
        public JsonResult detailProductLiveFull(string id)
        {
            return _unit.Inventorys.detailProductLiveFull(id);
        }

        [HttpGet]
        [Route("{id}")]
        public JsonResult detailProductLiveWTM(string id)
        {
            return _unit.Inventorys.detailProductLiveWTM(id);
        }

        [HttpGet]
        [Route("{id},{req}")]
        public JsonResult getAllInventorybyReceived(string id, string req)
        {
            return _unit.Inventorys.getAllInventorybyReceived(id,req);
        }

        [HttpGet]
        [Route("{id}")]
        public JsonResult getAllInventorybyReceivedStores(string id)
        {
            return _unit.Inventorys.getAllInventorybyReceivedbyStores(id);
        }

        [HttpGet]
        [Route("{id},{req},{search}")]
        public JsonResult getAllListInventoryStore(string id, string req, string search)
        {
            return _unit.Inventorys.getAllListInventoryStore(id,req,search);
        }


        [HttpGet]
        public IEnumerable<InventoryStore> GetAll()
        {
            return _unit.Inventorys.getAllInventory();
        }

        [HttpGet]
        [Route("{id}")]
        public JsonResult GetAllbyStore(string id)
        {
            return _unit.Inventorys.getAllInventoryStorebyStore(id);
        }

        [HttpPost]
        public ActionResult AddInventory(InventoryStore f)
        {
            List<string> imageList = new List<string>();
            List<AP> apList = new List<AP>();

            for (int i = 0; i < 1; i++)
            {
                string guid = Guid.NewGuid().ToString().Substring(0, 12);
                string[] imageOutPut = GenerateFile(guid, f.imageQR);
                var Inventorys = new InventoryStore
                {
                    id = guid,
                    goodsId = f.goodsId,
                    storeId = f.storeId,
                    amount = f.amount,
                    unit = f.unit,
                    imageQR = f.imageQR,
                    status_request = f.status_request,
                    _status = 1,
                    date_create = DateTime.Now,
                    date_update = DateTime.Now,
                };
                imageList.Add(imageOutPut[0]);
                AP ap = new AP
                {
                    id = guid,
                    goodsId = f.goodsId,
                    imagePath = imageOutPut[1],
                    date_receive = DateTime.Now,
                };

                apList.Add(ap);

                _unit.Inventorys.Add(Inventorys);
                _unit.Complete();
            }

            foreach (var i in imageList)
            {
                System.IO.File.Delete(i);
            }

            return new JsonResult("Thêm thành công");
        }

        private static Byte[] BitmapToBytes(Bitmap img)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                img.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                return stream.ToArray();
            }
        }

        private string[] GenerateFile(string qrText, string PathWeb)
        {
            string[] g = new string[2]; 
            string fileGuid = Guid.NewGuid().ToString().Substring(0, 10);
            var physicalPath = _env.ContentRootPath + "/Photos/" + "BFQR-" + fileGuid + ".png";
            g[0] = physicalPath;
            var logo = _env.ContentRootPath + "/Photos/logo.png";
            QRCodeGenerator qRCodeGenerator = new QRCodeGenerator();
            QRCodeData qRCodeData = qRCodeGenerator.CreateQrCode(PathWeb + qrText, QRCodeGenerator.ECCLevel.Q);
            qRCodeData.SaveRawData(physicalPath, QRCodeData.Compression.Uncompressed);
            QRCodeData qrCodeData1 = new QRCodeData(physicalPath, QRCodeData.Compression.Uncompressed);
            Bitmap qrCodeImage;

            using (QRCode qrCode = new QRCode(qrCodeData1))
            {
                qrCodeImage = qrCode.GetGraphic(20, Color.Black, Color.White, (Bitmap)Bitmap.FromFile(logo));
            }

            g[1] = @String.Format("data:image/png;base64,{0}", Convert.ToBase64String(BitmapToBytes(qrCodeImage)));
            return g;
        }

        [HttpPost]
        public ActionResult AutoProduct(InventoryStore f)
        {
            List<string> imageList = new List<string>();
            List<AP> apList = new List<AP>();

            for (int i = 0; i<f.amount;i++)
            {
                string guid = Guid.NewGuid().ToString().Substring(0, 12);
                string[] imageOutPut = GenerateFile(guid, f.imageQR);
                var Inventorys = new InventoryStore
                {
                    id = guid,
                    goodsId = f.goodsId,
                    storeId = f.storeId,
                    amount = 1,
                    unit = f.unit,
                    imageQR = f.imageQR,
                    status_request = f.status_request,
                    _status = 1,
                    date_create = DateTime.Now,
                    date_update = DateTime.Now,
                };
                imageList.Add(imageOutPut[0]);
                AP ap = new AP {
                    id = guid,
                    goodsId = f.goodsId,
                    imagePath = imageOutPut[1],
                    date_receive = DateTime.Now,
                        };

                apList.Add(ap);

                _unit.Inventorys.Add(Inventorys);
                _unit.Complete();
            }

            //StringBuilder str = new StringBuilder();
            //str.Append("<table border=`" + "1px" + "`b>");
            //str.Append("<tr>");
            //str.Append("<td><b><font face=Arial Narrow size=3>id</font></b></td>");
            //str.Append("<td><b><font face=Arial Narrow size=3>goodsId</font></b></td>");
            //str.Append("<td><b><font face=Arial Narrow size=3>date_create</font></b></td>");
            //str.Append("<td><b><font face=Arial Narrow size=3>imagePath</font></b></td>");
            //str.Append("</tr>");

            //foreach(var a in apList)
            //{
            //    str.Append("<tr>");
            //    str.Append("<td><font face=Arial Narrow size=" + "14px" + ">" + a.id.ToString() + "</font></td>");
            //    str.Append("<td><font face=Arial Narrow size=" + "14px" + ">" + a.goodsId.ToString() + "</font></td>");
            //    str.Append("<td><font face=Arial Narrow size=" + "14px" + ">" + a.date_receive.ToString() + "</font></td>");
            //    str.Append("<td><img src=`" + a.imagePath.ToString() + "` /></td>");
            //    str.Append("</tr>");
            //}

            //str.Append("</table>");
            //HttpContext.Response.Headers.Add("content-disposition", "attachment; filename=Information" + DateTime.Now.Year.ToString() + ".xls");
            //this.Response.ContentType = "application/vnd.ms-excel";
            //byte[] temp = System.Text.Encoding.UTF8.GetBytes(str.ToString());

            foreach(var i in imageList)
            {
                System.IO.File.Delete(i);
            }

            //return File(temp, "application/vnd.ms-excel");
            return new JsonResult("Thêm thành công");
        }

        [HttpPost]
        public JsonResult UpdateInventory(InventoryStore f)
        {
            var Inventorys = new InventoryStore
            {
                id = f.id,
                goodsId = f.goodsId,
                storeId = f.storeId,
                amount = f.amount,
                imageQR = f.imageQR,
                status_request = f.status_request,
                unit = f.unit,
                _status = 1,
                date_create = f.date_create,
                date_update = DateTime.Now,
            };
            _unit.Inventorys.Update(Inventorys);
            _unit.Complete();
            return new JsonResult("Updated Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult Delete(string id)
        {
            _unit.Inventorys.Delete(id);
            _unit.Complete();
            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        [Route("{id}")]
        public JsonResult UpdateStatus(string id)
        {
            _unit.Inventorys.updateStatus(id);
            _unit.Complete();
            return new JsonResult("Successfully");
        }

        [HttpPost]
        public JsonResult RemoveInventory(InventoryStore f)
        {
            _unit.Inventorys.Remove(f);
            _unit.Complete();
            return new JsonResult("Removed Successfully");
        }
    }
}
