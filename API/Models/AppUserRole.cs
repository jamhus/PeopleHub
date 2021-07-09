using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class AppUserRole : IdentityUserRole<int>
    {
        public ApplicationUser User { get; set; }
        public AppRole Role { get; set; }
    }
}
