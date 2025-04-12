using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CourseController:ControllerBase{
    private readonly JsonService _jsonService;
    public CourseController(JsonService jsonService)
    {
        _jsonService = jsonService;
    }
    
    [HttpGet]
    public IActionResult GetCourses()
    {
        var courses = _jsonService.GetCourses();
        return Ok(courses);
    }
    
    
}