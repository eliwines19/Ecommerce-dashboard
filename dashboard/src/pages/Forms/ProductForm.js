import React, { useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { Header } from '../../components'

const ProductForm = () => {

  const { addProduct, currentColor } = useStateContext()

  const [ inputState, setInputState ] = useState({
    img: '',
    name: '',
    price: ''
  })

  const { img, name, price } = inputState

  const handleInput = name => e => {
    setInputState({...inputState, [name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    addProduct(inputState)
    setInputState({
      img: '',
      name: '',
      price: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className='justify-center text-center'>

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
        <Header category="" title="New Product" />

        <div className='flex justify-center'>
          <div className='input-control'>
            <input
              className='p-2 m-5 border-b-2 border-gray-500'
              type="text"
              value={name}
              name={'name'}
              placeholder='Product Name'
              onChange={handleInput('name')}
            />
          </div>
          <div className='input-control'>
            <input
              className='p-2 m-5 border-b-2 border-gray-500'
              type="text"
              value={img}
              name={'img'}
              placeholder='Link to Image'
              onChange={handleInput('img')}
            />
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='input-control'>
            <input
              className='p-2 m-5 border-b-2 border-gray-500'
              type="text"
              value={price}
              name={'price'}
              placeholder='Product Price'
              onChange={handleInput('price')}
            />
          </div>
        </div>

        <div className='p-10'>
          <button
            className='text-xl p-3 w-1/3 rounded-xl hover:drop-shadow-xl'
            style={{ backgroundColor: currentColor }}
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  )
}

export default ProductForm