const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/kdweb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("Users", userSchema);

module.exports = User;

// const { MongoClient } = require("mongodb");
// const url = "mongodb://localhost:27017";
// const database = "kdweb";
// const client = new MongoClient(url);

// async function getData() {
//   const result = await client.connect();
//   const db = result.db(database);
//   const collection = db.collection("data");
//   const response = await collection.find().toArray();
//   console.log(response);
// }
// getData();
