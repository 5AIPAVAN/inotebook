//importing function connectToMongo from db.js file (located in same folder:-'./db)
const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') // added while combining frontend,backend vid-65
connectToMongo();


//hello world program from express.js official website docs

const app = express()
const port = 3000

app.use(cors())
//include this to use req.body(this middle ware is required)
app.use(express.json())
// app.use(express.urlencoded({ extended: true })); // For URL-encoded data

//     Available routes
//     INSTEAD OF WRITING ROUTES HERE AS,
//       app.get('/', (req, res) => {
//         res.send('Hello Saipavan!')
//      })
//      USE app.use('/home' , require('./routes/home.js')) 
//     Where home.js is in routes folder


// All routes written in routes folder are linked here using app.use()
// Available routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
