using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("MerchantFarm")]
    public class MerchantFarm
    {
        [Key]
        public string? billId { get; set; }
        public string? farmId { get; set; }
        public string? merchantId { get; set; }
        public string? harvestId { get; set; }
        public decimal weight_mf { get; set; }
        public decimal weight_delivery { get; set; }
        public string? unit { get; set; }
        public string? toPlace { get; set; }
        public string? status_request { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
