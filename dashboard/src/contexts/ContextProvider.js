import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/v1'

const StateContext = createContext()

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false
}

export const ContextProvider = ({ children }) => {
    const [ activeMenu, setActiveMenu ] = useState(true)
    const [ isClicked, setIsClicked ] = useState(initialState)
    const [ screenSize, setScreenSize ] = useState(undefined)
    const [ currentColor, setCurrentColor ] = useState('#03C9D7')
    const [ currentMode, setCurrentMode ] = useState('Light')
    const [ themeSettings, setThemeSettings ] = useState(false)
    const [ employees, setEmployees ] = useState([])
    const [ products, setProducts ] = useState([])
    const [ sales, setSales ] = useState([])

    // sale methods
    const addSale = async (sale) => {
        const response = await axios.post(`${BASE_URL}/sale/new`, sale)
        .catch((error) => {
            console.log(error)
        })
        getSales()
    }

    const getSales = async () => {
        const response = await axios.get(`${BASE_URL}/sales`)
        .catch((error) => {
            console.log(error)
        })
        setSales(response.data)
    }

    const deleteSale = async (id) => {
        const response = await axios.delete(`${BASE_URL}/sale/delete/${id}`)
        .catch((error) => {
            console.log(error)
        })
        getSales()
    }

    const totalEarnings = () => {
        let total = 0;
        sales.forEach((sale) => {
            total += sale.productPrice
        })
        return prettyNumber(total)
    }

    const totalSales = () => {
        return prettyNumber(sales.length)
    }

    const salesSortedByDate = () => {
        let sorted = sales.sort((a, b) => {
            var dateA = new Date(a.date)
            var dateB = new Date(b.date)
            return dateB - dateA
        })
        return sorted
    }

    const recentSales = () => {
        return salesSortedByDate().slice(0, 5)
    }
    // end sale methods
    // product methods
    const addProduct = async (product) => {
        const response = await axios.post(`${BASE_URL}/product/new`, product)
        .catch((error) => {
            console.log(error)
        })
        getProducts()
    }

    const getProducts = async () => {
        const response = await axios.get(`${BASE_URL}/products`)
        .catch((error) => {
            console.log(error)
        })
        setProducts(response.data)
    }

    const deleteProduct = async (id) => {
        const response = await axios.delete(`${BASE_URL}/product/delete/${id}`)
        .catch((error) => {
            console.log(error)
        })
        getProducts()
    }

    const totalProducts = () => {
        return prettyNumber(products.length)
    }
    // end product methods
    // employee methods
    const addEmployee = async (employee) => {
        const response = await axios.post(`${BASE_URL}/employee/new`, employee)
        .catch((error) => {
            console.log(error)
        })
        getEmployees()
    }

    const getEmployees = async () => {
        const response = await axios.get(`${BASE_URL}/employees`)
        .catch((error) => {
            console.log(error)
        })
        setEmployees(response.data)
    }

    const deleteEmployee = async (id) => {
        const response = await axios.delete(`${BASE_URL}/employee/delete/${id}`)
        .catch((error) => {
            console.log(error)
        })
        getEmployees()
    }

    const totalEmployees = () => {
        return prettyNumber(employees.length)
    }
    // end employee methods

    const currentYear = new Date().getUTCFullYear()

    const prettyNumber = (number) => {
        return number.toLocaleString();
    }

    const setMode = (e) => {
        setCurrentMode(e.target.value)
        localStorage.setItem('themeMode', e.target.value)
    }

    const setColor = (color) => {
        setCurrentColor(color)
        localStorage.setItem('colorMode', color)
    }

    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true})
    }

    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                currentColor,
                setCurrentColor,
                currentMode,
                setCurrentMode,
                themeSettings,
                setThemeSettings,
                setMode,
                setColor,
                initialState,
                currentYear,
                sales,
                addSale,
                getSales,
                deleteSale,
                totalSales,
                recentSales,
                salesSortedByDate,
                totalEarnings,
                products,
                addProduct,
                getProducts,
                deleteProduct,
                totalProducts,
                employees,
                addEmployee,
                getEmployees,
                deleteEmployee,
                totalEmployees
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)