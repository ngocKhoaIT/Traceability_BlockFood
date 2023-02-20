using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("TypeProduct")]
    public class TypeProduct
    {
        [Key]
        public int typeProductId { get; set; }
        public string? typeName { get; set; }
        public string? procedureOfProduct { get; set; }
        public string? elementOfProduct { get; set; }
        public string? factoryId { get; set; }
        public decimal net_weight { get; set; }
        public string? imageProduct { get; set; }
        public string? brand { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
