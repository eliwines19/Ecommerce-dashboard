import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { FiBarChart } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const EcommerceOverview = () => {

    const { totalSales, totalProducts, totalEmployees } = useStateContext()

    const earningData = [
        {
          icon: <MdOutlineSupervisorAccount />,
          amount: totalEmployees(),
          title: 'Employees',
          iconColor: '#03C9D7',
          iconBg: '#E5FAFB',
          pcColor: 'red-600',
          path: '/employees'
        },
        {
          icon: <BsBoxSeam />,
          amount: totalProducts(),
          title: 'Products',
          iconColor: 'rgb(255, 244, 229)',
          iconBg: 'rgb(254, 201, 15)',
          pcColor: 'green-600',
          path: '/products'
        },
        {
          icon: <FiBarChart />,
          amount: totalSales(),
          title: 'Sales',
          iconColor: 'rgb(228, 106, 118)',
          iconBg: 'rgb(255, 244, 229)',
          pcColor: 'green-600',
          path: '/sales'
        }
    ];

    return (
        <>
            {earningData.map((item) => (
                <NavLink
                    to={item.path}
                    key={item.title}
                >
                    <div
                        key={item.title}
                        className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md: w-56 p-4  rounded-2xl text-center"
                    >
                        <button
                            type="button"
                            style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                        >
                            {item.icon}
                        </button>
                        <p className="mt-3">
                            <span className="text-lg font-semibold">
                                {item.amount}
                            </span>
                            <span className={`text-sm text-${item.pcColor} ml-2`}>
                                {item.percentage}
                            </span>
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            {item.title}
                        </p>
                    </div>
                </NavLink>
            ))}
        </>
    )
}

export default EcommerceOverview