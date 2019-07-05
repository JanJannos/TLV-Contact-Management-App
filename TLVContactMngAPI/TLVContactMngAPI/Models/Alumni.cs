using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiEmployeeMngMongoDB.Models
{
    public class Alumni : Contact
    {       
        public String GraduationYear { get; set; }
        public Alumni()
        {
            this.ContactType = ContactEnum.Alumni;
        }
    }
}