document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const errorMsg = document.getElementById("errorMsg");

  try {
    const response = await fetch('data/users.json');
    const users = await response.json();

    const matchedUser = users.find(
      user => user.email === email && user.password === password && user.role === role
    );

    if (matchedUser) {
      localStorage.setItem("user", JSON.stringify(matchedUser));
      alert("Login successful!");

      if (role === "student") {
        window.location.href = "../student_calendar/index.html";
      } else if (role === "instructor") {
        window.location.href = "../add_comment/index.html";
      } else {
        window.location.href = "../add_comment/index.html";
      }      
    } else {
      errorMsg.textContent = "Invalid credentials or role. Try again.";
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
    errorMsg.textContent = "An error occurred. Please try again later.";
  }
});
