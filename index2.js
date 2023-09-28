// document.addEventListener("DOMContentLoaded", function () {
//     const searchButton = document.getElementById("searchButton");
//     const fetchButton = document.getElementById("fetchButton");
//     const markButton = document.getElementById("markButton");
//     const dateInput = document.getElementById("date");
//     const radioInputs = document.querySelectorAll('input[name="attendance"]');

//     // Function to mark attendance
//     markButton.addEventListener("click", function () {
//         const date = dateInput.value;
//         const studentName = getSelectedStudentName();

//         if (date && studentName) {
//             markAttendance(date, studentName);
//         } else {
//             alert("Please select a date and a student.");
//         }
//     });

//     // Function to fetch attendance
//     fetchButton.addEventListener("click", function () {
//         const date = dateInput.value;

//         if (date) {
//             fetchAttendance(date);
//         } else {
//             alert("Please select a date.");
//         }
//     });

//     // Function to search attendance
//     searchButton.addEventListener("click", function () {
//         const date = dateInput.value;

//         if (date) {
//             searchAttendance(date);
//         } else {
//             alert("Please select a date.");
//         }
//     });

//     function getSelectedStudentName() {
//         for (const radioInput of radioInputs) {
//             if (radioInput.checked) {
//                 return radioInput.value;
//             }
//         }
//         return null;
//     }

//     function markAttendance(date, studentName) {
//         // Make an Axios POST request to mark attendance on the server
//         axios.post('http://localhost:4000/markAttendance', { date, studentName })
//             .then((response) => {
//                 console.log('Attendance marked successfully');
//             })
//             .catch((error) => {
//                 console.error('Error marking attendance', error);
//             });
//     }

//     function fetchAttendance(date) {
//         // Make an Axios GET request to fetch attendance for the specified date from the server
//         axios.get(`http://localhost:4000/fetchAttendance?date=${date}`)
//             .then((response) => {
//                 const attendanceData = response.data;
//                 console.log('Fetched attendance data', attendanceData);

//                 // Calculate collective date attendance percentage and display/process it
//                 calculateAndDisplayPercentage(attendanceData);
//             })
//             .catch((error) => {
//                 console.error('Error fetching attendance data', error);
//             });
//     }

//     function searchAttendance(date) {
//         // Make an Axios GET request to search attendance for the specified date from the server
//         axios.get(`http://localhost:4000/searchAttendance?date=${date}`)
//             .then((response) => {
//                 const attendanceData = response.data;
//                 console.log('Searched attendance data', attendanceData);
//                 // Display or process the searched attendance data as needed
//             })
//             .catch((error) => {
//                 console.error('Error searching attendance data', error);
//             });
//     }

//     function calculateAndDisplayPercentage(attendanceData) {
//         // Calculate collective date attendance percentage for each student
//         const studentAttendancePercentage = {};
//         let totalStudents = 0;

//         attendanceData.forEach((entry) => {
//             const studentName = entry.studentName;
//             const count = entry.count;

//             if (!studentAttendancePercentage[studentName]) {
//                 studentAttendancePercentage[studentName] = 0;
//                 totalStudents++;
//             }

//             studentAttendancePercentage[studentName] += count;
//         });

//         // Calculate percentages
//         for (const student in studentAttendancePercentage) {
//             studentAttendancePercentage[student] = (studentAttendancePercentage[student] / totalStudents) * 100;
//         }

//         console.log('Collective date attendance percentage', studentAttendancePercentage);

//         // Display or process the calculated percentages as needed
//     }
// });






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
