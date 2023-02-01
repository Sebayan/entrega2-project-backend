const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const productRouter = require('./routes/productRouter')
const cartRouter = require('./routes/cartRouter')

const { products, carts } = require('./daos/generalDaos')


const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))


io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!')

  socket.emit('productos', await products.getAll())
  socket.emit('carritos', await carts.getAll())
 
  socket.on('update', async producto => {
    await products.add( producto )
    io.sockets.emit('productos', await products.getAll())
  })

  socket.on('newCart', async () => {
    socket.emit('carritos', await carts.getAll())
  })
  
})


app.use('/api', productRouter)

app.use('/api', cartRouter)

app.use(function(req, res) {
  res.status(404).send({error: -1, descripcion: 'ruta no implementada'})
})


const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))