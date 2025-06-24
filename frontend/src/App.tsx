import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';

interface AppState {
  count: number;
  isLoggedIn: boolean;
  role: string;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0,
      isLoggedIn: false,
      role: 'admin'
    };
  }

  handleIncrement = (): void => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render(): JSX.Element {
    return (
      <>
       <Router basename='/'>
          <Routes>
            <Route
              path="/"
              element={
                this.state.isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={ <Login /> }
            />
            <Route
              path="/dashboard"
              element={
                this.state.role === 'admin' ? <Dashboard /> : <Navigate to="/" />
              }
            />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
