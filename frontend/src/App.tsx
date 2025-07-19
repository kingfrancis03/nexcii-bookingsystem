import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './pages/dashboard';
import Login from './pages/login';

// Props coming from Redux store
interface AppProps {
  user: any;
  isLoggedIn: boolean;
}

class App extends Component<AppProps> {
  render(): JSX.Element {
    const { isLoggedIn, user } = this.props;
    const role = user.role
    
    return (
      <Router basename="/">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={role === 'admin' ? <Dashboard /> : <Navigate to="/" />}
          />

          <Route
            path="/booking"
            element={role === 'user' ? <Dashboard /> : <Navigate to="/" />}
          />
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
