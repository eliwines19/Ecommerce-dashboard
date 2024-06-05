import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from '../components/Header'
import { useStateContext } from '../contexts/ContextProvider'

const Signup = () => {

  const { setActiveMenu, signup, currentColor } = useStateContext()
  useEffect(() => {
    setActiveMenu(false)
  })

  const navigate = useNavigate();

  const [ inputState, setInputState ] = useState({
    email: '',
    username: '',
    password: ''
  })

  const { email, password, username } = inputState;

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
    e.preventDefault()
    signup(inputState, handleError, handleSuccess, navigate)
    setInputState({
      email: '',
      username: '',
      password: ''
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Header category="" title="Create An Account" />
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
              type="text"
              value={username}
              name="username"
              placeholder="Username"
              onChange={handleInput('username')}
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
                Signup
              </button>
              <span>
                Already have an account? <Link to={"/login"}>Login</Link>
              </span>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup