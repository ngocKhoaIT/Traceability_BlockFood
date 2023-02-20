using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace TraceabilityAPI.Models
{
    [Table("Ward")]
    public class Ward
    {
        [Key]
        public int id { get; set; }
        public int idD { get; set; }
        public string? nameW { get; set; }
    }
}
