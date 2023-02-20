using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Factory")]
    public class Factory
    {
        [Key]
        public string? factoryId { get; set; }
        public string? factoryName { get; set; }
        public string? note { get; set; }
        public string? personInCharge { get; set; }
        public string? email { get; set; }
        public string? addressFactory { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
