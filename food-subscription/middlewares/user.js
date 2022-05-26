const Joi = require("joi");

/*
     This middleware is responsible for validating
     user login request.
*/
const validateUserLogin = (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(30).required(),
    });
    const result = schema.validate(req.body);
    if (result.error == null)
      //means valid
      next();
    else
      return res.status(400).json({
        success: false,
        msg: result.error.details.map((i) => i.message).join(","),
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const validateUserCreate = (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string()
        .regex(/^[a-zA-Z ]*$/)
        .min(3)
        .max(30)
        .required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(30).required(),
      role: Joi.string().required(),
      contact: Joi.string().required(),
    });
    const result = schema.validate(req.body);
    if (result.error == null)
      //means valid
      next();
    else
      return res.status(400).json({
        success: false,
        msg: result.error.details.map((i) => i.message).join(","),
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const validateUserUpdate = (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string()
        .regex(/^[a-zA-Z ]*$/)
        .min(3)
        .max(30)
        .optional(),
    });
    const result = schema.validate(req.body);
    if (result.error == null) next();
    else
      return res.status(400).json({
        success: false,
        msg: result.error.details.map((i) => i.message).join(","),
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const validateUserDelete = (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      user_id: Joi.number().required(),
    });
    const result = schema.validate(req.body);
    if (result.error == null)
      //means valid
      next();
    else
      return res.status(400).json({
        success: false,
        msg: result.error.details.map((i) => i.message).join(","),
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  validateUserLogin,
  validateUserCreate,
  validateUserUpdate,
  validateUserDelete,
};
