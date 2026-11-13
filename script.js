
// DATA STORAGE
let data = {
    students: JSON.parse(localStorage.getItem("students")) || [],
    lecturers: JSON.parse(localStorage.getItem("lecturers")) || [],
    courses: JSON.parse(localStorage.getItem("courses")) || [],
    departments: JSON.parse(localStorage.getItem("departments")) || [],
    enrolments: JSON.parse(localStorage.getItem("enrolments")) || [],
    results: JSON.parse(localStorage.getItem("results")) || [],
    fees: JSON.parse(localStorage.getItem("fees")) || [],
    attendance: JSON.parse(localStorage.getItem("attendance")) || [],
    users: JSON.parse(localStorage.getItem("users")) || []
};

function saveData() {
    Object.keys(data).forEach(key => {
        localStorage.setItem(key, JSON.stringify(data[key]));
    });
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function getValue(id) {
    return document.getElementById(id).value.trim();
}

function clearForm(formId) {
    document.getElementById(formId).reset();
}

// DISPLAY TABLES
function displayTable(type, tableId, columns) {
    const table = document.getElementById(tableId);

    table.innerHTML = data[type].map((item, index) => `
        <tr>
            ${columns.map(column => `<td>${escapeHTML(item[column])}</td>`).join("")}
            <td>
                <button onclick="editRecord('${type}', ${index})">Edit</button>
                <button onclick="deleteRecord('${type}', ${index})">Delete</button>
            </td>
        </tr>
    `).join("");
}

// DELETE RECORD
function deleteRecord(type, index) {
    if (confirm("Are you sure you want to delete this record?")) {
        data[type].splice(index, 1);
        saveData();
        refreshAll();
    }
}

// EDIT RECORD
function editRecord(type, index) {
    const item = data[type][index];
    const keys = Object.keys(item);
    const updated = {};

    for (let key of keys) {
        const answer = prompt("Enter " + key + ":", item[key]);
        if (answer === null) return;
        updated[key] = answer.trim();
    }

    data[type][index] = updated;
    saveData();
    refreshAll();
}

// DASHBOARD COUNTS
function updateDashboard() {
    document.getElementById("totalStudents").textContent = data.students.length;
    document.getElementById("totalLecturers").textContent = data.lecturers.length;
    document.getElementById("totalCourses").textContent = data.courses.length;
    document.getElementById("totalDepartments").textContent = data.departments.length;
}

// REFRESH ALL TABLES
function refreshAll() {
    displayTable("students", "studentTable",
        ["studentID", "studentName", "studentEmail", "studentPhone", "studentDepartment", "studentYear"]);

    displayTable("lecturers", "lecturerTable",
        ["lecturerID", "lecturerName", "lecturerEmail", "lecturerDepartment"]);

    displayTable("courses", "courseTable",
        ["courseCode", "courseName", "courseDepartment", "courseLecturer"]);

    displayTable("departments", "departmentTable",
        ["departmentCode", "departmentName", "departmentHead"]);

    displayTable("enrolments", "enrolmentTable",
        ["enrolmentStudentID", "enrolmentCourseCode", "enrolmentSemester"]);

    displayTable("results", "resultTable",
        ["resultStudentID", "resultCourseCode", "resultMarks", "resultGrade"]);

    displayTable("fees", "feeTable",
        ["feeStudentID", "feeAmount", "feePaid", "feeBalance"]);

    displayTable("attendance", "attendanceTable",
        ["attendanceStudentID", "attendanceCourse", "attendanceDate", "attendanceStatus"]);

    displayTable("users", "userTable",
        ["userID", "username", "userRole"]);

    updateDashboard();
}

// REGISTER STUDENT
document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        studentID: getValue("studentID"),
        studentName: getValue("studentName"),
        studentEmail: getValue("studentEmail"),
        studentPhone: getValue("studentPhone"),
        studentDepartment: getValue("studentDepartment"),
        studentYear: getValue("studentYear")
    };

    if (data.students.some(s => s.studentID.toLowerCase() === student.studentID.toLowerCase())) {
        alert("This admission number already exists.");
        return;
    }

    data.students.push(student);
    saveData();
    clearForm("studentForm");
    refreshAll();
    alert("Student registered successfully.");
});

// REGISTER LECTURER
document.getElementById("lecturerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const lecturer = {
        lecturerID: getValue("lecturerID"),
        lecturerName: getValue("lecturerName"),
        lecturerEmail: getValue("lecturerEmail"),
        lecturerDepartment: getValue("lecturerDepartment")
    };

    data.lecturers.push(lecturer);
    saveData();
    clearForm("lecturerForm");
    refreshAll();
});

// REGISTER COURSE
document.getElementById("courseForm").addEventListener("submit", function(event) {
    event.preventDefault();

    data.courses.push({
        courseCode: getValue("courseCode"),
        courseName: getValue("courseName"),
        courseDepartment: getValue("courseDepartment"),
        courseLecturer: getValue("courseLecturer")
    });

    saveData();
    clearForm("courseForm");
    refreshAll();
});

// REGISTER DEPARTMENT
document.getElementById("departmentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    data.departments.push({
        departmentCode: getValue("departmentCode"),
        departmentName: getValue("departmentName"),
        departmentHead: getValue("departmentHead")
    });

    saveData();
    clearForm("departmentForm");
    refreshAll();
});

// ENROL STUDENT
document.getElementById("enrolmentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    data.enrolments.push({
        enrolmentStudentID: getValue("enrolmentStudentID"),
        enrolmentCourseCode: getValue("enrolmentCourseCode"),
        enrolmentSemester: getValue("enrolmentSemester")
    });

    saveData();
    clearForm("enrolmentForm");
    refreshAll();
});

// RECORD RESULTS
document.getElementById("resultForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const marks = Number(getValue("resultMarks"));

    if (marks < 0 || marks > 100) {
        alert("Marks must be between 0 and 100.");
        return;
    }

    let grade = "F";
    if (marks >= 70) grade = "A";
    else if (marks >= 60) grade = "B";
    else if (marks >= 50) grade = "C";
    else if (marks >= 40) grade = "D";

    data.results.push({
        resultStudentID: getValue("resultStudentID"),
        resultCourseCode: getValue("resultCourseCode"),
        resultMarks: marks,
        resultGrade: grade
    });

    saveData();
    clearForm("resultForm");
    refreshAll();
});

// RECORD FEES
document.getElementById("feeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const amount = Number(getValue("feeAmount"));
    const paid = Number(getValue("feePaid"));

    if (amount < 0 || paid < 0 || paid > amount) {
        alert("Please enter valid fee amounts. Amount paid cannot exceed amount due.");
        return;
    }

    data.fees.push({
        feeStudentID: getValue("feeStudentID"),
        feeAmount: amount,
        feePaid: paid,
        feeBalance: amount - paid
    });

    saveData();
    clearForm("feeForm");
    refreshAll();
});

// RECORD ATTENDANCE
document.getElementById("attendanceForm").addEventListener("submit", function(event) {
    event.preventDefault();

    data.attendance.push({
        attendanceStudentID: getValue("attendanceStudentID"),
        attendanceCourse: getValue("attendanceCourse"),
        attendanceDate: getValue("attendanceDate"),
        attendanceStatus: getValue("attendanceStatus")
    });

    saveData();
    clearForm("attendanceForm");
    refreshAll();
});

// CREATE USER
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();

    data.users.push({
        userID: getValue("userID"),
        username: getValue("username"),
        userRole: getValue("userRole")
    });

    saveData();
    clearForm("userForm");
    refreshAll();
});

// SEARCH STUDENTS
document.getElementById("studentSearch").addEventListener("input", function() {
    const search = this.value.toLowerCase();

    const filtered = data.students.filter(student =>
        Object.values(student).some(value =>
            String(value).toLowerCase().includes(search)
        )
    );

    const table = document.getElementById("studentTable");

    table.innerHTML = filtered.map(student => {
        const index = data.students.indexOf(student);

        return `
            <tr>
                <td>${escapeHTML(student.studentID)}</td>
                <td>${escapeHTML(student.studentName)}</td>
                <td>${escapeHTML(student.studentEmail)}</td>
                <td>${escapeHTML(student.studentPhone)}</td>
                <td>${escapeHTML(student.studentDepartment)}</td>
                <td>${escapeHTML(student.studentYear)}</td>
                <td>
                    <button onclick="editRecord('students', ${index})">Edit</button>
                    <button onclick="deleteRecord('students', ${index})">Delete</button>
                </td>
            </tr>
        `;
    }).join("");
});

// START SYSTEM
refreshAll();
