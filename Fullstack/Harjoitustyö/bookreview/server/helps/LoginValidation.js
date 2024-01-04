const Joi = require('@hapi/joi');

const authloginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required()
  //string, vähintään 5merkkiä
});

module.exports = {
  authloginSchema,
};