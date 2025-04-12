using System.Text.Json;

public class JsonService{
    private readonly string _filePath = "mizan-data/courses.json";
    public List<Courses> GetCourses()
    {
        var json=File.ReadAllText(_filePath);
#pragma warning disable CS8603 // Possible null reference return.
        return JsonSerializer.Deserialize<List<Courses>>(json);
#pragma warning restore CS8603 // Possible null reference return.
        
    }
}