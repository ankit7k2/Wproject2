const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors=require('cors')

dotenv.config();

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors())

client.connect().then(() => {
  console.log('Connected to MongoDB');

  // Get all the passwords
  app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json({  result: findResult });
  });

  // Save a password
  app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult });
  });

  // Delete password by ID
  app.delete('/', async (req, res) => 
    { const password = req.body;
       const db = client.db(dbName); 
      const collection = db.collection('documents');
      const findResult = await collection.deleteOne(password) 
      res.send({success:true,result:findResult})
  });

  

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
