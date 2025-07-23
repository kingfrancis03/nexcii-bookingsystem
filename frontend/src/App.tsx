import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardLayout from './layouts/dashboardlayout'
import Dashboard from './pages/dashboard';
import BookingSystem from './pages/bookingSystem';
import Login from './pages/login';
import NotFound from './pages/NotFound'; // <--- new import

// Props coming from Redux store
interface AppProps {
  user: any;
  isLoggedIn: boolean;
}

class App extends Component<AppProps> {
  render(): JSX.Element {
    const { isLoggedIn, user } = this.props;
    const role = user.role
    const getRedirectPath = (isLoggedIn: boolean, role: string) => {
    if (!isLoggedIn) return '/login';
    if (role === 'admin') return '/dashboard';
    if (role === 'user') return '/booking-system';

    return '/login';
  };

    return (
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Navigate to={getRedirectPath(isLoggedIn, role)} replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={role === 'admin' || role === 'user' ? (
              <DashboardLayout navTitle='Dashboard'>
                <Dashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )}
          />
          <Route
            path="/trucking-records"
            element={role === 'admin' || role === 'user' ? (
              <DashboardLayout navTitle='Trucking Records'>
                Trucking Records
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )}
          />
          <Route
            path="/settings"
            element={role === 'admin' || role === 'user' ? (
              <DashboardLayout navTitle='System Settings'>
                System-Settings
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )}
          />
          <Route
            path="/booking-system"
            element={role === 'user' ? <BookingSystem /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }
}

// Map Redux state to props
const mapStateToProps = (state: any) => ({
  user: state.auth.user,
  isLoggedIn: !state.auth.user,
  role: state.auth.user?.role || '',
});

// Connect and export
export default connect(mapStateToProps)(App);
