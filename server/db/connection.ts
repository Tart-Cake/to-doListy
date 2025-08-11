import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DATABASE_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // connect the client to the server.
  await client.connect();
  // Send a ping to confirm a successful connection.
  await client.db("Admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (error) {
  console.log(error);
}

let db = client.db("tasks");

export default db;
