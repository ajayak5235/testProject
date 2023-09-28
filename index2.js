document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date-input");
    const searchButton = document.getElementById("date-search");
    const fetchButton = document.getElementById("fetch-attendance-report");
    const markAttendanceButton = document.getElementById("mark-attendance");
    
    const students = [
        "ajay", "rahul", "ram", "singh", "shivani"
    ];

    // Add event listener to the search button
    searchButton.addEventListener("click", function () {
        const selectedDate = dateInput.value;
        if (selectedDate) {
            // Make an Axios GET request to search attendance for the selected date
            axios.get(`http://localhost:4000/searchAttendance?date=${selectedDate}`)
                .then((response) => {
                    const attendanceList = document.getElementById("attendance-list");
                    attendanceList.innerHTML = "";

                    if (response.data.length === 0) {
                        attendanceList.innerHTML = "No attendance data found for this date.";
                    } else {
                        response.data.forEach((entry) => {
                            const studentName = entry.studentName;
                            const status = entry.status;

                            const listItem = document.createElement("li");
                            listItem.textContent = `${studentName}: ${status}`;
                            attendanceList.appendChild(listItem);
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error searching attendance data", error);
                });
        } else {
            alert("Please select a date.");
        }
    });

    // Add event listener to the fetch attendance report button
    fetchButton.addEventListener("click", function () {
        const selectedDate = dateInput.value;
        if (selectedDate) {
            // Make an Axios GET request to fetch attendance report for the selected date
            axios.get(`http://localhost:4000/fetchAttendance?date=${selectedDate}`)
                .then((response) => {
                    const attendanceList = document.getElementById("attendance-list");
                    attendanceList.innerHTML = "";

                    if (response.data.length === 0) {
                        attendanceList.innerHTML = "No attendance report found for this date.";
                    } else {
                        response.data.forEach((entry) => {
                            const studentName = entry.studentName;
                            const percentage = entry.percentage;

                            const listItem = document.createElement("li");
                            listItem.textContent = `${studentName}: ${percentage}%`;
                            attendanceList.appendChild(listItem);
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching attendance report", error);
                });
        } else {
            alert("Please select a date.");
        }
    });

    // Add event listener to the mark attendance button
    markAttendanceButton.addEventListener("click", function () {
        const selectedDate = dateInput.value;
        const attendanceData = [];

        students.forEach((student) => {
            const presentRadioButton = document.getElementById(`${student}-present`);
            const absentRadioButton = document.getElementById(`${student}-absent`);
            console.log(document.getElementById(`${student}-absent`))

            if (presentRadioButton.checked) {
                attendanceData.push({ studentName: student, status: "present" });
                
            } else if (absentRadioButton.checked) {
                attendanceData.push({ studentName: student, status: "absent" });
                
            }
            presentRadioButton.checked = false;
            absentRadioButton.checked = false;
        });

        if (selectedDate && attendanceData.length > 0) {
            // Make an Axios POST request to mark attendance for the selected date
            axios.post("http://localhost:4000/markAttendance", { date: selectedDate, attendance: attendanceData })
                .then(() => {
                    alert("Attendance marked successfully");
                })
                .catch((error) => {
                    console.error("Error marking attendance", error);
                });
        } else {
            alert("Please select a date and mark attendance for at least one student.");
        }
       
      
    });
});
