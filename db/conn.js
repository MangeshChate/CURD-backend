const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
// mongoose.set(‘strictQuery’, true) 
require('dotenv').config({ path: './config.env' })
const ATLAS_URL = process.env.ATLAS_URL

// mongodb connect
const conn = mongoose
  .connect(ATLAS_URL)
  .then(() => {
    console.log('DataBase Connected .')
  })
  .catch((e) => {
    console.log('Error in Conecction !' + e)
  })

module.exports = conn;