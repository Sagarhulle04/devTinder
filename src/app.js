const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Virendra",
    lastName: "Sehwag",
    age: 48,
    gender: "Male",
    password: "virendra@sehwag",
    email: "virendra@sehwag.com",
  });

  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    console.log("error while saving the user");
  }
});

connectDB()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(3000, () => {
      console.log("server listening on port 3000");
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });
