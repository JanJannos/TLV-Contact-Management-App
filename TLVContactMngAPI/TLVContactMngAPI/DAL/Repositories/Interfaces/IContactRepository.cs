using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApiEmployeeMngMongoDB.Models;

namespace TLVContactMngAPI.MongnDB
{
    public interface IContactRepository
    {
        Task Add(Contact contact);
        Task Update(Contact contact);
        Task Delete(string id);
        Task<Contact> GetContact(string id);
        Task<IEnumerable<Contact>> GetContacts();
    }
}
