import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids'
import { eGrid } from '../data/dummy'
import { Header } from '../components'
import { NavLink } from 'react-router-dom'

import { useStateContext } from '../contexts/ContextProvider'

const Employees = () => {

  const { currentColor, employees } = useStateContext()

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <div className='flex justify-between'>
        <Header category="Page" title="Employees" />
        <NavLink to='/employee/new' className='flex justify-center items-center hover:border border-black' style={{ backgroundColor: currentColor }}>
          <button className='p-5 text-xl flex text-white'>
            Add Employee <FaPlus />
          </button>
        </NavLink>
      </div>
      <GridComponent
        width="auto"
        dataSource={employees}
        allowPaging
        allowSorting
        allowResizing
        toolbar={['Search']}
      >
      <ColumnsDirective>
        {eGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
      <Inject services={[Page, Search, Toolbar]} />
    </GridComponent>
  </div>
  )
}

export default Employees