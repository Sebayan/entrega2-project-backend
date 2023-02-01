const mongoose = require('mongoose')
const { Schema, model } = mongoose


const productSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true }
})


const cartSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    products: { type: Array, required: true }
})


const productModel = model('Product', productSchema)
const cartModel = model('Cart', cartSchema)


module.exports = { productModel, cartModel }

