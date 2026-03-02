import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeService, studentService } from '../services/api';

interface LoginFormData {
  id: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    id: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.id.trim()) newErrors.id = 'ID is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('Login attempt:', formData);
      
      // Check for master account first
      if (formData.id === 'MASTER001') {
        if (formData.password === 'password123') {
          console.log('Master credentials correct!');
          // Store master account info in localStorage
          const userData = {
            id: formData.id,
            employeeId: 0,
            name: 'Master Administrator',
            position: 'Master',
            role: 'master',
            isAuthenticated: true
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          console.log('User data stored:', userData);
          
          console.log('About to navigate to dashboard...');
          navigate('/dashboard');
          return;
        } else {
          // Wrong master password
          console.log('Master credentials wrong!');
          setErrors({ general: 'Wrong credentials' });
          setLoading(false);
          return;
        }
      }
      
      // Check for student login (check against actual student_id from database)
      try {
        const students = await studentService.getAll();
        console.log('Fetched students:', students);
        
        const student = students.find((stu: any) => stu.student_id === formData.id);
        console.log('Student found:', student);
        
        if (student) {
          console.log('Attempting student login...');
          
          // Check if student is active
          if (student.status !== 'active') {
            setErrors({ general: 'Student account is not active. Please contact administrator.' });
            setLoading(false);
            return;
          }
          
          // Validate password (default password or changed password)
          // For now, we'll use the default password
          const defaultPassword = 'pncdangalngbayan2026';
          if (formData.password !== defaultPassword) {
            setErrors({ general: 'Invalid Student ID or password' });
            setLoading(false);
            return;
          }
          
          // Store student info in localStorage
          const userData = {
            id: formData.id,
            studentId: student.id,
            name: `${student.first_name} ${student.last_name}`,
            email: student.email,
            role: 'student',
            isAuthenticated: true,
            needsPasswordChange: true // Flag to prompt password change
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          console.log('Student user data stored:', userData);
          
          console.log('About to navigate to student dashboard...');
          navigate('/student-dashboard');
          return;
        }
      } catch (error) {
        console.error('Student login error:', error);
        // Continue to faculty/staff login if student check fails
      }
      
      // Fetch all employees to validate credentials
      const employees = await employeeService.getAll();
      console.log('Fetched employees:', employees);
      
      if (!employees || employees.length === 0) {
        setErrors({ general: 'No employee data available. Please try again.' });
        setLoading(false);
        return;
      }
      
      // Try multiple ID matching strategies
      let employee = null;
      
      // Strategy 1: Try exact match with first_name + last_name (no spaces)
      employee = employees.find(emp => {
        const nameId = emp.first_name.toLowerCase() + emp.last_name.toLowerCase();
        return nameId === formData.id.toLowerCase();
      });
      
      console.log('Strategy 1 result:', employee);
      
      // Strategy 2: Try with first_name.last_name (no spaces, dot)
      if (!employee) {
        employee = employees.find(emp => {
          const nameId = emp.first_name.toLowerCase() + '.' + emp.last_name.toLowerCase();
          return nameId === formData.id.toLowerCase();
        });
        console.log('Strategy 2 result:', employee);
      }
      
      // Strategy 3: Try with first_name + '_' + last_name
      if (!employee) {
        employee = employees.find(emp => {
          const nameId = emp.first_name.toLowerCase() + '_' + emp.last_name.toLowerCase();
          return nameId === formData.id.toLowerCase();
        });
        console.log('Strategy 3 result:', employee);
      }
      
      // Strategy 4: Try with email if it looks like an email
      if (!employee && formData.id.includes('@')) {
        employee = employees.find(emp => emp.email === formData.id);
        console.log('Strategy 4 (email) result:', employee);
      }
      
      console.log('Final employee found:', employee);
      
      if (!employee) {
        setErrors({ general: 'Wrong credentials' });
        setLoading(false);
        return;
      }
      
      // For now, use a simple password validation
      // In production, this should be proper password hashing
      const validPasswords = ['password', '123456', 'admin'];
      if (!validPasswords.includes(formData.password)) {
        setErrors({ general: 'Wrong credentials' });
        setLoading(false);
        return;
      }
      
      // Determine role based on position
      let role = 'faculty';
      if (employee.position === 'Dean') {
        role = 'dean';
      } else if (employee.position === 'Dept Chair') {
        role = 'deptchair';
      }
      
      // Store user info in localStorage
      const userData = {
        id: formData.id,
        employeeId: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
        position: employee.position,
        role: role,
        isAuthenticated: true
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Employee user data stored:', userData);
      
      console.log('About to navigate to dashboard...');
      navigate('/dashboard');
      return;
    } catch (error: any) {
      console.error('Login error:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    if (errors.general) {
      setErrors({ ...errors, general: '' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        padding: '40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            CSS Department
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            margin: 0
          }}>
            Office Management System
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              User ID
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={handleInputChange('id')}
              placeholder="Enter your User ID"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.id ? '1px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              disabled={loading}
            />
            {errors.id && (
              <div style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px'
              }}>
                {errors.id}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.password ? '1px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              disabled={loading}
            />
            {errors.password && (
              <div style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px'
              }}>
                {errors.password}
              </div>
            )}
          </div>

          {errors.general && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '20px',
              color: '#991b1b',
              fontSize: '14px'
            }}>
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#6b7280'
        }}>        </div>
      </div>
    </div>
  );
};

export default Login;
