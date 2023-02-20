using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Farm")]
    public class Farm
    {
        [Key]
        public string? farmId { get; set; }
        public string? farmName { get; set; }
        public string? addressFarm { get; set; }
        public string? note { get; set; }
        public string? farmerId { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
