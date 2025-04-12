async function loadCourses() {
  try {
    const response = await fetch('../mizan-data/courses.json'); 
    const courses = await response.json();

    const courseSelect = document.getElementById("courseSelect");

    courses.forEach(course => {
      const option = document.createElement("option");
      option.value = course.coursecode;
      option.textContent = `${course.coursecode} - ${course.coursename}`;
      courseSelect.appendChild(option);
    });

  } catch (error) {
    console.error("Failed to load courses:", error);
  }
}


loadCourses(); 
  
document.getElementById("commentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const course = document.getElementById("courseSelect").value;
  const title = document.getElementById("commentTitle").value.trim();
  const body = document.getElementById("commentBody").value.trim();
  const successMsg = document.getElementById("successMsg");

  const user = JSON.parse(localStorage.getItem("user")) || { email: "student@example.com", role: "student" };
  const author = user.email;
  const role = user.role;
  const date = new Date().toLocaleDateString("en-GB"); // dd/mm/yyyy

  const comment = {
    course: course,
    title: title,
    body: body,
    author: author,
    role: role,
    date: date
  };

  console.log("Comment submitted:", comment);
  let existingComments = JSON.parse(localStorage.getItem("comments")) || [];
  existingComments.push(comment);
  localStorage.setItem("comments", JSON.stringify(existingComments));

  successMsg.textContent = "Comment submitted successfully!";
  document.getElementById("commentForm").reset();
});
