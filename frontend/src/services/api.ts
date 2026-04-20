import axios from 'axios';
import type { Employee, Department, Attendance, LeaveRequest } from '../types';

// Define Student type locally since it's not in types/index.ts yet
interface Student {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  year_level: number;
  program: string;
  status: 'active' | 'inactive' | 'graduated';
  date_enrolled: string;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getById: async (id: number): Promise<Employee> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees?id=${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  },
  create: async (employee: Partial<Employee>): Promise<Employee> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    const result = await response.json();
    return result.data;
  },
  update: async (id: number, employee: Partial<Employee>): Promise<Employee> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees?id=${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    const result = await response.json();
    return result.data;
  },
  delete: async (id: number): Promise<void> => {
    await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
  },
  getAttendances: async (id: number): Promise<Attendance[]> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees/${id}/attendances`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getLeaveRequests: async (id: number): Promise<LeaveRequest[]> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees/${id}/leave-requests`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
};

export const studentService = {
  getAll: async (): Promise<Student[]> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/students', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getById: async (id: number): Promise<Student> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/students?id=${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  },
  create: async (student: Partial<Student>): Promise<Student> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/students', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    const result = await response.json();
    return result.data;
  },
  update: async (id: number, student: Partial<Student>): Promise<Student> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/students?id=${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    const result = await response.json();
    return result.data;
  },
  delete: async (id: number): Promise<void> => {
    await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/students?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
  },
};

export const facultyService = {
  getAll: async (): Promise<Employee[]> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getById: async (id: number): Promise<Employee> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees?id=${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  },
  getCourses: async (id: number): Promise<any[]> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees/${id}/courses`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getSchedule: async (id: number): Promise<any[]> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees/${id}/schedule`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getStudents: async (id: number): Promise<any[]> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees/${id}/students`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getAnnouncements: async (id: number): Promise<any[]> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/employees/${id}/announcements`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
};

export const departmentService = {
  getAll: async (): Promise<Department[]> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/departments', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getById: async (id: number): Promise<Department> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/departments?id=${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  },
  create: async (department: Partial<Department>): Promise<Department> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/departments', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(department),
    });
    const result = await response.json();
    return result.data;
  },
  update: async (id: number, department: Partial<Department>): Promise<Department> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/departments?id=${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(department),
    });
    const result = await response.json();
    return result.data;
  },
  delete: async (id: number): Promise<void> => {
    await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/departments?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
  },
};

export const subjectService = {
  getAll: async (): Promise<any[]> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/subjects', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getById: async (id: number): Promise<any> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/subjects?id=${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  },
  create: async (subject: Partial<any>): Promise<any> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/subjects', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subject),
    });
    const result = await response.json();
    return result.data;
  },
  update: async (id: number, subject: Partial<any>): Promise<any> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/subjects?id=${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subject),
    });
    const result = await response.json();
    return result.data;
  },
  delete: async (id: number): Promise<void> => {
    await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/subjects?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
  },
};

export const attendanceService = {
  getAll: async (): Promise<Attendance[]> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/attendances', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getById: async (id: number): Promise<Attendance> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/attendances?id=${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  },
  create: async (attendance: Partial<Attendance>): Promise<Attendance> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/attendances', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendance),
    });
    const result = await response.json();
    return result.data;
  },
  update: async (id: number, attendance: Partial<Attendance>): Promise<Attendance> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/attendances?id=${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendance),
    });
    const result = await response.json();
    return result.data;
  },
  delete: async (id: number): Promise<void> => {
    await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/attendances?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
  },
};

export const leaveRequestService = {
  getAll: async (): Promise<LeaveRequest[]> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/leave-requests', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getById: async (id: number): Promise<LeaveRequest> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/leave-requests?id=${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  },
  create: async (leaveRequest: Partial<LeaveRequest>): Promise<LeaveRequest> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/leave-requests', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leaveRequest),
    });
    const result = await response.json();
    return result.data;
  },
  update: async (id: number, leaveRequest: Partial<LeaveRequest>): Promise<LeaveRequest> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/leave-requests?id=${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leaveRequest),
    });
    const result = await response.json();
    return result.data;
  },
  delete: async (id: number): Promise<void> => {
    await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/leave-requests?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
  },
  approve: async (id: number, managerId: number, notes?: string): Promise<LeaveRequest> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/leave-requests/${id}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ manager_id: managerId, notes }),
    });
    const result = await response.json();
    return result.data;
  },
  reject: async (id: number, managerId: number, notes?: string): Promise<LeaveRequest> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/leave-requests/${id}/reject`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ manager_id: managerId, notes }),
    });
    const result = await response.json();
    return result.data;
  },
};

// Student Profile Service
export const studentProfileService = {
  getAll: async (filters?: any): Promise<any[]> => {
    const params = new URLSearchParams();
    if (filters?.interests) params.append('interests', filters.interests);
    if (filters?.interest_category) params.append('interest_category', filters.interest_category);
    if (filters?.gpa_min) params.append('gpa_min', filters.gpa_min);
    if (filters?.gpa_max) params.append('gpa_max', filters.gpa_max);
    if (filters?.needs_intervention) params.append('needs_intervention', filters.needs_intervention);
    if (filters?.learning_style) params.append('learning_style', filters.learning_style);
    if (filters?.skill) params.append('skill', filters.skill);
    if (filters?.activity) params.append('activity', filters.activity);
    if (filters?.affiliation) params.append('affiliation', filters.affiliation);
    if (filters?.search) params.append('search', filters.search);

    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/student-profiles?${params.toString()}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getById: async (id: number): Promise<any> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/student-profiles?id=${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  },
  create: async (profile: any): Promise<any> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/student-profiles', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });
    const result = await response.json();
    return result.data;
  },
  update: async (id: number, profile: any): Promise<any> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/student-profiles?id=${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });
    const result = await response.json();
    return result.data;
  },
  delete: async (id: number): Promise<void> => {
    await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/student-profiles?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
  },
  addInterest: async (interest: any): Promise<any> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/student-interests', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interest),
    });
    const result = await response.json();
    return result.data;
  },
  removeInterest: async (id: number): Promise<void> => {
    await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/student-interests?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
  },
  getPopularInterests: async (): Promise<any> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/popular-interests', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  },
  generateMissingProfiles: async (): Promise<any> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/student-profiles/generate-missing', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  },
};

export const announcementService = {
  getAll: async (audience?: string, department?: string): Promise<any[]> => {
    const params = new URLSearchParams();
    if (audience) params.append('audience', audience);
    if (department) params.append('department', department);
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/announcements?${params.toString()}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data || [];
  },
  getById: async (id: number): Promise<any> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/announcements?id=${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.data;
  },
  create: async (announcement: any): Promise<any> => {
    const response = await fetch('https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/announcements', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(announcement),
    });
    const result = await response.json();
    return result.data;
  },
  update: async (id: number, announcement: any): Promise<any> => {
    const response = await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/announcements?id=${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(announcement),
    });
    const result = await response.json();
    return result.data;
  },
  delete: async (id: number): Promise<void> => {
    await fetch(`https://bivvrelxnkatpaahikvl.supabase.co/functions/v1/announcements?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg',
        'Content-Type': 'application/json',
      },
    });
  },
};

export default api;
