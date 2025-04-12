
// Example assessment list
let assessments = [
    { title: "Midterm 1", dueDate: "2025-04-10" },
    { title: "Final Exam", dueDate: "2025-05-20" }
];

document.getElementById("deleteForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const title = document.getElementById("assessmentTitle").value;
    const index = assessments.findIndex(a => a.title === title);

    if (index !== -1) {
        assessments.splice(index, 1);
        document.getElementById("result").textContent = "Assessment deleted successfully!";
    } else {
        document.getElementById("result").textContent = "Assessment not found.";
    }

    document.getElementById("deleteForm").reset();
});