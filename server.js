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
        const query = { username: { $in: idRemove } };
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

app.get('/tablesubject/:id', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        db.collection('tableSubject').findOne({ "_id": new ObjectId(req.params.id) }, function (err, result) {
            res.json({ data: result })
            client.close();
        })
    })
})

app.get('/tablesubject', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        db.collection('tableSubject').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json({ data: result })
            client.close();
        });
    })
})

app.post('/tablesubject', (req, res) => {
    mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        const newSubject = {
            id: req.body.id,
            name: req.body.name,
            nameTeacher: req.body.nameTeacher,
            day: req.body.day,
            timeStart: req.body.timeStart,
            timeEnd: req.body.timeEnd,

        };
        //console.log(newSubject)
        db.collection('tableSubject').insertOne(newSubject, (err, result) => {
            if (err) throw err
            client.close()
            res.json({ status: true })
        })
    })
})

app.patch('/tablesubject/', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        console.log('Connected successfully to server');
        const db = client.db(dbName)
        console.log(req.body._id)
        const EditSubject = {
            id: req.body.id,
            name: req.body.name,
            nameTeacher: req.body.nameTeacher,
            day: req.body.day,
            timeStart: req.body.timeStart,
            timeEnd: req.body.timeEnd,

        };
        db.collection("tableSubject").update({ _id: new ObjectId(req.body._id) }, EditSubject, function (err, result) {
            if (err) throw err;
            console.log(EditSubject)
            res.json({ status: true })
            client.close();
        });
    })
})

app.post('/tablesubject/delete', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        var idRemove = []
        req.body.forEach(function (item) {
            idRemove.push(new ObjectId(item))
        })
        const query = { _id: { $in: idRemove } }
        console.log(query)
        db.collection('tableSubject').deleteMany(query, (err, obj) => {
            if (err) throw err;
            console.log("document deleted")
            res.json({ data: obj })
            client.close();
        });
    })
})

app.get('/incres', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        db.collection('builds').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json({ data: result })
            client.close();
        });
    })
})

app.get('/getroom', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        db.collection('builds').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json({ data: result })
            client.close();
        });
    })
})

app.post('/addroom', (req, res) => {
    mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        const newRoom = {
            build: req.body.build,
            room: req.body.room,
            sit: req.body.sit,
            status: req.body.status,
        };
        //console.log(newSubject)
        db.collection('builds').insertOne(newRoom, (err, result) => {
            if (err) throw err
            client.close()
            res.json({ status: true })
        })
    })
})

app.post('/deleteroom', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        var idRemove = []
        req.body.forEach(function (item) {
            idRemove.push(new ObjectId(item))
        })
        const query = { _id: { $in: idRemove } }
        console.log(query)
        db.collection('builds').deleteMany(query, (err, obj) => {
            if (err) throw err;
            console.log("document deleted")
            res.json({ data: obj })
            client.close();
        });
    })
})

app.patch('/editroom/', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        console.log('Connected successfully to server');
        const db = client.db(dbName)
        console.log(req.body._id)
        const editRoom = {
            build: req.body.build,
            room: req.body.room,
            sit: req.body.sit,
            status: req.body.status,
        };
        db.collection("builds").update({ _id: new ObjectId(req.body._id) }, editRoom, function (err, result) {
            if (err) throw err;
            console.log(editRoom)
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