using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Province")]
    public class Province
    {
        [Key]
        public int id { get; set; }
        public string? nameP { get; set; }
    }
}
