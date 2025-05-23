document.addEventListener("DOMContentLoaded", async function() {
    try {
        const courses=[
            {
                "coursecode":"CMPS350",
                "coursename":"Web Application Development",
                "program":"CS"
                
            },
            {   
                "coursecode":"CMPS185",
                "coursename":"Introduction To Cybersecurity",
                "program":"CS" 
        
            },
            { 
                "coursecode":"CMPS380",
                "coursename":"Fundamentals Of Cybersecurity",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS385",
                "coursename":"Computer Security",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS151",
                "coursename":"Programming Concepts",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS251",
                "coursename":"Object Oriented Programming",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS303",
                "coursename":"Data Structures",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS205",
                "coursename":"Discrete Structures",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS351",
                "coursename":"Fundamentals Of Database",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS200",
                "coursename":"Computer Ethics",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS323",
                "coursename":"Design And Analysis Of Algorithm",
                "program":"CS"
            },
            { 
                "coursecode":"CMPE263",
                "coursename":"Computer Architecture And Organization",
                "program":"CE"
            },
            { 
                "coursecode":"CMPS405",
                "coursename":"Operating Systems",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS312",
                "coursename":"Mobile Application Development",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS360",
                "coursename":"Data Science Fundamentals",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS307",
                "coursename":"Indroduction To Project Management And Entrepreneurship",
                "program":"CS"
            },
            { 
                "coursecode":"CMPS310",
                "coursename":"Software Engineering",
                "program":"CS"
            },
            { 
                "coursecode":"CMPE355",
                "coursename":"Data Communication And Computer Networks",
                "program":"CE"
            }
        ]
        const newresponse=await fetch("../../mizan-data/assessments.json")
        const typeresponse=await fetch("../../mizan-data/assessment_type.json")
        const deptresponse=await fetch("../../mizan-data/departments.json")
        
        if (!newresponse.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        if (!typeresponse.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        if (!deptresponse.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        
        const assessments=await newresponse.json();
        const types=await typeresponse.json()
        const depts=await deptresponse.json()
        if (!Array.isArray(courses)) {
            throw new Error("Invalid data format: expected array");
        }
        displayCourseIDOption(courses);
        function displayCourseIDOption(courses){
            const courseSelect = document.getElementById("course")
            courses.forEach(course => {
                const option = document.createElement("option");
                option.value = course;
                option.textContent = course.coursecode;
                courseSelect.appendChild(option);
            });
        }
        displayCourseNameOption(courses);
        function displayCourseNameOption(courses){
            const courseSelect = document.getElementById("coursename")
            courses.forEach(course => {
                const option = document.createElement("option");
                option.value = course;
                option.textContent = course.coursename;
                courseSelect.appendChild(option);
            });
        }
        buttonSave=document.getElementById("button")
        buttonSave.addEventListener(submit())
        function submit(){
            const courseSelect=document.getElementById("course")
            const selectedCourse=courses.find(c=>c.coursecode===courseSelect.value)
            const title=document.getElementById("title").value
            const dueDate=document.getElementById("due-date").value
            const [year,month,day]=dueDate.split('-')
            const date=`${day}-${month}-${year}`
            const effortHours=document.getElementById("effort-hours").value
            const weightage=document.getElementById("weight").value
            const typeSelect=document.getElementById("type")
            const selectedType=types.find(t=>t===selectedType.value)
            const courseName=document.getElementById("coursename")
            const selectedName=courses.find(c=>c.coursename===courseName.value)
            const courseProgram=document.getElementById("program")
            const selectedProgram=depts.find(d=>d===courseProgram.value)
            const newAssessment={
                title:title,
                coursecode:selectedCourse,
                coursename:selectedName,
                program:selectedProgram,
                duedate:date,
                efforthours:effortHours,
                weight:weightage,
                assessmenttype:selectedType
            }
            const assessmentsResponse = fetch("assessments.json");
            if (!assessmentsResponse.ok) throw new Error('Failed to load assessments');
            let assessments = assessmentsResponse.json();
            assessments.push(newAssessment)
            try{
            const savedResponse=fetch("../../mizan-data/assessments.json",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(newAssessment)
            })
        }catch(error){
console.error
        }
        }
    } catch (error) {
        console.error("Error:", error);
        displayErrorMessage("Failed to load assessments. Please try again later.");
    }
});
