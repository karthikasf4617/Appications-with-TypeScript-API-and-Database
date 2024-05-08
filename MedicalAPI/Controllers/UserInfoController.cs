using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAPI.Controllers
{
     [Route("api/[controller]")]
    [ApiController]

    public class UserInfoController:ControllerBase
    {
        private readonly ApplicationDBContext _dbcontext;
        public UserInfoController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext=applicationDBContext;
        }
      
       [HttpGet]
       public IActionResult GetUser()
       {
        return Ok(_dbcontext.users.ToList());
       }
       [HttpGet("{id}")]
       public IActionResult GetUserId(int id)
       {
        var user=_dbcontext.users.FirstOrDefault(user=> user.UserID==id);
        if(user == null)
        {
            return NotFound();
        }
        return Ok(user);
       }

       //Addiing new user
       [HttpPost]
       public IActionResult PostUser([FromBody] UserInfo user)
       {
        _dbcontext.users.Add(user);
        _dbcontext.SaveChanges();
        return Ok();
       }
       //Upadating existing user
       [HttpPut("{id}")]
       public IActionResult PutUser(int id,[FromBody] UserInfo user)
       {
        var userold=_dbcontext.users.FirstOrDefault(user=> user.UserID==id);
        {
            if(userold==null)
            {
                return NotFound();
            }
        }
       userold.Email=user.Email;
       userold.Password=user.Password;
       userold.ConfirmPassword=user.ConfirmPassword;
       userold.PhoneNumber=user.PhoneNumber;
       userold.UserBalance=user.UserBalance;
       _dbcontext.SaveChanges();
        return Ok();
       }
       //deleting
       [HttpDelete("{id}")]
       public IActionResult DeleteUser(int id)
       {
        var user=_dbcontext.users.FirstOrDefault(user=>user.UserID==id);
        if(user==null)
        {
            return NotFound();
        }
        _dbcontext.users.Remove(user);
        _dbcontext.SaveChanges();
        return Ok();
       }
    }
}