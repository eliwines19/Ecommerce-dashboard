const SaleSchema = require('../models/SaleModel')

exports.addSale = async (req, res) => {
    const { productName, productPrice, date, customerName, customerEmail, customerPhoneNumber, customerCountry } = req.body

    const sale = SaleSchema({
        productName,
        productPrice,
        date,
        customerName,
        customerEmail,
        customerPhoneNumber,
        customerCountry
    })

    try {
        //validations
        if(!productName || !productPrice || !date || !customerName || !customerEmail || !customerPhoneNumber || !customerCountry){
            return res.status(400).json({Error: 'All fields required'})
        }
        if(productPrice <= 0 || !productPrice === 'number'){
            return res.status(400).json({message: 'Price of Sale must be a positive number!'})
        }
        await sale.save()
        return res.status(200).json({ message: "Sale Created Successfully" })
    } catch (error) {
        return res.status(500).json({ Error: error })
    }
}

exports.getSales = async (req, res) => {
    try {
        const sales = await SaleSchema.find().sort()
        return res.status(200).json(sales)
    } catch (error) {
        return res.status(500).json({ Error: error })
    }
}

exports.deleteSale = async (req, res) => {
    const { id } = req.params

    SaleSchema.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "Sale Deleted Successfully" })
        })
        .catch((error) => {
            res.status(500).json({ Error: error })
        })
}