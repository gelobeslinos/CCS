import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import StudentLogin from './pages/StudentLogin';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import Employees from './pages/Employees';
import Students from './pages/Students';
import Deployments from './pages/Deployments';
import Attendance from './pages/Attendance';
import LeaveRequests from './pages/LeaveRequests';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Protected Route component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = localStorage.getItem('user');
  const isAuthenticated = user && JSON.parse(user).isAuthenticated;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Student Protected Route component
const StudentProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = localStorage.getItem('user');
  const isAuthenticated = user && JSON.parse(user).isAuthenticated;
  const isStudent = user && JSON.parse(user).role === 'student';
  
  if (!isAuthenticated || !isStudent) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/student-dashboard" element={
          <StudentProtectedRoute>
            <StudentDashboard />
          </StudentProtectedRoute>
        } />
        <Route path="/employees" element={
          <ProtectedRoute>
            <Layout>
              <Employees />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/students" element={
          <ProtectedRoute>
            <Layout>
              <Students />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/deployments" element={
          <ProtectedRoute>
            <Layout>
              <Deployments />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/attendance" element={
          <ProtectedRoute>
            <Layout>
              <Attendance />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/leave-requests" element={
          <ProtectedRoute>
            <Layout>
              <LeaveRequests />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
