using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("DetailTransportPtoP")]
    public class DetailTransportPtoP
    {
        [Key]
        [Column(Order = 1)]
        public string? billId { get; set; }
        [Key]
        [Column(Order = 2)]
        public string? itemBillId { get; set; }
        public string? status_request { get; set; }
    }
}
