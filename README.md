# Student Management System

A browser-based university administration prototype for organizing common student and academic records. The project demonstrates how core student-management workflows can be implemented with HTML, CSS, and vanilla JavaScript, using the browser's `localStorage` for persistence.

> **Academic project notice:** This application is a front-end demonstration. It does not include a server, shared database, authentication, or production-grade access controls. Do not use it to store real or sensitive student information.

## Abstract

The Student Management System (SMS) provides a single-page interface for maintaining basic academic administration records. It brings together student and lecturer details, courses, departments, enrolments, results, fee records, attendance, and user-account entries. The application is intended as an educational prototype illustrating form handling, client-side data management, validation, search, and dynamic table rendering in a web browser.

## Project Objectives

- Present common academic administration functions in one interface.
- Demonstrate create, read, update, and delete (CRUD) interactions in JavaScript.
- Store and retrieve sample records using browser `localStorage`.
- Provide simple student search and dashboard counts.
- Offer a foundation for future development with a secure backend and database.

## Features

- **Dashboard:** summary counts for students, lecturers, courses, and departments.
- **Students:** register student records and search across student details.
- **Lecturers, courses, and departments:** add and maintain basic directory records.
- **Enrolments:** record a student's course and semester.
- **Results:** record marks and calculate a grade using the application's built-in scale.
- **Fees:** record amounts due and paid, with a calculated balance.
- **Attendance:** record a student's course, date, and attendance status.
- **User accounts:** maintain basic user IDs, usernames, and role labels.
- **Record actions:** edit or delete entries in the displayed tables.

## Technology

- HTML5 for the application structure
- CSS3 for presentation
- Vanilla JavaScript for interactions and application logic
- Browser `localStorage` for local persistence

No package manager, framework, or build step is required.

## Repository Structure

```text
Student-Management-system2/
├── Student Attendance .html  # Application page and management forms
├── style.css                 # Page styling
├── script.js                 # Application behavior and local data handling
└── README.md                 # Project documentation
```

## Getting Started

### Requirements

A current desktop or mobile web browser with JavaScript and `localStorage` enabled is sufficient. A local development server is optional.

### Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/cintajack926-Wave/Student-Management-system2.git
   ```

2. Open the project directory.
3. Open `Student Attendance .html` in a web browser.

Alternatively, serve the directory with a local development server and open the page at the address it provides.

## How to Use

1. Open the application page. The dashboard displays current counts for students, lecturers, courses, and departments.
2. Use the sidebar links to navigate to a management section.
3. Enter the requested details in a section's form and submit it to add a record.
4. Use the student search field to filter student records.
5. Use the **Edit** and **Delete** actions in a table to change or remove a record. Deletion requires confirmation.

Some fields are optional, while fields marked as required by the form must be completed. Results accept marks from 0 to 100. Fee entries require non-negative amounts, and the amount paid cannot exceed the amount due.

## Data and Privacy

Records are saved in the browser's `localStorage` on the device and browser profile where the application is being used. Data is not synchronized between users or devices and is not backed up by this project. Clearing browser storage may permanently remove the records. Because the application has no login or server-side access control, use fictional or test data only.

## Scope and Limitations

This version is a client-side prototype intended for learning and demonstration. It does not provide:

- A backend API or centralized database
- Authentication, authorization, or secure account management
- Multi-user access, synchronization, or audit history
- Automated backups, imports, or report exports
- Production-level validation or institutional workflow controls

The account section stores basic account labels only; it does not create credentials or authenticate users. The grade calculation is a simple example and should be checked against the grading policy of any institution before use.

## Possible Further Development

- Introduce a backend API and relational database with appropriate access controls.
- Add authentication, role-based permissions, and audit logging.
- Add validation and error handling for related records and duplicate identifiers.
- Provide data export, backup, and restore capabilities.
- Add automated tests and accessibility improvements.
- Make the interface responsive and add reporting and analytics.

## Academic Use

This repository can be used as a starting point for coursework or demonstration. Students adapting it should follow their institution's rules, cite the source repository where required, and clearly distinguish implemented functionality from proposed extensions.

## Repository

[Student-Management-system2 on GitHub](https://github.com/cintajack926-Wave/Student-Management-system2)
