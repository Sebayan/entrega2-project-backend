const admin = require('firebase-admin')
const Container = require('../../containers/containerFirebase')



class Cart extends Container {

  async newCart( doc ) {
    try{
      const db = admin.firestore()
      const res = await db.collection(this.collection).add(doc)
      console.log(`Se ha agregado a la base de datos carrito con id: ${res.id}`)
      return
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

  async addItem( id, item ) {  
    try{
      const db = admin.firestore()
      const docRef = db.collection(this.collection).doc(id)
      docRef.get()
        .then( doc => {
          docRef.update({ products: [...doc.get('products'), item]})
        })
      return
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

  async deleteItem( id, item ) { 
    try{
      const db = admin.firestore()
      const docRef = db.collection(this.collection).doc(id)
      docRef.update({
        products: admin.firestore.FieldValue.arrayRemove(item)
      })
      return
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

  async getAllItems( id ) {  
    try{
      const db = admin.firestore()
      const docRef = db.collection(this.collection).doc(id)
      let array
      await docRef.get()
        .then( doc => {
          array = doc.get('products')
        })
     return array
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


}


const carts = new Cart('carts')

module.exports = carts