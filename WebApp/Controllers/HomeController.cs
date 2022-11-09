using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebApp.Models;

namespace WebApp.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;

		public HomeController(ILogger<HomeController> logger)
		{
			_logger = logger;
		}

		public IActionResult Index()
		{
			RefreshAllTemp();
			return View();
		}

		private void RefreshAllTemp()
		{
			//Refresh Temp data values
			TempData["uploadVal"] = String.Empty;
			TempData["saveVal"] = String.Empty;
			TempData["uploadInputVal"] = String.Empty;
			TempData["saveInputVal"] = String.Empty;
		}

		public IActionResult UploadAndSave()
		{
			TempData.Keep("uploadInputVal");
			TempData.Keep("saveInputVal");
			return View();
		}

		public IActionResult Upload(string button)
		{
			TempData["uploadInputVal"] = Request.Form["uploadInput"][0];
			TempData["uploadBytes"] = Convert.ToBase64String(UploadFile(Request.Form["uploadInput"][0]));
			return RedirectToAction("UploadAndSave");
		}

		public IActionResult Save(string button)
		{
			TempData["saveInputVal"] = Request.Form["saveInput"][0];
			SaveFile(Request.Form["saveInput"][0], Convert.FromBase64String((string)TempData["uploadBytes"]));
			return RedirectToAction("UploadAndSave");
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}

		public static void SaveFile(string pathToResultFile, byte[] content)
		{
			System.IO.File.WriteAllBytes(pathToResultFile, content);
		}

		public static byte[] UploadFile(string pathToFile)
		{
			byte[] readFile = System.IO.File.ReadAllBytes(pathToFile);
			return readFile;
		}
	}
}