using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using MongoDB.Bson;
using MongoDB.Driver;
using WebApiEmployeeMngMongoDB.Models;

namespace TLVContactMngAPI.MongnDB
{
    public class ContactRepository : IContactRepository
    {
        MongoDbContext db = new MongoDbContext();
        public async Task Add(Contact contact)
        {
            try
            {
                Contact _contact = null;
                var total = db.Contacts.CountDocuments(q => q.Id != null);
                switch (contact.ContactType)
                {
                    case ContactEnum.Alumni:
                        _contact = new Alumni
                        {
                            ContactID = total + 1,
                            Email = contact.Email,
                            FirstName = contact.FirstName,
                            LastName = contact.LastName,
                            PhoneNumber = contact.PhoneNumber,
                            GraduationYear = contact.Notes
                        };

                        break;
                    case ContactEnum.Lecturer:
                        _contact = new Lecturer
                        {
                            ContactID = total + 1,
                            Email = contact.Email,
                            FirstName = contact.FirstName,
                            LastName = contact.LastName,
                            PhoneNumber = contact.PhoneNumber,
                            Subject = contact.Notes
                        };
                        break;
                    case ContactEnum.Student:
                        _contact = new Student
                        {
                            ContactID = total + 1,
                            Email = contact.Email,
                            FirstName = contact.FirstName,
                            LastName = contact.LastName,
                            PhoneNumber = contact.PhoneNumber,
                            Faculty = contact.Notes
                        };
                        break;
                    default:
                        throw new Exception("Failed to Insert record !");
                }

                await db.Contacts.InsertOneAsync(_contact);
            }
            catch
            {
                throw;
            }
        }
        public async Task<Contact> GetContact(string id)
        {
            try
            {
                FilterDefinition<Contact> filter = Builders<Contact>.Filter.Eq("ContactID", id);
                return await db.Contacts.Find(filter).FirstOrDefaultAsync();
            }
            catch
            {
                throw;
            }
        }
        public async Task<IEnumerable<Contact>> GetContacts()
        {
            try
            {
                var items = await db.Contacts.Find(_ => true).ToListAsync();

                return items;
            }
            catch (Exception ee)
            {
                throw;
            }
        }
        public async Task Update(Contact updatedContact)
        {
            try
            {
                var filteredContact = Builders<Contact>.Filter.Eq(a => a.ContactID, updatedContact.ContactID);
                Contact recordToInsert = null;
                switch (updatedContact.ContactType)
                {
                    case ContactEnum.Alumni:
                        recordToInsert = new Alumni
                        {
                            ContactID = updatedContact.ContactID,
                            Email = updatedContact.Email,
                            FirstName = updatedContact.FirstName,
                            LastName = updatedContact.LastName,
                            PhoneNumber = updatedContact.PhoneNumber,
                            GraduationYear = updatedContact.Notes
                        };

                        break;
                    case ContactEnum.Lecturer:
                        recordToInsert = new Lecturer
                        {
                            ContactID = updatedContact.ContactID,
                            Email = updatedContact.Email,
                            FirstName = updatedContact.FirstName,
                            LastName = updatedContact.LastName,
                            PhoneNumber = updatedContact.PhoneNumber,
                            Subject = updatedContact.Notes
                        };
                        break;
                    case ContactEnum.Student:
                        recordToInsert = new Student
                        {
                            ContactID = updatedContact.ContactID,
                            Email = updatedContact.Email,
                            FirstName = updatedContact.FirstName,
                            LastName = updatedContact.LastName,
                            PhoneNumber = updatedContact.PhoneNumber,
                            Faculty = updatedContact.Notes
                        };
                        break;
                }



                var result = await db.Contacts.ReplaceOneAsync(filteredContact, recordToInsert);
            }
            catch (Exception ee)
            {
                throw;
            }
        }
        public async Task Delete(string id)
        {
            try
            {
                FilterDefinition<Contact> data = Builders<Contact>.Filter.Eq("ContactID", id);
                await db.Contacts.DeleteOneAsync(data);
            }
            catch
            {
                throw;
            }
        }
    }
}