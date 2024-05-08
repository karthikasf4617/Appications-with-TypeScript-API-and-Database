using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalAPI.Data
{
    [Table("medicineinfo", Schema = "public")]
    public class MedicineInfo
    {
        [Key]
        public int MedicineID{get;set;}
    
        public string MedicineName{get;set;}
        public int MedicinePrice{get;set;}
        public int MedicineCount{get;set;}
        public  DateTime ExpiryDate{get;set;}
    }
}