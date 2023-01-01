using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("UpToTransport")]
    public class UpToTransport
    {
        [Key]
        public string? billId { get; set; }
        public string? placeId { get; set; }
        public string? goodsId { get; set; }
        public decimal amount { get; set; }
        public decimal amountDelivery { get; set; }
        public string? unit { get; set; }
        public string? toPlace { get; set; }
        public string? status_request { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
