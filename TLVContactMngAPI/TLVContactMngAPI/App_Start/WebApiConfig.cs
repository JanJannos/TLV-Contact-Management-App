using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace TLVContactMngAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // add this to support JSON response and not XML
            config.Formatters.JsonFormatter.SupportedMediaTypes
                .Add(new MediaTypeHeaderValue("text/html"));

            // Enable Cors

            // config.EnableCors(new EnableCorsAttribute("http://localhost:4200;http://localhost:3000", "*", "*"));  // Angular
            config.EnableCors(new EnableCorsAttribute("http://localhost:3000", "*", "*"));  // React
        }
    }
}
