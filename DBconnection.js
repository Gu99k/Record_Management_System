const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
// =====================MySQL Database Connection======================

const URL = process.env.MONGO_URL;
const connectedDB = async () => {
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(URL).then();
    console.log(`Mongodb connected ${mongoose.connection.host}`);
  } catch (error) {
    // Send a ping to confirm a successful connection
    console.log(`Mongodb Server Issue ${error}`);
  }
};

module.exports = connectedDB;
