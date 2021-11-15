using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        

        //protected - available to base and derived classes
        //The null-coalescing operator ?? returns the value of its left-hand operand if it isn't null; 
        //otherwise, it evaluates the right-hand operand and returns its result. 
        //The ?? operator doesn't evaluate its right-hand operand if the left-hand operand evaluates to non-null.
        //Available in C# 8.0 and later, the null-coalescing assignment operator ??= assigns the value of 
        //its right-hand operand to its left-hand operand only if the left-hand operand evaluates to null. 
        //The ??= operator doesn't evaluate its right-hand operand if the left-hand operand evaluates to non-null.
        //C# 6.0 – EXPRESSION-BODIED MEMBERS ( => in properties)
        //
        //IServiceProvider is responsible for resolving instances of types at runtime
        //We get IMediator service through GetService() from IServiceProvider
        private IMediator _mediator;

        //This is readonly property, can be set 
         protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        //Above is equal to:
        // protected IMediator Mediator
        // {
        //     get
        //     {
        //         return _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        //     }
        // }

        // public BaseApiController(IMediator mediator)
        // {
        //     _mediator = mediator;
        // }
    }
}