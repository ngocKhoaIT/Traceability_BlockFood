using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("InventoryStore")]
    public class InventoryStore
    {
        [Key]
        public string? id { get; set; }
        public string? storeId { get; set; }
        public string? goodsId { get; set; }
        public decimal amount { get; set; }
        public string? unit { get; set; }
        public string? imageQR { get; set; }
        public string? status_request { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
