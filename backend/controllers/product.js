const ProductSchema = require('../models/ProductModel')

exports.addProduct = async (req, res) => {
    const { img, name, price } = req.body

    const product = ProductSchema({
        img,
        name,
        price
    })

    try {
        //validations
        if(!img || !name || !price){
            return res.json({ error: "All Fields Required" })
        }
        if(!/^\d+$/.test(price)){
            return res.json({ error: "Price of Product must be a number" })
        }
        await product.save()
        return res.status(200).json({ message: "Product Added Successfully" })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await ProductSchema.find().sort()
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ Error: error })
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params

    ProductSchema.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "Product Deleted Successfully" })
        })
        .catch((error) => {
            res.status(500).json({ Error: error })
        })
}