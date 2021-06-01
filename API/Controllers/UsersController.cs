using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.DTOS;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using API.Extensions;
using API.Models;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepository repo, IMapper mapper, IPhotoService photoService)
        {
            _repo = repo;
            _mapper = mapper;
            _photoService = photoService;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            return Ok(await _repo.GetMembersAsync());
        }

        // GET: api/Users/khalaf

        [HttpGet("{username}",Name ="GetUser")]
        public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
        {
            return await _repo.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto model)
        {
            var username = User.GetUserName();
            var user = await _repo.GetUserByUsernameAsync(username);
            _mapper.Map(model, user);
            _repo.Update(user);

            if (await _repo.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto([FromForm] IFormFile file)
        {
            var username = User.GetUserName();
            var user = await _repo.GetUserByUsernameAsync(username);
            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);
            if(await _repo.SaveAllAsync())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName} ,_mapper.Map<PhotoDto>(photo));
            }
            return BadRequest("problem adding photo");
        }

    }
}
