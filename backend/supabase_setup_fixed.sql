-- ========================================
-- SUPABASE DATABASE SETUP
-- ========================================
-- Project: bivvrelxnkatpaahikvl
-- Database: postgres
-- Run these scripts in Supabase SQL Editor

-- ========================================
-- 1. ROLES TABLE (Create first - referenced by users)
-- ========================================
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (name) VALUES 
('admin'),
('teacher'),
('student'),
('employee')
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- 2. USERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id BIGINT REFERENCES roles(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role_id ON users(role_id);

-- ========================================
-- 3. DEPARTMENTS TABLE (Create before employees - referenced by employees)
-- ========================================
CREATE TABLE IF NOT EXISTS departments (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- 4. EMPLOYEES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS employees (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(255),
    department_id BIGINT REFERENCES departments(id),
    hire_date DATE,
    salary DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);
CREATE INDEX IF NOT EXISTS idx_employees_department_id ON employees(department_id);

-- ========================================
-- 5. STUDENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS students (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    student_id VARCHAR(255) UNIQUE NOT NULL,
    course VARCHAR(255),
    year_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id);

-- ========================================
-- 6. ATTENDANCES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS attendances (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    employee_id BIGINT NOT NULL REFERENCES employees(id),
    date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    status VARCHAR(50) DEFAULT 'present',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_attendances_employee_id ON attendances(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendances_date ON attendances(date);

-- ========================================
-- 7. LEAVE REQUESTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS leave_requests (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    employee_id BIGINT NOT NULL REFERENCES employees(id),
    leave_type VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    approved_by BIGINT REFERENCES employees(id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_leave_requests_employee_id ON leave_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_status ON leave_requests(status);

-- ========================================
-- 8. STUDENT PROFILES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    student_id BIGINT UNIQUE NOT NULL REFERENCES students(id),
    learning_style VARCHAR(100),
    academic_strengths TEXT,
    gpa DECIMAL(3,2),
    career_aspirations TEXT,
    academic_history JSONB,
    non_academic_activities JSONB,
    skills JSONB,
    affiliations JSONB,
    violations JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_student_profiles_student_id ON student_profiles(student_id);

-- ========================================
-- 9. STUDENT INTERESTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS student_interests (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    student_id BIGINT NOT NULL REFERENCES students(id),
    interest VARCHAR(255) NOT NULL,
    proficiency_level VARCHAR(50),
    years_of_experience INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_student_interests_student_id ON student_interests(student_id);
CREATE INDEX IF NOT EXISTS idx_student_interests_interest ON student_interests(interest);

-- ========================================
-- 10. SUBJECTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS subjects (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    credits INTEGER DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_subjects_code ON subjects(code);

-- ========================================
-- 11. ANNOUNCEMENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS announcements (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    audience VARCHAR(100) DEFAULT 'all',
    author_id BIGINT REFERENCES employees(id),
    priority VARCHAR(50) DEFAULT 'normal',
    is_active BOOLEAN DEFAULT true,
    publish_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_announcements_audience ON announcements(audience);
CREATE INDEX IF NOT EXISTS idx_announcements_author_id ON announcements(author_id);
CREATE INDEX IF NOT EXISTS idx_announcements_is_active ON announcements(is_active);

-- ========================================
-- 12. CACHE TABLE (for Laravel sessions)
-- ========================================
CREATE TABLE IF NOT EXISTS cache (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT,
    expiration INTEGER NOT NULL
);

-- ========================================
-- 13. JOBS TABLE (for Laravel queues)
-- ========================================
CREATE TABLE IF NOT EXISTS jobs (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    queue VARCHAR(255),
    payload JSONB,
    attempts INTEGER DEFAULT 0,
    reserved_at TIMESTAMP,
    available_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_jobs_queue ON jobs(queue);

-- ========================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (adjust as needed)
CREATE POLICY "Users can view own profile" ON student_profiles
    FOR ALL USING (auth.uid()::text = student_id::text);

CREATE POLICY "Authenticated users can read data" ON announcements
    FOR SELECT USING (auth.role() IS NOT NULL);

-- ========================================
-- SAMPLE DATA FOR TESTING
-- ========================================

-- Insert sample departments
INSERT INTO departments (name, description) VALUES 
('Information Technology', 'IT department for software development and technical support'),
('Human Resources', 'HR department for employee management and welfare'),
('Academic Affairs', 'Department for academic programs and student services'),
('Finance', 'Finance department for budget and accounting'),
('Administration', 'Administrative services and operations')
ON CONFLICT (id) DO NOTHING;

-- Insert sample subjects
INSERT INTO subjects (code, name, description, credits) VALUES 
('CS101', 'Introduction to Computer Science', 'Basic concepts of programming and computer science', 3),
('WEB101', 'Web Development Fundamentals', 'HTML, CSS, and JavaScript basics', 3),
('DB101', 'Database Management', 'SQL and database design principles', 3),
('NET101', 'Networking Essentials', 'Computer networks and protocols', 3),
('PROJ101', 'Project Management', 'Software project planning and execution', 3)
ON CONFLICT (id) DO NOTHING;
