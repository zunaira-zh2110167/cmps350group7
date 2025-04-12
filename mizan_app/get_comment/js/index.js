
// Example course comments
let comments = [
    { title: "Quiz too close to midterm", body: "Please adjust the schedule.", date: "2025-04-01" },
    { title: "Heavy workload", body: "Too many assignments in one week.", date: "2025-04-02" }
];

document.getElementById("showComments").addEventListener("click", function() {
    const commentsDiv = document.getElementById("commentsList");
    commentsDiv.innerHTML = "";

    if (comments.length === 0) {
        commentsDiv.innerHTML = "<p>No comments found.</p>";
    } else {
        comments.forEach(comment => {
            const div = document.createElement("div");
            div.innerHTML = `<strong>${comment.title}</strong><br>${comment.body}<br><em>${comment.date}</em><hr>`;
            commentsDiv.appendChild(div);
        });
    }
});