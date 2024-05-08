using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace MedicalAPI.Controllers
{
    public class ApplicationDBContext:DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
        public DbSet<UserInfo> users{get;set;}
        public DbSet<Orders> orders{get;set;}
        public DbSet<MedicineInfo> medicines{get;set;}
    }
}
