import { MongoClient } from "mongodb";
const client = new MongoClient('mongodb+srv://someoniy:uzbeK2003@cluster0.ry32y.mongodb.net/merchendise?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default async function handler(req, res) {
  if(req.method == 'POST') {
    await client.connect();
    req.dbClient = client;
    req.db = client.db('merchendise');
    const collection = req.db.collection('locations');
    console.log(req.body);
    const result = await collection.insertOne(req.body);
    return res.status( 200 ).json(result);
  }
  else{
    await client.connect();
    const db = client.db("merchendise");
    const collection = db.collection("locations");
    const merchs = await collection.find(req.body).toArray();
    res.status(200).json(merchs);
  }
}
