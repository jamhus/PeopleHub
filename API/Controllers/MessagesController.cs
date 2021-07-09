using API.DTOS;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

        [HttpGet]

        public async Task <ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUserName();

            var messages = await _messageService.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);

            return messages;
        }

        [HttpGet("thread/{username}")]
        public async Task <ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetUserName();

            return Ok(await _messageService.GetMessageThread(currentUsername, username));
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteMessage (int id)
        {
            var username = User.GetUserName();
            var message = await _messageService.GetMessage(id);

            if (message.Sender.UserName != username && message.Recipient.UserName != username) return Unauthorized();

            if (message.Sender.UserName == username) message.SenderDeleted = true;
            
            if (message.Recipient.UserName == username) message.RecipientDeleted = true;

            if (message.RecipientDeleted && message.SenderDeleted) _messageService.DeleteMessage(message);

            if (await _messageService.SaveAllAsync()) return Ok();

            return BadRequest("Problem deleting message");
        }
    }
}
