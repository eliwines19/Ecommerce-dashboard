import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const Login = () => {

  const { setActiveMenu } = useStateContext()
  setActiveMenu(false)

  return (
    <div>Login Page</div>
  )
}

export default Login