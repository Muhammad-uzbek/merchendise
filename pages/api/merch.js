// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize('postgres://legofrrk:mlEX_RRJs5fW2WLGco2JfnEA5rFZiarr@tiny.db.elephantsql.com/legofrrk');
import { MongoClient } from "mongodb";
const client = new MongoClient('mongodb+srv://someoniy:uzbeK2003@cluster0.ry32y.mongodb.net/merchendise?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default async function handler(req, res) {
  // access allow origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if(req.method == 'POST') {
    await client.connect();
    req.dbClient = client;
    req.db = client.db('merchendise');
    const collection = req.db.collection('merchendisers');
    // check if req body is json, if not, parse it
    const result = await collection.insertOne(req.body);
    return res.status( 200 ).json({
        result
    });
  }
  else{
    await client.connect();
    const db = client.db("merchendise");
    const collection = db.collection("merchendisers");
    const merchs = await collection.find(req.body).toArray();
    res.status(200).json(merchs);
  }
}