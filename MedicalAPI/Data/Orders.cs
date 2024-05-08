using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalAPI.Data
{
    [Table("orders", Schema = "public")]
    public class Orders
    {
        [Key]
        public int OrderID{get;set;}
        public int MedicineID{get;set;}
        public int UserID{get;set;}
        public string MedicineName{get;set;}
        public int MedicineCount{get;set;}
        public string OrderStatus{get;set;}
     
    }
}