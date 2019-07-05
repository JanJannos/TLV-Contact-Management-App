using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiEmployeeMngMongoDB.Models
{
    public class Lecturer : Contact
    {       
        public String Subject { get; set; }


        public Lecturer()
        {
            this.ContactType = ContactEnum.Lecturer;
        }
    }
}