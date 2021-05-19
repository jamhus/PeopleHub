using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class LoginDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Username has to be atleast 3 charactars")]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
