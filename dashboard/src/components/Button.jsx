import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { NavLink } from 'react-router-dom'

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, nav, path }) => {

  const { setIsClicked, initialState } = useStateContext()

  {
    if(!!nav){
      return (
        <NavLink
          to={path}
        >
          <button
            type="button"
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
          >
            {icon} {text}
          </button>
        </NavLink>
      )
    }
  }

  return (
    <button
      type="button"
      onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  )
}

export default Button