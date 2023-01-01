using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Transport")]
    public class Transport
    {
        [Key]
        public string? transportId { get; set; }
        public string? transportName { get; set; }
        public string? note { get; set; }
        public string? personInCharge { get; set; }
        public string? email { get; set; }
        public string? addressTransport { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
