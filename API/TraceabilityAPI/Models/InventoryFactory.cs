using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("InventoryFactory")]
    public class InventoryFactory
    {
        [Key]
        public string? id { get; set; }
        public string? factoryId { get; set; }
        public string? harvestId { get; set; }
        public decimal amount { get; set; }
        public string? unit { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
        public int checkM { get; set; }
    }
}
