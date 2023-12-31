using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class RequireQueryParameterAttribute : ActionFilterAttribute
{
    private readonly string _parameterName;

    public RequireQueryParameterAttribute(string parameterName)
    {
        _parameterName = parameterName;
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.HttpContext.Request.Query.ContainsKey(_parameterName))
        {
            context.Result = new BadRequestObjectResult($"The '{_parameterName}' query parameter is required.");
        }
    }
}
