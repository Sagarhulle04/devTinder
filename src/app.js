const express = require("express");

const app = express();

app.get("/profile", (req, res) => {
  res.send({ firstName: "Sagar", lastName: "Hulle" });
});

app.use(
  "/users",
  (req, res, next) => {
    console.log("Middleware Running");
    res.send("Response 1");
    next();
  },
  (req, res, next) => {
    console.log("Middleware Running 2");
    res.send("Response 2");
    next();
  }
);

app.listen(3000, () => {
  console.log("server running at port 3000");
});
