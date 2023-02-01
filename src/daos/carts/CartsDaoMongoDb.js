const connectToDd = require('../../DB/config/connectToMongo')
const Container = require('../../containers/containerMongoDb')
const { cartModel } = require('../../DB/model/mongoDbModel')


class Cart extends Container {

  async newCart( items ) {
    try{
      await connectToDd()
      const newCart = new cartModel( items )
      await newCart.save()
        .then(cart => console.log(`Se ha agregado a la base de datos elemento con id: ${cart._id}`))
        .catch(err => console.log(err))
      return
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

  async addItem( id, item ) {  
    try{
      await connectToDd()
      await this.schema.findOneAndUpdate(
        { _id: id },
        { $push: { products: item }})
      return
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

  async deleteItem( id, item ) { 
    try{
      await connectToDd()
      await this.schema.findOneAndUpdate(
        { _id: id },
        { $pull: { products: item }})
      return
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

  async getAllItems( id ) {  
    try{
      await connectToDd()
      const cart = await this.schema.find(
        { _id: id },
        { products: 1})
      return cart[0].products
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


}


const carts = new Cart( cartModel )

module.exports = carts