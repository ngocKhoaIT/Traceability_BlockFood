using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Customer")]
    public class Customer
    {
        [Key]
        public string? userName { get; set; }
        public string? pass { get; set; }
        public string? represent { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
