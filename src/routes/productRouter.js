const express = require('express')
const { Router } = express  
const productRouter = Router() 

const { products } = require('../daos/generalDaos')
const user = require('../permissions/user')
const useMongoDb = require('../permissions/dataBaseUse')


productRouter.get('/productos', async (req, res) => {
  const allProducts = await products.getAll()
  res.json( allProducts )
})

productRouter.get('/productos/:id', async (req, res) => {
  const id = req.params.id
  const product = await products.getById( id )
  product ? res.json( product )
    : res.status(404).send({ error: 'producto no encontrado'})
})

productRouter.post('/productos', async (req, res) => {
  if (user.administrador){
    const productToAdd = req.body
    await products.add( productToAdd )
    res.redirect('/')
  
  } else {
    res.status(403).send({error: -1, descripcion: 'ruta /productos metodo POST no autorizado'})
  }
})


productRouter.put('/productos/:id', async (req, res) => {
  if (user.administrador){
    const id = req.params.id
    const productToModify = req.body
    let allProducts = await products.getAll()

    let index

    useMongoDb.useMongoDb ? 
    index = allProducts.findIndex( item => item.id === id ) :
    index = allProducts.findIndex( item => item._id === id )

    if ( index !== -1 ) {
      await products.modifyById( id, productToModify )
      res.send({ productToModify })
    } else {
      console.log('no se encontro producto')
      res.status(404).send({ error: 'id no valido'})
    }
  } else {
    res.status(403).send({error: -1, descripcion: 'ruta /productos/id metodo PUT no autorizado'})
  }

})


productRouter.delete('/productos/:id', async (req, res) => {
  if (user.administrador){
    const id = req.params.id
    const productToDelete = await products.getById( id )

    if (productToDelete) {
      await products.deleteById( id )
      res.send({ borrado: productToDelete})
    
    } else {
      res.status(404).send({ error: 'producto no encontrado'})
    }
  
  } else {
    res.status(403).send({error: -1, descripcion: 'ruta /productos/id metodo DELETE no autorizado'})
  }
  
})


module.exports = productRouter