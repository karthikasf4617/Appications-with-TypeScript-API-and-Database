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

    public class MedicineInfoController:ControllerBase
    {
        private readonly ApplicationDBContext _dbcontext;
        public MedicineInfoController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext=applicationDBContext;
        }

        [HttpGet]
        //get details
        public IActionResult GetMedicineDetails()
        {
            return Ok(_dbcontext.medicines.ToList());
        }


       [HttpGet("{id}")]
       public IActionResult GetMedicineId(int id)
       {
        var medicine=_dbcontext.medicines.FirstOrDefault(medicine=> medicine.MedicineID==id);
        if(medicine == null)
        {
            return NotFound();
        }
        return Ok(medicine);
       }

       //Addiing new user
       [HttpPost]
       public IActionResult PostMedicine([FromBody] MedicineInfo medicine)
       {

        _dbcontext.medicines.Add(medicine);
        _dbcontext.SaveChanges();
        return Ok();
       }

       //Upadating existing user
       [HttpPut("{id}")]
       public IActionResult PutMedicine(int id,[FromBody] MedicineInfo medicine)
       {
        var medicineold=_dbcontext.medicines.FirstOrDefault(medicine=> medicine.MedicineID==id);
        {
            if(medicineold==null)
            {
                return NotFound();
            }
        }
       medicineold.MedicineCount=medicine.MedicineCount;
       medicineold.ExpiryDate=medicine.ExpiryDate;
       medicineold.MedicineName=medicine.MedicineName;
       medicineold.MedicinePrice=medicine.MedicinePrice;
       _dbcontext.SaveChanges();
        return Ok();
       }
       
       //deleting
       [HttpDelete("{id}")]
       public IActionResult DeleteMedicne(int id)
       {
        var medicine=_dbcontext.medicines.FirstOrDefault(medicine=>medicine.MedicineID==id);
        if(medicine==null)
        {
            return NotFound();
        }
        _dbcontext.medicines.Remove(medicine);
        _dbcontext.SaveChanges();
        return Ok();
       }
    }
}