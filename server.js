const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb://admin:a123456@ds213896.mlab.com:13896/ooad'
const dbName = 'ooad';
const app = express()
const port = 4001
// const functions = require("firebase-functions")
app.use(bodyParser.json())
app.use(cors({ origin: true }))

app.post('/login', (req, res) => {
    mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        db.collection('users').findOne({ username: req.body.username }, (err, result) => {
            if (result !== null) {
                res.send(result)
            } else {
                res.send(result)
                client.close();
            }
        });

    });
})

app.post('/settinguser', (req, res) => {
    mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        db.collection('users').findOne({ username: req.body.username }, (err, result) => {
            if (result === null) {
                const newUser = {
                    name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    password: req.body.password,
                    types: req.body.types,
                    email: req.body.email,
                    age: req.body.age,
                    address: req.body.address,
                    tumbon: req.body.tumbon,
                    aumpher: req.body.aumpher,
                    city: req.body.city,
                    post: req.body.post
                };
                db.collection('users').insertOne(newUser, (err, result) => {
                    if (err) throw err
                    client.close()
                    res.json({ status: true })
                })
            } else {
                res.json({ status: false })
                client.close()
            }
        });
    });
})

app.get('/getdata', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        db.collection('users').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json({ data: result })
            client.close();
        });
    })
})

app.get('/getdata/:id', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        db.collection('users').findOne({ "_id": new ObjectId(req.params.id) }, function (err, result) {
            res.json({ data: result })
            client.close();
        })
    })
})

app.post('/deletedata', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        console.log("delete")
        const idRemove = req.body
        const query = { username: { $in: idRemove} };
        console.log(query)
        db.collection('users').deleteMany(query, (err, obj) => {
            if (err) throw err;
            console.log("1 document deleted")
            res.json({ data: obj })
            client.close();
        });
    })
})

app.patch('/getdata', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        console.log('Connected successfully to server');
        const db = client.db(dbName)
        const dataUpdate = {
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            password: req.body.password,
            types: req.body.types,
            email: req.body.email,
            age: req.body.age,
            address: req.body.address,
            tumbon: req.body.tumbon,
            aumpher: req.body.aumpher,
            city: req.body.city,
            post: req.body.post
        };
        db.collection("users").update({ username: req.body.username }, dataUpdate, function (err, result) {
            if (err) throw err;
            //console.log(result)
            res.json({ status: true })
            client.close();
        });
    })
})

app.listen(port, () => {
    console.log(`App listening on ${port}`)
})

// const api = functions.https.onRequest((request, response) => {
//     if (!request.path) {
//       request.url = `/${request.url}` // prepend '/' to keep query params if any
//     }
//     return api(request, response)
//   })
//   module.exports = {
//     api
//   }