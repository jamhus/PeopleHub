using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class UserLike
    {
        public ApplicationUser SourceUser { get; set; } // the user who is liking
        public int SourceUserId { get; set; }

        public ApplicationUser LikedUser { get; set; }
        public int LikedUserId { get; set; }

    }
}
