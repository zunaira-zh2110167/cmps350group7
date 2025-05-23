//send to api
document.getElementById("commentForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const courseId = document.getElementById("courseSelect").value;
  const title = document.getElementById("commentTitle").value.trim();
  const body = document.getElementById("commentBody").value.trim();
  const author = document.getElementById("commentAuthor").value.trim();
  const date = new Date().toISOString().split("T")[0];

  const newComment = { courseId, title, body, author, date };

  localStorage.setItem("comments", JSON.stringify(newComment));
});
