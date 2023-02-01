const admin = require('firebase-admin')


const getCollectionRef = (collection) => {
  try{
    const db = admin.firestore()
    return db.collection(collection)
  } catch(err) {
    console.log(`Error: ${err}`)
  }

}

const firebase2mongoDb = ( firebaseArray ) => { 
  const mongodbArray = []
  firebaseArray.forEach( ele => {
    mongodbArray.push({_id: ele.id, ...ele.data()})
  })
  return mongodbArray
}



class Container {

  constructor( collection ) {
      this.collection = collection
  }
  

  async getAll() {
    try{
      const allItems = await getCollectionRef(this.collection).get()
      return firebase2mongoDb(allItems)
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }
 

  async getById( id ) {
    try {
      const doc = await getCollectionRef(this.collection).doc(id).get()
      if (!doc.exists) {
        console.log('No existe esa id!')
      } else {
        return [doc.data()]
      }
      return null

    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  deleteById( id ) {  
    try {
      getCollectionRef(this.collection).doc(id).delete()
      return 
    } catch(err) {
      console.log(`Error: ${err}`)
      return false
    }
  }


  async deleteAll() {
    try {
      getCollectionRef(this.collection).get().then( query => {
        query.forEach( doc => { doc.ref.delete()})
      })
      return 
    } catch(err) {
      console.log(`Error: ${err}`)
      return false
    }
  }

}


module.exports = Container