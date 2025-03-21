const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please enter both firstName and lastName");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not correct");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

module.exports = validateSignUpData;
