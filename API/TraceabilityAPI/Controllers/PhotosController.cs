using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using TraceabilityAPI.Models;
using IronBarCode;

namespace TraceabilityAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        protected DataDbContext context;
        private readonly IWebHostEnvironment _env;
        public PhotosController(IWebHostEnvironment env, DataDbContext dataDbContext)
        {
            context= dataDbContext;
            _env = env;
        }

        private static Byte[] BitmapToBytes(Bitmap img)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                img.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                return stream.ToArray();
            }
        }

        [HttpGet]
        [Route("{qr}")]
        public IActionResult ReadFile(string qr)
        {
            //var physicalPath = _env.ContentRootPath + "/Photos/" + qr;
            //QRCodeData qrCodeData1 = new QRCodeData(physicalPath, QRCodeData.Compression.Uncompressed);
            //var logo = _env.ContentRootPath + "/Photos/logo.png";
            //Bitmap qrCodeImage;

            //var reader = new BarcodeReaderGeneric();
            //QRCode qrCode = new QRCode(qrCodeData1);
            //qrCodeImage = qrCode.GetGraphic(20, Color.LightGreen, Color.White, (Bitmap)Bitmap.FromFile(logo));

            //string base64 = Convert.ToBase64String(BitmapToBytes(qrCodeImage));
            //byte[] imageBytes = Convert.FromBase64String(base64);
            //MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
            //ms.Write(imageBytes, 0, imageBytes.Length);
            //System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);

            //Bitmap bitmap = new Bitmap(image);
            //LuminanceSource source;
            //source = new ZXing.Windows.Compatibility.BitmapLuminanceSource(bitmap);
            //Result result = reader.Decode(source);
            //if (result != null)
            //    return new JsonResult(result.Text.ToString().Trim());
            //else return new JsonResult(Convert.ToBase64String(BitmapToBytes(qrCodeImage)));

            var physicalPath = _env.ContentRootPath + "Photos\\" + qr;
            BarcodeResult Result = BarcodeReader.QuicklyReadOneBarcode(physicalPath, BarcodeEncoding.QRCode);
            if (Result != null)
            {
                return new JsonResult(Result.Value.ToString().Trim());
            }
            else return new JsonResult("Mã QR này ko tồn tại");
        }

        [HttpGet]
        [Route("{qrText},{id}")]
        public IActionResult GenerateFile(string qrText, string id)
        {
            //string fileGuid = Guid.NewGuid().ToString().Substring(0, 4);
            //var physicalPath = _env.ContentRootPath + "/Photos/" + "BFQR-" + fileGuid + ".png";
            //var logo = _env.ContentRootPath + "/Photos/logo.png";
            //QRCodeGenerator qRCodeGenerator = new QRCodeGenerator();
            //QRCodeData qRCodeData = qRCodeGenerator.CreateQrCode("http://localhost:4200/pagelayout/detail/" + qrText, QRCodeGenerator.ECCLevel.Q);
            //qRCodeData.SaveRawData(physicalPath, QRCodeData.Compression.Uncompressed);
            //QRCodeData qrCodeData1 = new QRCodeData(physicalPath, QRCodeData.Compression.Uncompressed);
            //Bitmap qrCodeImage;

            //using (QRCode qrCode = new QRCode(qrCodeData1))
            //{
            //     qrCodeImage = qrCode.GetGraphic(20, Color.LightGreen ,Color.White,(Bitmap)Bitmap.FromFile(logo));
            //}

            //var r = context.Inventories.Where(t=> t.id == id).SingleOrDefault(); 

            //if(r != null)
            //{
            //    r.imageQR = "BFQR-" + fileGuid + ".png";
            //    context.Update(r);
            //    context.SaveChanges();
            //}    

            //return new JsonResult(@String.Format("data:image/png;base64,{0}", Convert.ToBase64String(BitmapToBytes(qrCodeImage))));

            string fileGuid = Guid.NewGuid().ToString().Substring(0, 4);
            var physicalPath = _env.ContentRootPath + "/Photos/" + "BFQR-" + fileGuid + ".png";
            var logo = _env.ContentRootPath + "/Photos/logo.png";
            var MyQRWithLogo = QRCodeWriter.CreateQrCodeWithLogo("http://localhost:4200/pagelayout/detail/" + qrText, logo, 500);
            MyQRWithLogo.ChangeBarCodeColor(System.Drawing.Color.LightGreen).SaveAsPng(physicalPath);
            Bitmap QRCodeImage = MyQRWithLogo.ToBitmap();

            var r = context.Inventories.Where(t => t.id == id).SingleOrDefault();

            if (r != null)
            {
                r.imageQR = "BFQR-" + fileGuid + ".png";
                context.Update(r);
                context.SaveChanges();
            }

            return new JsonResult(@String.Format("data:image/png;base64,{0}", Convert.ToBase64String(BitmapToBytes(QRCodeImage))));
        }

        [HttpGet]
        [Route("{file}")]
        public IActionResult BitmapToImage(string file)
        {
            var physicalPath = _env.ContentRootPath + "/Photos/" + file;
            Bitmap QRCodeImage = (Bitmap)Bitmap.FromFile(physicalPath);
            return new JsonResult(@String.Format("data:image/png;base64,{0}", Convert.ToBase64String(BitmapToBytes(QRCodeImage))));
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }
    }
}
