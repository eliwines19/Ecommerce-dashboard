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
            return res.status(400).json({Error: 'All fields required'})
        }
        await product.save()
        return res.status(200).json({ message: "Product Created Successfully" })
    } catch (error) {
        return res.status(500).json({ Error: error })
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