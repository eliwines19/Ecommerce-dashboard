const { addEmployee, getEmployees, deleteEmployee } = require('../controllers/employee')
const { addProduct, getProducts, deleteProduct } = require('../controllers/product')
const { addSale, getSales, deleteSale } = require('../controllers/sale')
const { signup, login } = require('../controllers/auth')

const router = require('express').Router()

router.post('/employee/new', addEmployee)
    .get('/employees', getEmployees)
    .delete('/employee/delete/:id', deleteEmployee)
    .post('/product/new', addProduct)
    .get('/products', getProducts)
    .delete('/product/delete/:id', deleteProduct)
    .post('/sale/new', addSale)
    .get('/sales', getSales)
    .delete('/sale/delete/:id', deleteSale)
    .post('/signup', signup)
    .post('/login', login)

module.exports = router