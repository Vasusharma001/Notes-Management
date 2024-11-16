var jwt = require("jsonwebtoken"); //for verifying
const JWT_SECRET = process.env.JWT_SECRET;
//get the user form the jwt token and add id to req object
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    res.status(401).send({ error: "Please authenticate using a valid token" });
  try {
    //Used to fetch data from token
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    //after execution of fetchuser function just next to it will be called!
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;
