using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace TraceabilityAPI.Models
{
    [Table("Notice")]
    public class Notice
    {
        [Key]
        public string? id { get; set; }
        public string? sendId { get; set; }
        public string? receiveId { get; set; }
        public string? title { get; set; }
        public string? content { get; set; }
        public string? status_request { get; set; }
        public DateTime sendDate { get; set; }
        public DateTime receiveDate { get; set; }
    }
}
