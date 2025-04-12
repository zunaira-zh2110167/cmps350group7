document.getElementById("showComments").addEventListener("click", function() {
    const commentsDiv = document.getElementById("commentsList");
    commentsDiv.innerHTML = "";

    // Load comments from localStorage
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    if (comments.length === 0) {
        commentsDiv.innerHTML = "<p>No comments found.</p>";
    } else {
        comments.forEach(comment => {
            const div = document.createElement("div");
            div.innerHTML = `
                <strong>${comment.title}</strong><br>
                ${comment.body}<br>
                <em>${comment.date} - ${comment.author} (${comment.role})</em>
                <hr>
            `;
            commentsDiv.appendChild(div);
        });
    }
});
