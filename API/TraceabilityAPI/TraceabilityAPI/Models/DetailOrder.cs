using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("DetailOrder")]
    public class DetailOrder
    {
        [Key]
        [Column(Order = 1)]
        public string? billId { get; set; }
        [Key]
        [Column(Order = 2)]
        public string? goodsId { get; set; }
        public decimal amount { get; set; }
        public decimal price { get; set; }
        public decimal discount { get; set; }
        public decimal intoMoney { get; set; }
    }
}
