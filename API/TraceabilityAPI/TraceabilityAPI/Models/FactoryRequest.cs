using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("FactoryRequest")]
    public class FactoryRequest
    {
        [Key]
        [Column(Order = 1)]
        public string? productId { get; set; }
        [Key]
        [Column(Order = 2)]
        public string? factoryId { get; set; }
        [Key]
        [Column(Order = 3)]
        public string? placeId { get; set; }
        public decimal amount { get; set; }
        public string? unit { get; set; }
        public string? status_request { get; set; }
        public int _status { get; set; }
        public string? status_btn { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
