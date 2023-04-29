const app = require("./app");
const cors = require("cors");
const port = 8000;
const User = require("./mongo");
app.use(cors());

//get api for frontend page.......

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    users,
    message: "data get succussfull",
  });
});

//create a new data,.....

const writeData = async (newData) => {
  const existingUser = await User.findOne({ username: newData.username });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const user = new User({
    username: newData.username,
    password: newData.password,
  });
  await user.save();
};

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    await writeData({ username, password });

    res.status(200).json({
      username,
      message: "Registration successful!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

//delete data from mongodb..........

app.delete("/users/:_id", async (req, res) => {
  const userToDelete = req.params._id;
  try {
    const result = await User.deleteOne({ _id: userToDelete });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// app listen....................

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
