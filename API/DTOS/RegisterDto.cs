using System.ComponentModel.DataAnnotations;

namespace API.DTOS
{
    public class RegisterDto
    {
        [Required]
        [MinLength(3,ErrorMessage ="Username has to be atleast 3 charactars")]
        public string Username{ get; set; }
        [Required]
        [DataType(DataType.Password)]
        [StringLength(8,MinimumLength =4)]
        public string Password { get; set; }
    }
}
