CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher', 'student') NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIUQE,
    phone_number VARCHAR(15),
    date_of_birth DATE
);

CREATE TABLE Classes (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    class_name VARCHAR(100) NOT NULL,  -- E.g., "Math 101", "English 202"
    grade_level INT NOT NULL           -- E.g., 9, 10, 11, 12
);

CREATE TABLE Sections (
    section_id INT PRIMARY KEY AUTO_INCREMENT,
    class_id INT NOT NULL,  -- class_id from Classes table
    section_name VARCHAR(50) NOT NULL,  -- E.g., "A", "B", "C"
    section_capacity INT,  -- Max number of students per section
    teacher_id INT,  -- Assigned teacher (user_id from Users)
    FOREIGN KEY (class_id) REFERENCES Classes(class_id),
    FOREIGN KEY (teacher_id) REFERENCES Users(user_id)
);

CREATE TABLE StudentSections (
    student_id INT,  -- user_id of student
    section_id INT,  -- section_id from Sections
    PRIMARY KEY (student_id, section_id),
    FOREIGN KEY (student_id) REFERENCES Users(user_id),
    FOREIGN KEY (section_id) REFERENCES Sections(section_id)
);

CREATE TABLE Subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(100) NOT NULL
);

CREATE TABLE TeacherSubjects (
    teacher_id INT,  -- user_id from Users
    subject_id INT,  -- subject_id from Subjects
    PRIMARY KEY (teacher_id, subject_id),
    FOREIGN KEY (teacher_id) REFERENCES Users(user_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id)
);

CREATE TABLE Grades (
    grade_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,  -- user_id from Users
    section_id INT,  -- section_id from Sections
    grade DECIMAL(5, 2),  -- E.g., 85.5
    FOREIGN KEY (student_id) REFERENCES Users(user_id),
    FOREIGN KEY (section_id) REFERENCES Sections(section_id)
);

CREATE TABLE Reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,  -- user_id of student
    section_id INT,  -- section_id from Sections
    grade DECIMAL(5, 2),  -- Overall grade for the section/class
    comments TEXT,  -- Teacher comments or feedback
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Users(user_id),
    FOREIGN KEY (section_id) REFERENCES Sections(section_id)
);
