// Example assessment list
let assessments = [
    { title: "Midterm 1", dueDate: "2025-04-10", effortHours: 5 },
    { title: "Final Exam", dueDate: "2025-05-20", effortHours: 10 }
];

document.getElementById("updateForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const title = document.getElementById("assessmentTitle").value;
    const newDueDate = document.getElementById("newDueDate").value;
    const newEffortHours = document.getElementById("newEffortHours").value;
    
    const assessment = assessments.find(a => a.title === title);
    
    if (assessment) {
        assessment.dueDate = newDueDate;
        assessment.effortHours = parseInt(newEffortHours);
        document.getElementById("result").textContent = "Assessment updated successfully!";
    } else {
        document.getElementById("result").textContent = "Assessment not found.";
    }

    document.getElementById("updateForm").reset();
});