using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("Person")]
    public class Person
    {
        [Key]
        public string? identification { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public DateTime birthDay { get; set; }
        public string? phoneNumber { get; set; }
        public string? email { get; set; }
        public string? addressPerson { get; set; }
        public string? sex { get; set; }
        public string? imagePerson { get; set; }
        public string? working { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
