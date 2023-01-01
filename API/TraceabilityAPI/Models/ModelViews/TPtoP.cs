namespace TraceabilityAPI.Models.ModelViews
{
    public class TPtoP
    {
        public string? billId { get; set; }
        public string? transportId { get; set; }
        public string? transportName { get; set; }
        public string? placeId { get; set; }
        public string? placeName { get; set; }
        public string? addressPlace { get; set; }
        public decimal humidity { get; set; }
        public decimal temperature { get; set; }
        public string? status_request { get; set; }
        public DateTime date { get; set; }
    }
}
