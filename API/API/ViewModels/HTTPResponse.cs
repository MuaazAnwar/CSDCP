
using System.Buffers;
using System.Net;
using Microsoft.AspNetCore.Mvc.Formatters;
using Newtonsoft.Json;
using System.Text;

namespace API.Models
{
	public class Response
    {
        public string msg;
        public object Data;

        public Response( string v2, object v3)
        {
            msg = v2;
            Data = v3;
        }
    
    }
   
}