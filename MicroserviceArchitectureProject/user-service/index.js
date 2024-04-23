const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001;

const DAuser = require("./DAUser");

// Get all users
app.get("/users", async (req, res) => {
  try {
    console.log("List users request received");
    const users = await DAuser.getUsers();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

// Add a new user
app.post("/users", async (req, res) => {
  try {
    console.log("Add user request received");
    const { username, email } = req.body;
    const newUser = await DAuser.addUser(username, email);
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

// Listen
app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});

process.on("uncaughtException", function (err) {
  console.log(err);
});
