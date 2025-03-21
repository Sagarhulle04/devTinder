const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");

// used to convert json into js object when taking req.body from end user
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

app.get("/user", async (req, res) => {
  const userId = req.body._id; // Ensure userId is obtained from request body
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send("user not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body._id);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

app.patch("/user/:id", async (req, res) => {
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "age",
      "password",
      "gender",
      "about",
      "skills",
    ];

    const updateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!updateAllowed) {
      throw new Error("updation failed");
    }

    if (data?.skills.length > 4) {
      throw new Error("Skills cannot be greater than 4");
    }

    await User.findByIdAndUpdate(req.body._id, req.body, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("something went wrong" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(3000, () => {
      console.log("server listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
