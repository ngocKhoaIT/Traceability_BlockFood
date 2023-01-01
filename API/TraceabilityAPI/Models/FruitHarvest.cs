using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("FruitHarvest")]
    public class FruitHarvest
    {
        [Key]
        public string? harvestId { get; set; }
        public string? fruitId { get; set; }
        public DateTime date_harvest { get; set; }
        public decimal weight_harvest { get; set; }
        public string? unit { get; set; }   
        public string? status_request { get; set; }
        public string? imageFH { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
        public decimal weight_harvest_first { get; set; }
    }
}
