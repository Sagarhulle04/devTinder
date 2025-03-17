const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  !isAdminAuthorized ? res.status(401).send("Unauthorized Admin") : next();
};

const userAuth = (req, res, next) => {
  const token = "sagar";
  const isUserAuthorized = token === "sagar";
  !isUserAuthorized ? res.status(401).send("Unauthorized User") : next();
};

module.exports = { adminAuth, userAuth };
