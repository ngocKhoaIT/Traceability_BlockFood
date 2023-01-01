using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Fruit")]
    public class Fruit
    {
        [Key]
        public string? fruitId { get; set; }
        public string? fruitName { get; set; }
        public string? farmId { get; set; }
        public int seedId { get; set; }
        public string? technology { get; set; }
        public string? land { get; set; }
        public int amount { get; set; }
        public string? unit { get; set; }
        public string? fertilizer { get; set; }
        public string? pesticides { get; set; }
        public string? status_activity { get; set; }
        public DateTime date_plant { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
