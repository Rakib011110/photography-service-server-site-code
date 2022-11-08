const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb');



app.use(cors())
app.use(express.json())


// user : photographyUser
// pass: o7dpw0MlkkkqQ8FT


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.zm1lzl1.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})