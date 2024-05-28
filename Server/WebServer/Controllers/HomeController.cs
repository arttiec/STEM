using System.Diagnostics;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using WebServer.Models;

namespace WebServer.Controllers;

public class HomeController : Controller
{
    private static Random random = new Random();
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        int number = random.Next(1, 999);
        string Id = $"USER{number:D3}";
        
        ViewData["UserId"] = Id;

        CookieOptions options = new CookieOptions
        {
            Expires = DateTime.Now.AddHours(12),
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None
        };

        Response.Cookies.Append("UserId", Id,  options);

        return View();
    }
    
    public IActionResult Manipulator(string id)
    {
        ViewData["PrototypeId"] = id;
        
        if (Request.Cookies.TryGetValue("UserId", out string? UserId)) 
        {
            ViewData["UserId"] = UserId; 
        }
        else
        {
            ViewData["UserId"] = null;
        }
        
        return View();
    }
    
    public IActionResult Car(string id)
    {
        ViewData["Id"] = id;
        
        if (Request.Cookies.TryGetValue("UserId", out string? UserId)) 
        {
            ViewData["UserId"] = UserId; 
        }
        else
        {
            ViewData["UserId"] = null;
        }
        
        return View();
    }

    public IActionResult Cookie()
    {
        if (Request.Cookies.TryGetValue("UserId", out string? Id)) 
        {
            ViewData["UserId"] = Id; 
        }
        else
        {
            ViewData["UserId"] = null;
        }

        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
