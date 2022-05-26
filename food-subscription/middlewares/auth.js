/*
     This middleware is responsbile for authentication
     every request using JWT token
*/

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const brearer = bearerHeader.split(" ");
    const brearerToken = brearer[1];
    req.token = brearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = {
  verifyToken,
};
