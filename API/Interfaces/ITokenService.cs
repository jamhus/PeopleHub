using API.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(ApplicationUser user, UserManager<ApplicationUser> userManager);
    }
}
