const connectToDd = require('../DB/config/connectToMongo')

class Container {

  constructor( schema ) {
      this.schema = schema
  }
  

  async getAll() {
    try{
      await connectToDd()
      const documentsInDb = await this.schema.find()
      return documentsInDb
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }
 


  async getById( id ) {
    try {
      await connectToDd()
      const documentInDb = await this.schema.find({_id: id})
      return documentInDb ? documentInDb : null

    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async deleteById( id ) {  
    try {
      await connectToDd()
      await this.schema.deleteOne({ _id: id })
      return 
    } catch(err) {
      console.log(`Error: ${err}`)
      return false
    }
  }


  async deleteAll() {
    try {
      await connectToDd()
      await this.schema.deleteMany()
      return 
    } catch(err) {
      console.log(`Error: ${err}`)
      return false
    }
  }

}


module.exports = Container