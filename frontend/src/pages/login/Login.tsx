import React, { Component, ChangeEvent, FormEvent } from 'react';
import { login } from '../../store/authSlice';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import LogoImage from '../../components/LogoImage';
import LoadingModal from '../../components/LoadingModal';
import ErrorModal from '../../components/ErrorModal';
import './Login.css'

interface ComponentNameState {
  // Define state properties if needed
  username: string
  password: string
}

class Login extends Component<{}, ComponentNameState> {
  labelRef: React.RefObject<HTMLLabelElement | null>;
  constructor(props: {}) {
    super(props);
    this.state = {
      // Initialize state properties if needed
      username: '',
      password: '',
    };
    this.labelRef = React.createRef()
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  render() {
    const { user, loading, error } = this.props;

    if (user?.role === 'admin') {
      return <Navigate to="/dashboard" />;
    } else if (user?.role === 'user') {
      return <Navigate to="/booking" />;
    }

    return(
        <div className='flex justify-between items-center'>
        { loading ? <LoadingModal message="Logging in..."/> : null }
        { error ? <ErrorModal error={error}/>: null }
            <div className='sides flex items-center justify-center' id='logoSide'>
                <LogoImage width={300}/>
            </div>
            <div className='sides w-1/2 flex items-center justify-center min-h-screen bg-white' id='formSide'>
                <div className="inner-fields">
                  <div className='welcome-text content-start text-white'>
                    <h2 className="text-2xl font-semibold mb-6">Hello !</h2>
                    <p>Welcome Back</p>
                  </div>
                  <form className='' onSubmit={this.handleSubmit}>
                    {/* Username Field */}
                    <div className="relative w-full">
                      {/* Input */}
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.username}
                        className="input-field"
                        placeholder="username"
                        onChange={this.handleChange}
                      />
                    </div>


                    {/* Password Field */}
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        className="input-field"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="login-btn cursor-pointer bg-blue-700 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Login
                    </button>
                  </form>

                  {/* Forgot Password */}
                  <div className="mt-5 text-center">
                    <a href="#" className="frgt-btn">
                      Forgot password?
                    </a>
                  </div>
              </div>
            </div>
        </div>
   )
  }
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, { login })(Login);
