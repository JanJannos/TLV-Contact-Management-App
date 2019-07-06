using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Driver;
using WebApiEmployeeMngMongoDB.Models;

namespace TLVContactMngAPI.MongnDB
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _mongoDb;
        public MongoDbContext()
        {
            // TODO : Replace the following "connectionStringMongo" with the real one

            String connectionStringMongo = "TODO-!!-ASK-ME-FOR-A-CONNECTION-STRING-OR-CREATE-ONE-YOURSELF";
            var mongoClient = new MongoClient(connectionStringMongo);
            _mongoDb = mongoClient.GetDatabase("TLV-Contacts-Management");
        }
      
     
        public IMongoCollection<Contact> Contacts
        {
            get
            {
                return _mongoDb.GetCollection<Contact>("Contacts");
            }
        }
    }
}