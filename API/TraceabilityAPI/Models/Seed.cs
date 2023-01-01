using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Seed")]
    public class Seed
    {
        [Key]
        public int seedId { get; set; }
        public string? seedName { get; set; }
        public string? farmId { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
