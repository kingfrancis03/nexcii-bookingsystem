import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardLayout from './layouts/dashboardlayout';
import Dashboard from './pages/dashboard';
import TruckingRecord from './pages/truckingRecords';
import SystemSettings from './pages/systemSettings';
import BookingSystem from './pages/bookingSystem';
import Login from './pages/login';
import NotFound from './pages/NotFound';

interface AppProps {
  user: any;
  isLoggedIn: boolean;
  role: string;
}

class App extends Component<AppProps> {
  render(): JSX.Element {
    const { isLoggedIn, role } = this.props;

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
            element={role === 'admin' ? (
              <DashboardLayout navTitle="Dashboard">
                <Dashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )}
          />

          <Route
            path="/trucking-records"
            element={role === 'admin' ? (
              <DashboardLayout navTitle="Trucking Records">
                <TruckingRecord />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )}
          />

          <Route
            path="/settings"
            element={role === 'admin'? (
              <DashboardLayout navTitle="System Settings">
                <SystemSettings layout="horizontal" />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* ✅ Booking system now allows admin and user */}
          <Route
            path="/booking-system"
            element={
              isLoggedIn && (role === 'admin' || role === 'user') ? (
                <BookingSystem />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }
}

// ✅ Correct isLoggedIn logic
const mapStateToProps = (state: any) => ({
  user: state.auth.user,
  isLoggedIn: !!state.auth.user,
  role: state.auth.user?.role || '',
});

export default connect(mapStateToProps)(App);
