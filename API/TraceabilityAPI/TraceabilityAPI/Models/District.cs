using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("District")]
    public class District
    {
        [Key]
        public int id { get; set; }
        public int idP { get; set; }
        public string? nameD { get; set; }
    }
}
