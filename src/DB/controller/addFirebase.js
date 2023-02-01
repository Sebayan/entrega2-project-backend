const admin = require('firebase-admin')
const Timestamp = require('firebase-admin/firestore')

const connectToDd = require('../config/connectToFirebase.js')


const create = async () => {
  await connectToDd()

  const db = admin.firestore()

  const data = {
    "title": "TV 50",
    "description": "Smart Samsung",
    "code": 394,
    "price": 35000,
    "stock": 12,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_tv_48px-256.png",

  }

  const res = await db.collection('products').add(data)

  console.log(res.id)

  
  const snapshot = await db.collection('products').get()
  const arra = []
  snapshot.forEach( ele => {
    arra.push({_id: ele.id, ...ele.data()})
  })

  console.log(arra)
  console.log('-----------------------------------')





}

create()