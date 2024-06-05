import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from '../components/Header'
import { useStateContext } from '../contexts/ContextProvider'

const Login = () => {

  const { setActiveMenu, login, currentColor } = useStateContext();
  useEffect(() => {
    setActiveMenu(false);
  })

  const navigate = useNavigate();

  const [inputState, setInputState] = useState({
    email: '',
    password: ''
  })

  const { email, password } = inputState;

  const handleInput = name => e => {
    setInputState({...inputState, [name]: e.target.value})
  }

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = e => {
    e.preventDefault();
    login(inputState, handleError, handleSuccess, navigate);
    setInputState({
      email: '',
      password: ''
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Header category="" title="Login" />
          <div>
            <input
              type="text"
              value={email}
              name="email"
              placeholder="Email"
              onChange={handleInput('email')}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              name="password"
              placeholder="Password"
              onChange={handleInput('password')}
            />
          </div>

          <div className='p-10'>
              <button
                className='text-xl p-3 w-1/3 rounded-xl hover:drop-shadow-xl'
                style={{ backgroundColor: currentColor }}
              >
                Login
              </button>
              <span>
                Don't have an account? <Link to={"/signup"}>Signup</Link>
              </span>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login