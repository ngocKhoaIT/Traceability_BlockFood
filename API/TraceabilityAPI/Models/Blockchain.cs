using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Blockchain")]
    public class Blockchain
    {
        [Key]
        public string? hash { get; set; }
        public string? data { get; set; }
        public DateTime timestamp { get; set; }
        public string? previousHash { get; set; }
    }
}
