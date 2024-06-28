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
            return res.json({ error: "All Fields Required" })
        }
        if(!/^\d+$/.test(productPrice)){
            return res.json({ error: 'Price of Sale must be a number'})
        }
        await sale.save()
        return res.status(200).json({ message: "Sale Added Successfully" })
    } catch (error) {
        return res.status(500).json({ error: error })
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