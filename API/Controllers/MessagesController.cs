using API.DTOS;
using API.Extensions;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IUserRepository _userRepo;
        private readonly IMessageService _messageService;
        private readonly IMapper _mapper;

        public MessagesController(IUserRepository userRepo, IMessageService messageService, IMapper mapper)
        {
            _userRepo = userRepo;
            _messageService = messageService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage (CreateMessageDto createMessageDto)
        {
            var username = User.GetUserName();
            if (username == createMessageDto.RecipientUsername.ToLower()) return BadRequest("no ego bro");
            
            var sender = await _userRepo.GetUserByUsernameAsync(username);
            var recipient = await _userRepo.GetUserByUsernameAsync(createMessageDto.RecipientUsername.ToLower());

            if (recipient == null) return Unauthorized();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUserName = recipient.UserName,
                Content = createMessageDto.Content
            };

            _messageService.AddMessage(message);

            if (await _messageService.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));

            return BadRequest("Failed to save message");

        }
    }
}
