using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Merchant")]
    public class Merchant
    {
        [Key]
        public string? merchantId { get; set; }
        public string? merchantName { get; set; }
        public string? addressMerchant { get; set; }
        public string? note { get; set; }
        public string? traderId { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
