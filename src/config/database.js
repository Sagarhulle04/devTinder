const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sagarhulle22:sagarhulle22@devtinder.9sm3h.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
