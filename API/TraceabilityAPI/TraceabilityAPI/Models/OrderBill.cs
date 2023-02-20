using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("OrderBill")]
    public class OrderBill
    {
        [Key]
        public string? billId { get; set; }
        public string? employeeId { get; set; }
        public string? customerId { get; set; }
        public DateTime date_create { get; set; }
        public decimal totalBill { get; set; }
    }
}
