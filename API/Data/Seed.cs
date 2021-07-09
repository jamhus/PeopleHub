using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<ApplicationUser> userManager) 
        {
            if (await userManager.Users.AnyAsync()) return;

            var userDate = await System.IO.File.ReadAllTextAsync("Data/SeedData.json");
            var users = JsonSerializer.Deserialize<List<ApplicationUser>>(userDate);

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user,"Pa$$w0rd");
            }

        }
    }
}
