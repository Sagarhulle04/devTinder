const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth.js");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteAllData", (req, res) => {
  res.send("Data deleted successfully");
});

app.get("/users", (req, res) => {
  res.send("Welcome User");
});

app.get("/users/data", userAuth, (req, res) => {
  res.send("You are user and you can see your own data");
});

app.delete("/users/delete", userAuth, (req, res) => {
  res.send("You can delete your data");
});

app.listen(3000, () => {
  console.log("server running at port 3000");
});
