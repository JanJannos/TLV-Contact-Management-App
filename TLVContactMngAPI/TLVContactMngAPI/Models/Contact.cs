using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiEmployeeMngMongoDB.Models
{
    public enum ContactEnum
    {
        Student = 1 , 
        Alumni = 2 ,
        Lecturer = 3
    }

    [BsonKnownTypes(typeof(Alumni), typeof(Lecturer), typeof(Student))]

    public class Contact
    {
        [BsonElement("_Id")]
        [BsonIgnoreIfDefault]
        public ObjectId Id; // matches "_ID" in the database
        public long ContactID { get; set; }
        public ContactEnum ContactType { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String PhoneNumber { get; set; }
        public String Email { get; set; }
        [BsonIgnore]
        public String Notes { get; set; }
    }
}