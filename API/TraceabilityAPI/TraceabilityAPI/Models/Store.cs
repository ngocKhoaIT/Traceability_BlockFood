using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Store")]
    public class Store
    {
        [Key]
        public string? storeId { get; set; }
        public string? storeName { get; set; }
        public string? email { get; set; }
        public string? phoneNumber { get; set; }
        public string? addressStore { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}

