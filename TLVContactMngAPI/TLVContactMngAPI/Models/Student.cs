using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiEmployeeMngMongoDB.Models
{
    public class Student : Contact
    {
        public String Faculty { get; set; }

        public Student()
        {
            this.ContactType = ContactEnum.Student;
        }
    }
}