import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const Signup = () => {

  const { setActiveMenu } = useStateContext()
  setActiveMenu(false)

  return (
    <div>Signup Page</div>
  )
}

export default Signup