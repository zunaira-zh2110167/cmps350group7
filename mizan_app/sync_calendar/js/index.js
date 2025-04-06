document.getElementById("syncButton").addEventListener("click", function() {
    const linksDiv = document.getElementById("calendarLinks");
    linksDiv.innerHTML = "";

    assessments.forEach(assessment => {
        const startDate = formatDateForCalendar(assessment.dueDate);
        const endDate = formatDateForCalendar(assessment.dueDate);

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(assessment.title)}&dates=${startDate}/${endDate}&details=Assessment%20due%20for%20your%20course!&sf=true&output=xml`;

        const a = document.createElement("a");
        a.href = calendarUrl;
        a.target = "_blank";
        a.textContent = `Add "${assessment.title}" to Google Calendar`;
        a.style.display = "block";
        linksDiv.appendChild(a);
    });
});

function formatDateForCalendar(dateString) {
    const date = new Date(dateString);
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}
