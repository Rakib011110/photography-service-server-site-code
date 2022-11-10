const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require("dotenv").config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



app.use(cors())
app.use(express.json())


// user : photographyUser
// pass: o7dpw0MlkkkqQ8FT


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.zm1lzl1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const serviceCollection = client.db("photoGraphy").collection('services')
        const reviewCollection = client.db('photoGraphy').collection('reviews')

        app.get('/', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        });
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });


        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });
        /* ------------------------------------------------------- */



        app.get("/reviwsdata", async (req, res) => {




            let query = {}
            if (req.query.email) {

                query = {
                    email: req.query.email
                }

            }


            const cursor = reviewCollection.find(query)
            const review = await cursor.toArray()
            res.send(review)
        })


        app.post('/reviews', async (req, res) => {

            const review = req.body

            const result = await reviewCollection.insertOne(review)
            res.send(result)

        })

        app.delete("/reviews/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await reviewCollection.deleteOne(query)
            res.send(result)

        })


        app.put("/services/:id", async (req, res) => {
            // const options = { upsert: true };
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await reviewCollection.updateOne(query, options)
            res.send(result)


        })





    }
    finally {


    }



}
run().catch(err => console.error(err))









app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})