import React, { createContext, useContext, useState } from 'react';
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from 'axios';

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
    const [ cookies, setCookie, removeCookie ] = useCookies(['token']);
    const [ username, setUsername ] = useState("");

    // sale methods
    const addSale = async (sale) => {
        try {
            const response = await axios.post(`${BASE_URL}/sale/new`, sale)
            const { message, error } = response.data
            if(message){
                handleSuccess(message)
            }
            if(error){
                handleError(error)
            }
        } catch (error) {
            console.log(error)
        }
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
        try {
            const response = await axios.delete(`${BASE_URL}/sale/delete/${id}`)
            const { message } = response.data
            if(message){
                handleSuccess(message)
            }
        } catch (error) {
            console.log(error)
        }
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
        try {
            const response = await axios.post(`${BASE_URL}/product/new`, product)
            const { message, error } = response.data
            if(message){
                handleSuccess(message)
            }
            if(error){
                handleError(error)
            }
        } catch (error) {
            console.log(error)
        }
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
        try {
            const response = await axios.delete(`${BASE_URL}/product/delete/${id}`)
            const { message } = response.data
            if(message){
                handleSuccess(message)
            }
        } catch (error) {
            console.log(error)
        }
        getProducts()
    }

    const totalProducts = () => {
        return prettyNumber(products.length)
    }
    // end product methods
    // employee methods
    const addEmployee = async (employee) => {
        try {
            const response = await axios.post(`${BASE_URL}/employee/new`, employee)
            const { message, error } = response.data;
            if(message){
                handleSuccess(message)
            }
            if (error){
                handleError(error)
            }
        } catch (error) {
            console.log(error)
        }
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
        try {
            const response = await axios.delete(`${BASE_URL}/employee/delete/${id}`)
            const { message } = response.data;
            if(message){
                handleSuccess(message)
            }
        } catch (error) {
            console.log(error)
        }
        getEmployees()
    }

    const totalEmployees = () => {
        return prettyNumber(employees.length)
    }
    // end employee methods
    // authentication methods
    const signup = async (credentials, navigate) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/signup`, credentials, { withCredentials: true })
            const { success, message, token } = data
            if(success){
                handleSuccess(message)
                setCookie('token', token, {
                    path: '/',
                    sameSite: 'Strict'
                })
                setTimeout(() => {
                    navigate('/');
                }, 1000)
            }else{
                handleError(message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const login = async (credentials, navigate) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/login`, credentials, { withCredentials: true });
            const { success, message, token } = data;
            if(success){
                handleSuccess(message);
                setCookie('token', token, {
                    path: '/',
                    httpOnly: false,
                    sameSite: 'Strict'
                })
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }else{
                handleError(message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const verifyCookie = async (navigate, toast, location) => {
        if(!cookies.token){
            if (location.pathname !== '/signup'){
                navigate('/login');
            }
        } else {
            try {
                const { data } = await axios.post(`${BASE_URL}/`, {}, { withCredentials: true });
                const { status, user } = data;
                if(status === false){
                    removeCookie('token')
                    navigate('/login')
                } else {
                    setUsername(user)
                }
            } catch (error) {
                removeCookie('token')
                navigate('/login')
            }
        }
    }

    const logout = (navigate) => {
        removeCookie("token")
        navigate("/login")
    }
    // end authentication methods

    const handleError = (err) =>
        toast.error(err, { position: "bottom-left" }
    );

    const handleSuccess = (msg) =>
        toast.success(msg, { position: "bottom-right" }
    );

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
                totalEmployees,
                signup,
                login,
                logout,
                verifyCookie,
                cookies,
                removeCookie,
                username
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)