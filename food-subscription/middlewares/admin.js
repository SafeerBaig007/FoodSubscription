// const Joi = require('joi');
const adminModel = require("../models").Admin;
const Joi = require("joi");

/*
     This controller is responbile for vaidating
     either the requested user is admin or not.
*/
const validateAdmin = async (req, res, next) => {
  try {
    console.log("adminmiddleware", req.body);
    let admin = await adminModel.findOne({
      where: { email: req.body.email },
    });
    if (admin) next();
    else
      return res.status(400).json({
        success: false,
        msg: "You do not have permission to perform this action.",
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  validateAdmin,
};
