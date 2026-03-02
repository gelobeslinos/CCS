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

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const employeeService = {
  getAll: (): Promise<Employee[]> => api.get('/employees').then(res => res.data.data),
  getById: (id: number): Promise<Employee> => api.get(`/employees/${id}`).then(res => res.data),
  create: (employee: Partial<Employee>): Promise<Employee> => api.post('/employees', employee).then(res => res.data),
  update: (id: number, employee: Partial<Employee>): Promise<Employee> => api.put(`/employees/${id}`, employee).then(res => res.data),
  delete: (id: number): Promise<void> => api.delete(`/employees/${id}`).then(res => res.data),
  getAttendances: (id: number): Promise<Attendance[]> => api.get(`/employees/${id}/attendances`).then(res => res.data),
  getLeaveRequests: (id: number): Promise<LeaveRequest[]> => api.get(`/employees/${id}/leave-requests`).then(res => res.data),
};

export const studentService = {
  getAll: (): Promise<Student[]> => api.get('/students').then(res => res.data.data),
  getById: (id: number): Promise<Student> => api.get(`/students/${id}`).then(res => res.data),
  create: (student: Partial<Student>): Promise<Student> => api.post('/students', student).then(res => res.data),
  update: (id: number, student: Partial<Student>): Promise<Student> => api.put(`/students/${id}`, student).then(res => res.data),
  delete: (id: number): Promise<void> => api.delete(`/students/${id}`).then(res => res.data),
};

export const departmentService = {
  getAll: (): Promise<Department[]> => api.get('/departments').then(res => res.data.data),
  getById: (id: number): Promise<Department> => api.get(`/departments/${id}`).then(res => res.data),
  create: (department: Partial<Department>): Promise<Department> => api.post('/departments', department).then(res => res.data),
  update: (id: number, department: Partial<Department>): Promise<Department> => api.put(`/departments/${id}`, department).then(res => res.data),
  delete: (id: number): Promise<void> => api.delete(`/departments/${id}`).then(res => res.data),
};

export const attendanceService = {
  getAll: (): Promise<Attendance[]> => api.get('/attendances').then(res => res.data.data),
  getById: (id: number): Promise<Attendance> => api.get(`/attendances/${id}`).then(res => res.data),
  create: (attendance: Partial<Attendance>): Promise<Attendance> => api.post('/attendances', attendance).then(res => res.data),
  update: (id: number, attendance: Partial<Attendance>): Promise<Attendance> => api.put(`/attendances/${id}`, attendance).then(res => res.data),
  delete: (id: number): Promise<void> => api.delete(`/attendances/${id}`).then(res => res.data),
};

export const leaveRequestService = {
  getAll: (): Promise<LeaveRequest[]> => api.get('/leave-requests').then(res => res.data.data),
  getById: (id: number): Promise<LeaveRequest> => api.get(`/leave-requests/${id}`).then(res => res.data),
  create: (leaveRequest: Partial<LeaveRequest>): Promise<LeaveRequest> => api.post('/leave-requests', leaveRequest).then(res => res.data),
  update: (id: number, leaveRequest: Partial<LeaveRequest>): Promise<LeaveRequest> => api.put(`/leave-requests/${id}`, leaveRequest).then(res => res.data),
  delete: (id: number): Promise<void> => api.delete(`/leave-requests/${id}`).then(res => res.data),
  approve: (id: number, managerId: number, notes?: string): Promise<LeaveRequest> => 
    api.post(`/leave-requests/${id}/approve`, { manager_id: managerId, notes }).then(res => res.data),
  reject: (id: number, managerId: number, notes?: string): Promise<LeaveRequest> => 
    api.post(`/leave-requests/${id}/reject`, { manager_id: managerId, notes }).then(res => res.data),
};

export default api;
