import React, { Component, useRef } from 'react';
import LogoImage from '../../components/LogoImage';
import './Login.css'

interface ComponentNameState {
  // Define state properties if needed
  value: string
}

class Login extends Component<{}, ComponentNameState> {
  labelRef: React.RefObject<HTMLLabelElement | null>;
  constructor(props: {}) {
    super(props);
    this.state = {
      // Initialize state properties if needed
      value: ""
    };
    this.labelRef = React.createRef()
  }
  
  handleFocus = () => {
    if (this.labelRef.current) {
      this.labelRef.current.classList.add('text-xs', '-translate-y-5');
    }
  };

  handleBlur = () => {
    if (this.labelRef.current && !this.state.value) {
      this.labelRef.current.classList.remove('text-xs', '-translate-y-5');
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };


  render() {
   return(
        <div className='flex justify-between items-center'>
            <div className='sides flex items-center justify-center' id='logoSide'>
                <LogoImage width={300}/>
            </div>
            <div className='sides w-1/2 flex items-center justify-center min-h-screen bg-white' id='formSide'>
                <div className="inner-fields">
                  <div className='welcome-text content-start text-white'>
                    <h2 className="text-2xl font-semibold mb-6">Hello !</h2>
                    <p>Welcome Back</p>
                  </div>
                  <form className=''>
                    {/* Username Field */}
                    <div className="relative w-full">
                      {/* Input */}
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="input-field"
                        placeholder="username"
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
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="login-btn bg-blue-700 text-white py-2 rounded-md hover:bg-blue-700 transition"
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

export default Login;