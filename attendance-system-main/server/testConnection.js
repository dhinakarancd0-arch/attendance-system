const { MongoClient } = require("mongodb");
require("dotenv").config();

async function connectDB() {
  console.log(process.env.MONGODB_URI);

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log("✅ Connected Successfully");
    await client.db("admin").command({ ping: 1 });
    console.log("🏓 Ping Successful");
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

connectDB();