using System.Text.Json;

public class JsonService{
    private readonly string _filePath = "mizan-data/courses.json";
    public List<Courses> GetCourses()
    {
        var json=File.ReadAllText(_filePath);
        return JsonSerializer.Deserialize<List<Courses>>(json);
        
    }
}