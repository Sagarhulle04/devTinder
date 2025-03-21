const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const validateSignUpData = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const user = require("./models/user.js");
const validator = require("validator");

// used to convert json into js object when taking req.body from end user
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // validating the data
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await user.save({});
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("error while saving the user: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    if (!validator.isEmail(email)) {
      throw new Error("mail id should contain @");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }
    res.send("Login Successfull");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (!user) {
      return res.status(400).send("user not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body._id);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(500).send("something went wrong: " + err.message);
  }
});

app.patch("/user/:id", async (req, res) => {
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

    if (data.skills && data.skills.length > 4) {
      throw new Error("Skills cannot be greater than 4");
    }

    await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("something went wrong: " + error.message);
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
    console.log("Database connection failed: " + err.message);
  });
