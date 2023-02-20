namespace TraceabilityAPI.Models.ModelViews
{
    public class MF
    {
        public string? billId {get; set;}
        public string? fruitName { get; set; } 
        public string? harvestId { get; set; }
        public string? farmId { get; set; }
        public string? farmName { get; set; }
        public string? addressFarm { get; set; }
        public string? merchantId { get; set; }
        public string? toPlace { get; set; }
        public decimal weight { get; set; }
        public decimal weightDelivery { get; set; }
        public string? unit { get; set; }
        public string? merchantName { get; set; }
        public string? addressMerchant { get; set; }
        public string? traderId { get; set; }
        public string? toPlaceName { get; set; }
        public string? addresstoPlace { get; set; }
        public DateTime date { get; set; }
    }
}
