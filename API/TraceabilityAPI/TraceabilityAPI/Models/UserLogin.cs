using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraceabilityAPI.Models
{
    [Table("UserLogin")]
    public class UserLogin
    {
        [Key]
        public string? userName { get; set; }
        public string? _passwordHash { get; set; }
        public string? _passwordSalt { get; set; }
        public string? represent { get; set; }
        public string? _role { get; set; }
        public string? workingFor { get; set; }
        public int _status { get; set; }
        public DateTime date_create { get; set; }
        public DateTime date_update { get; set; }
    }
}
