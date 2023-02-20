namespace TraceabilityAPI.Models.ModelViews
{
    public class UTO
    {
        public string? billId { get; set; }
        public string? placeId { get; set; }
        public string? placeName { get; set; }
        public string? addressPlace { get; set; }
        public string? goodsId { get; set; }
        public string? goodsName { get; set; }
        public decimal amount { get; set; }
        public decimal amountDelivery { get; set; }
        public string? unit { get; set; }
        public string? toPlace { get; set; }
        public string? toPlaceName { get; set; }
        public string? addresstoPlace { get; set; }
        public string? status_request { get; set; }
        public DateTime date { get; set; }
    }
}
