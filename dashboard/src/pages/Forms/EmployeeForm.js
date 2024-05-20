import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStateContext } from '../../contexts/ContextProvider';
import { Header } from '../../components';

const EmployeeForm = () => {

  const { addEmployee, currentColor } = useStateContext()

  const [ inputState, setInputState ] = useState({
    name: '',
    country: '',
    jobTitle: '',
    hireDate: ''
  })

  const { name, country, jobTitle, hireDate } = inputState

  const handleInput = name => e => {
    setInputState({...inputState, [name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    addEmployee(inputState)
    setInputState({
      name: '',
      country: '',
      jobTitle: '',
      hireDate: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className='justify-center text-center'>

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
        <Header category="" title="New Employee" />

        <div className='flex justify-center'>
          <div className='input-control'>
            <input
              className='p-2 m-5 border-b-2 border-gray-500'
              type="text"
              value={name}
              name={'name'}
              placeholder='Employee Name'
              onChange={handleInput('name')}
            />
          </div>
          <div className='input-control'>
            <input
              className='p-2 m-5 border-b-2 border-gray-500'
              type='text'
              value={country}
              name={'country'}
              placeholder='Country'
              onChange={handleInput('country')}
            />
          </div>
        </div>


        <div className='flex justify-center'>
          <div className='input-control'>
            <input
              className='p-2 m-5 border-b-2 border-gray-500'
              type="text"
              value={jobTitle}
              name={'jobTitle'}
              placeholder='Job Title'
              onChange={handleInput('jobTitle')}
            />
          </div>
          <div className='input-control'>
            <DatePicker
              className='p-2 m-5 border-b-2 border-gray-500'
              id='hireDate'
              placeholderText='Hire Date'
              selected={hireDate}
              dateFormat='dd/MM/yyyy'
              onChange={(hireDate) => {
                  setInputState({...inputState, hireDate: hireDate})
              }}
            />
          </div>
        </div>

        <div className='p-10'>
          <button
            className='text-xl p-3 w-1/3 rounded-xl hover:drop-shadow-xl'
            style={{ backgroundColor: currentColor }}
          >
            Add Employee
          </button>
        </div>
      </div>
    </form>
  )
}

export default EmployeeForm