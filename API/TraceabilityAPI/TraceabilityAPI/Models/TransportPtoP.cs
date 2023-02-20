using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("TransportPtoP")]
    public class TransportPtoP
    {
        [Key]
        public string? billId { get; set; }
        public string? transportId { get; set; }
        public string? placeId { get; set; }
        public decimal temperature { get; set; }
        public decimal humidity { get; set; }
        public string? status_request { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
