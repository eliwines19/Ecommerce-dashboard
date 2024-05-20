import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids'
import { productsGrid } from '../data/dummy'
import { Header } from '../components'
import { NavLink } from 'react-router-dom'

import { useStateContext } from '../contexts/ContextProvider'

const Products = () => {

  const { currentColor, products } = useStateContext()

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <div className='flex justify-between'>
        <Header category="Page" title="Products" />
        <NavLink to='/product/new' className='flex justify-center items-center hover:border border-black' style={{ backgroundColor: currentColor }}>
          <button className='p-5 text-xl flex text-white'>
            Add Product <FaPlus />
          </button>
        </NavLink>
      </div>
      <GridComponent
        width="auto"
        id="gridcomp"
        dataSource={products}
        allowPaging
        allowSorting
        allowResizing
        toolbar={['Search']}
      >
        <ColumnsDirective>
          {productsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  )
}

export default Products