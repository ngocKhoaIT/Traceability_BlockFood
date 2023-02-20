using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Product")]
    public class Product
    {
        [Key]
        public string? productId { get; set; }
        public string? productName { get; set; }
        public string? factoryId { get; set; }
        public string? harvestId { get; set; }
        public int amountProduct { get; set; }
        public int typeProductId { get; set; }
        public DateTime mfg_date { get; set; }
        public DateTime exp_date { get; set; }
        public decimal net_weight { get; set; }
        public string? unit { get; set; }
        public decimal temperature { get; set; }
        public decimal humidity { get; set; }
        public string? procedureOfProduct { get; set; }
        public string? elementOfProduct { get; set; }
        public string? imageProduct { get; set; }
        public int amountProduct_first { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
