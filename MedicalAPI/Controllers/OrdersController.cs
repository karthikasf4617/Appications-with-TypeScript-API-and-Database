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

    public class OrdersController:ControllerBase
    {
        private readonly ApplicationDBContext _dbcontext;
        public OrdersController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext=applicationDBContext;
        }
     
        [HttpGet]
       public IActionResult GetOrder()
       {
        return Ok(_dbcontext.orders.ToList());
       }

       [HttpGet("{id}")]
       public IActionResult GetOrderId(int id)
       {
        var order=_dbcontext.orders.FirstOrDefault(order=> order.OrderID==id);
        if(order == null)
        {
            return NotFound();
        }
        return Ok(order);
       }

       //Addiing new user
       [HttpPost]
       public IActionResult PostOrder([FromBody] Orders order)
       {
        _dbcontext.orders.Add(order);
        _dbcontext.SaveChanges();
        return Ok();
       }

       //Upadating existing user
       [HttpPut("{id}")]
       public IActionResult PutOrder(int id,[FromBody] Orders order)
       {
            var orderold=_dbcontext.orders.FirstOrDefault(order=>order.OrderID ==id);
            {
                if(orderold==null)
                {
                    return NotFound();
                }
            }
            orderold.OrderID=order.OrderID;
            orderold.MedicineID=order.MedicineID;
            orderold.UserID=order.UserID;
            orderold.MedicineName=order.MedicineName;
            orderold.MedicineCount=order.MedicineCount;
            orderold.OrderStatus=order.OrderStatus;
            _dbcontext.SaveChanges();
            return Ok();
       }
       //deleting
       [HttpDelete("{id}")]
       public IActionResult DeleteOrder(int id)
       {
        var order=_dbcontext.orders.FirstOrDefault(order=>order.OrderID==id);
        if(order==null)
        {
            return NotFound();
        }
        _dbcontext.orders.Remove(order);
        _dbcontext.SaveChanges();
        return Ok();
       }
    }
}