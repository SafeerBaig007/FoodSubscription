const userModel = require("../models").Users;


const validateUserExist = async (req, res, next) => {
    const user = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      req.user = user;
      next();
    } else res.json({status:400, error:"Invalid credentials!"});
  };

  module.exports = {validateUserExist}