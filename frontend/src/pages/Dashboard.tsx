import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeService, studentService, attendanceService, leaveRequestService } from '../services/api';
import {
  UserGroupIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalStudents: 0,
    todayAttendance: 0,
    pendingLeaveRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employees, students, attendances, leaveRequests] = await Promise.all([
          employeeService.getAll(),
          studentService.getAll(),
          attendanceService.getAll(),
          leaveRequestService.getAll(),
        ]);

        const today = new Date().toISOString().split('T')[0];
        const todayAttendances = attendances.filter(a => a.date === today);

        const newStats = {
          totalEmployees: employees.length,
          totalStudents: students.length,
          todayAttendance: todayAttendances.length,
          pendingLeaveRequests: leaveRequests.filter(lr => lr.status === 'pending').length,
        };

        setStats(newStats);
      } catch (error) {
        console.error('Dashboard: Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ fontSize: '18px', color: '#6c757d' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #3b82f6'
        }}>
          <div style={{ 
            fontSize: '14px', 
            color: '#6c757d', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Total Employees
          </div>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            {stats.totalEmployees}
          </div>
          <div style={{ fontSize: '14px', color: '#6c757d' }}>
            <UserGroupIcon style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            Staff Members
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #10b981'
        }}>
          <div style={{ 
            fontSize: '14px', 
            color: '#6c757d', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Total Students
          </div>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            {stats.totalStudents}
          </div>
          <div style={{ fontSize: '14px', color: '#6c757d' }}>
            <AcademicCapIcon style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            Enrolled Students
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #8b5cf6'
        }}>
          <div style={{ 
            fontSize: '14px', 
            color: '#6c757d', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Today's Attendance
          </div>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            {stats.todayAttendance}
          </div>
          <div style={{ fontSize: '14px', color: '#6c757d' }}>
            <CalendarDaysIcon style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            Present Today
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #f59e0b'
        }}>
          <div style={{ 
            fontSize: '14px', 
            color: '#6c757d', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Pending Requests
          </div>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            {stats.pendingLeaveRequests}
          </div>
          <div style={{ fontSize: '14px', color: '#6c757d' }}>
            <DocumentTextIcon style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            Leave Requests
          </div>
        </div>
      </div>

      {/* Quick Actions and System Status */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px' 
      }}>
        {/* Quick Actions */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            margin: '0 0 20px', 
            fontSize: '18px', 
            color: '#2c3e50',
            fontWeight: '600'
          }}>
            Quick Actions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => navigate('/employees')}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#eff6ff',
                color: '#1d4ed8',
                border: '1px solid #dbeafe',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <PlusCircleIcon style={{ width: '20px', height: '20px' }} />
              Add New Employee
            </button>
            
            <button
              onClick={() => navigate('/students')}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#f0fdf4',
                color: '#166534',
                border: '1px solid #dcfce7',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AcademicCapIcon style={{ width: '20px', height: '20px' }} />
              Add New Student
            </button>
            
            <button
              onClick={() => navigate('/attendance')}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#faf5ff',
                color: '#7c3aed',
                border: '1px solid #f3e8ff',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <CalendarDaysIcon style={{ width: '20px', height: '20px' }} />
              Mark Attendance
            </button>
            
            <button
              onClick={() => navigate('/leave-requests')}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#fff7ed',
                color: '#c2410c',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <DocumentTextIcon style={{ width: '20px', height: '20px' }} />
              Review Leave Requests
            </button>
          </div>
        </div>

        {/* System Status */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            margin: '0 0 20px', 
            fontSize: '18px', 
            color: '#2c3e50',
            fontWeight: '600'
          }}>
            System Status
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              padding: '12px',
              backgroundColor: '#d4edda',
              borderRadius: '8px',
              borderLeft: '4px solid #28a745'
            }}>
              <div style={{ 
                fontWeight: '600', 
                color: '#155724', 
                marginBottom: '4px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircleIcon style={{ width: '20px', height: '20px' }} />
                System Operational
              </div>
              <div style={{ 
                fontSize: '13px', 
                color: '#155724'
              }}>
                All systems are running normally.
              </div>
            </div>

            <div style={{
              padding: '12px',
              backgroundColor: '#d1ecf1',
              borderRadius: '8px',
              borderLeft: '4px solid #17a2b8'
            }}>
              <div style={{ 
                fontWeight: '600', 
                color: '#0c5460', 
                marginBottom: '4px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ClockIcon style={{ width: '20px', height: '20px' }} />
                Last Sync
              </div>
              <div style={{ 
                fontSize: '13px', 
                color: '#0c5460'
              }}>
                {new Date().toLocaleTimeString()}
              </div>
            </div>

            <div style={{
              padding: '12px',
              backgroundColor: '#fff3cd',
              borderRadius: '8px',
              borderLeft: '4px solid #ffc107'
            }}>
              <div style={{ 
                fontWeight: '600', 
                color: '#856404', 
                marginBottom: '4px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ChartPieIcon style={{ width: '20px', height: '20px' }} />
                Performance
              </div>
              <div style={{ 
                fontSize: '13px', 
                color: '#856404'
              }}>
                Response time under 200ms
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
