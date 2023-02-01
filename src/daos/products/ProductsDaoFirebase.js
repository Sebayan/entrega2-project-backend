const admin = require('firebase-admin')
const Container = require('../../containers/containerFirebase')


class Product extends Container {

  async add( doc ) {
    try{
      const db = admin.firestore()
      const res = await db.collection(this.collection).add(doc)
      console.log(`Se ha agregado a la base de datos elemento con id: ${res.id}`)
      return
    } catch(err) {
      console.log(`Error: ${err}`)
      return
    }
  }

  
  async modifyById( id, doc ) {  
    try {
      const db = admin.firestore()
      const ref = db.collection(this.collection).doc(id)
      await ref.update(
        { title: doc.title,
          description: doc.description,
          code: doc.code,
          price: doc.price,
          stock: doc.stock,
          thumbnail: doc.thumbnail
        }
      )
      console.log(`Se ha modificado el elemento con id: ${id}`)
      return
    } catch(err) {
      console.log(`Error: ${err}`)
      return false
    }
  }


}


const products = new Product('products')

module.exports = products