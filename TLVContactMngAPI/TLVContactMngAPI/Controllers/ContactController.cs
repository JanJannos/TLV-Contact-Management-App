using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApiEmployeeMngMongoDB.Models;
using TLVContactMngAPI.MongnDB;

namespace TLVContactMngAPI.Controllers
{
    public class ContactController : ApiController
    {
        private readonly IContactRepository _dataAccessProvider = new ContactRepository();

        public async Task<HttpResponseMessage> Get()
        {
            try
            {               
                var objects = await _dataAccessProvider.GetContacts();
                return Request.CreateResponse(HttpStatusCode.OK, objects);
            }
            catch (Exception ee)
            {

                throw;
            }

        
        }


        public String Post(Contact _Contact)
        {
            try
            {               
                _dataAccessProvider.Add(_Contact);
                return "Contact has been added successfully!";
            }
            catch (Exception e)
            {

                throw;
            }
        }


        public String Put(Contact _Contact)
        {
            try
            {
                var obj = _dataAccessProvider.GetContact(_Contact.ContactID.ToString());
                if (obj != null)
                {
                    _dataAccessProvider.Update(_Contact);
                    return "Contact has been updated successfully!";
                }

                return "Contact Update has failed!";
            }
            catch (Exception e)
            {
                return "Contact Update has failed!";
            }
        }

        public String Delete(int id)
        {
            try
            {
                var _Contact = _dataAccessProvider.GetContact(id.ToString());
                if (_Contact != null)
                {
                    _dataAccessProvider.Delete(id.ToString());
                    return "The Contact has been removed successfully!";
                }
                return "Failed to delete the requested Contact !";
            }
            catch (Exception e)
            {
                return "Failed to delete the requested Contact !";
            }
        }

    }
}
