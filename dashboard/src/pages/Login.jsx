import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SiShopware } from 'react-icons/si'
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

  const handleSubmit = e => {
    e.preventDefault();
    login(inputState, navigate);
    setInputState({
      email: '',
      password: ''
    })
  }

  return (
    <div className="flex justify-center items-center bg-slate-900 w-screen h-screen">
      <div className="text-white p-10 bg-slate-800 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <div>
            <p className="text-3xl flex gap-3 font-extrabold mb-5">
              <SiShopware /> <span>Ecommerce Dashboard</span>
            </p>
            <p className="text-xl font-extrabold tracking-right mb-5">
              Sign in to your account
            </p>
            <div>
              <label>Email</label>
              <input
                className="w-full p-2 bg-slate-700 rounded-lg my-2"
                type="text"
                value={email}
                name="email"
                placeholder="name@company.com"
                onChange={handleInput('email')}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                className="w-full p-2 bg-slate-700 rounded-lg my-2"
                type="password"
                value={password}
                name="password"
                placeholder="Password"
                onChange={handleInput('password')}
              />
            </div>

            <div className='py-5'>
              <button
                className='text-xl p-3 w-full rounded-xl hover:drop-shadow-xl bg-blue-500 hover:bg-blue-700'
              >
                Login
              </button>
            </div>
            <div>
              <div>Don't have an account? <span className="text-blue-500 hover:underline"><Link to={"/signup"}>Signup</Link></span></div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login