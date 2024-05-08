using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalAPI.Data
{
    [Table("userinfo", Schema = "public")]
    public class UserInfo
    {
        [Key]
         public int UserID{get;set;}
        public string Email{get;set;}
        public string Password{get;set;}
        public string ConfirmPassword{get;set;}
        public string PhoneNumber{get;set;}
         public double UserBalance{get;set;}

       
    }
}