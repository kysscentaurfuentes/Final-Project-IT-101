CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);
CREATE TABLE sign_in_logs (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(255) NOT NULL,
    sign_in_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);