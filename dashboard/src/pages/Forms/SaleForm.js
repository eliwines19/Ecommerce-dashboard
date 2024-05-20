import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStateContext } from '../../contexts/ContextProvider';
import { Header } from '../../components';

const SaleForm = () => {

  const { addSale, currentColor } = useStateContext()

  const [ inputState, setInputState ] = useState({
    productName: '',
    productPrice: '',
    date: '',
    customerName: '',
    customerEmail: '',
    customerPhoneNumber: '',
    customerCountry: ''
  })

  const { productName, productPrice, date, customerName, customerEmail, customerPhoneNumber, customerCountry } = inputState

  const handleInput = name => e => {
    setInputState({...inputState, [name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    addSale(inputState)
    setInputState({
      productName: '',
      productPrice: '',
      date: '',
      customerName: '',
      customerEmail: '',
      customerPhoneNumber: '',
      customerCountry: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className='justify-center text-center'>

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
        <Header category="" title="New Sale" />

        <div className='flex justify-center'>
          <div className='input-control'>
            <input
              className='p-2 m-5 border-b-2 border-gray-500'
              type="text"
              value={productName}
              name={'productName'}
              placeholder='Name of Product'
              onChange={handleInput('productName')}
            />
          </div>
          <div className='input-control'>
            <input
              className='p-2 m-5 border-b-2 border-gray-500'
              type="text"
              value={productPrice}
              name={'productPrice'}
              placeholder='Price of Product'
              onChange={handleInput('productPrice')}
            />
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='input-control'>
            <DatePicker
              className='p-2 m-5 border-b-2 border-gray-500'
              id='date'
              placeholderText='Date of Sale'
              selected={date}
              dateFormat='dd/MM/yyyy'
              onChange={(date) => {
                  setInputState({...inputState, date: date})
              }}
            />
          </div>
          <div className='input-control'>
            <input
              className='p-2 m-5 border-b-2 border-gray-500'
              type="text"
              value={customerName}
              name={'customerName'}
              placeholder='Customer Name'
              onChange={handleInput('customerName')}
            />
          </div>
        </div>
        
        <div className='flex justify-center'>
          <div className='input-control'>
            <input
              className='p-2 m-5 border-b-2 border-gray-500'
              type="text"
              value={customerEmail}
              name={'customerEmail'}
              placeholder='Customer Email'
              onChange={handleInput('customerEmail')}
            />
          </div>
          <div className='input-control'>
            <input
              className='p-2 m-5 border-b-2 border-gray-500'
              type="text"
              value={customerPhoneNumber}
              name={'customerPhoneNumber'}
              placeholder='Customer Phone Number'
              onChange={handleInput('customerPhoneNumber')}
            />
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='input-control'>
              <input
                className='p-2 m-5 border-b-2 border-gray-500'
                type='text'
                value={customerCountry}
                name={'customerCountry'}
                placeholder='Customer Country'
                onChange={handleInput('customerCountry')}
              />
          </div>
        </div>

        <div className='p-10'>
          <button
            className='text-xl p-3 w-1/3 rounded-xl hover:drop-shadow-xl'
            style={{ backgroundColor: currentColor }}
          >
            Add Sale
          </button>
        </div>
      </div>
    </form>
  )
}

export default SaleForm