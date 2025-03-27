const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const validateSignUpData = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth.js");

// used to convert json into js object when taking req.body from end user
app.use(express.json());
app.use(cookieparser());

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

    if (isPasswordCorrect) {
      const token = await jwt.sign({ _id: user._id }, process.env.private_key, {
        expiresIn: "7d",
      });

      res.cookie("token", token);

      return res.send("Login Successfull");
    }
    throw new Error("Invalid Credentials");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " sending the connection request");
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
