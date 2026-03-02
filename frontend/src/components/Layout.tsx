import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faUserGraduate, faCalendarCheck, faFileAlt, faChalkboardTeacher, faSignOutAlt, faUserTie, faBars } from "@fortawesome/free-solid-svg-icons";

const navigation = [
  { name: 'Dashboard', href: '/', icon: faHome },
  { name: 'Employees', href: '/employees', icon: faUsers },
  { name: 'Students', href: '/students', icon: faUserGraduate },
  { name: 'Deployments', href: '/deployments', icon: faChalkboardTeacher },
  { name: 'Attendance', href: '/attendance', icon: faCalendarCheck },
  { name: 'Leave Requests', href: '/leave-requests', icon: faFileAlt },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Check if user is authenticated
  const getUserInfo = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const userInfo = getUserInfo();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      display: 'flex', 
      flexDirection: 'column',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* Sidebar */}
      {!isMobile && (
        <div
          style={{
            width: '280px',
            backgroundColor: '#2c3e50',
            color: 'white',
            flexShrink: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 30,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Profile Section */}
          <div style={{
            padding: '30px 20px',
            borderBottom: '1px solid #34495e',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#3498db',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              <FontAwesomeIcon icon={faUserTie} />
            </div>
            <h3 style={{ margin: '0 0 5px', fontSize: '18px' }}>
              Administrator
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              color: '#bdc3c7',
              marginBottom: '10px'
            }}>
              Admin Account
            </p>
            <span style={{
              backgroundColor: '#27ae60',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              Active
            </span>
          </div>
          
          {/* Navigation Menu */}
          <nav style={{ flex: 1, padding: '20px 0' }}>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px 20px',
                    borderRadius: '0',
                    marginBottom: '2px',
                    textDecoration: 'none',
                    backgroundColor: isActive ? '#3498db' : 'transparent',
                    color: isActive ? 'white' : '#bdc3c7',
                    transition: 'all 0.3s ease',
                    borderLeft: isActive ? '4px solid #2980b9' : '4px solid transparent',
                    fontWeight: 'bold'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#34495e';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#bdc3c7';
                    }
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} style={{ width: '20px', height: '20px', marginRight: '12px' }} />
                  <span style={{ fontSize: '14px' }}>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          
          {/* Logout Button */}
          <div style={{ padding: '20px' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c0392b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e74c3c';
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '280px',
            backgroundColor: '#2c3e50',
            color: 'white',
            zIndex: 50,
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ padding: '24px 16px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
              CSS Department
            </h1>
          </div>
          <nav style={{ padding: '0 16px' }}>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '4px',
                    textDecoration: 'none',
                    backgroundColor: isActive ? '#3498db' : 'transparent',
                    color: isActive ? 'white' : '#bdc3c7',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#34495e';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#bdc3c7';
                    }
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} style={{ width: '20px', height: '20px', marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        marginLeft: isMobile ? 0 : '280px',
        minHeight: '100vh'
      }}>
        {/* Mobile header */}
        {isMobile && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              backgroundColor: 'white',
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              <FontAwesomeIcon icon={faBars} style={{ width: '24px', height: '24px' }} />
            </button>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>
              CSS Department
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                {userInfo?.id}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
          </div>
        )}

        {/* Desktop header */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              backgroundColor: 'white',
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
              CSS Department Office Management
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                {userInfo?.id} ({userInfo?.role})
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  color: '#6b7280',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
                title="Logout"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} style={{ width: '16px', height: '16px' }} />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Page content */}
        <main style={{ 
          padding: isMobile ? '16px' : '24px', 
          flex: 1,
          overflow: 'auto',
          minHeight: 0
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
