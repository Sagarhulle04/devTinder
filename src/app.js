const express = require("express");

const app = express();

app.get("/profile", (req, res) => {
  res.send({ firstName: "Sagar", lastName: "Hulle" });
});

app.post("/profile", (req, res) => {
  res.send("Data saved successfully in the database");
});

app.delete("/profile", (req, res) => {
  res.send("Data deleted successfully from the database");
});

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("server running at port 3000");
});
