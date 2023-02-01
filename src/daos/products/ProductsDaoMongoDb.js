const connectToDd = require('../../DB/config/connectToMongo')
const Container = require('../../containers/containerMongoDb')
const { productModel } = require('../../DB/model/mongoDbModel')


class Product extends Container {

  async add( item ) {
    try{
      await connectToDd()
      const newProduct = new productModel( item )
      await newProduct.save()
        .then(product => console.log(`Se ha agregado a la base de datos elemento con id: ${product._id}`))
        .catch(err => console.log(err))
      return
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

  
  async modifyById( id, item ) {  
    try {
      await connectToDd()
      await this.schema.findOneAndUpdate(
        { _id: id },
        { $set: {...item}})
    } catch(err) {
      console.log(`Error: ${err}`)
      return false
    }
  }


}


const products = new Product( productModel )

module.exports = products