const Joi = require("joi");

const validateSubscriptionCreate = (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      user_id: Joi.string().required(),
      variation: Joi.string().required(),
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
  validateSubscriptionCreate,
};
