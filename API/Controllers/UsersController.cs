using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.DTOS;
using AutoMapper;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository repo,IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            return Ok(await _repo.GetMembersAsync());

        }

        //// GET: api/Users/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<ApplicationUser>> GetUserById(int id)
        //{
        //    return await _repo.GetUserByIdAsync(id);
        //}

        // GET: api/Users/khalaf

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
        {
            return await _repo.GetMemberAsync(username);           
        }

    }
}
