const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");

// used to convert json into js object wgen taking req.body from end user
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

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
