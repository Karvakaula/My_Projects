const Joi = require('@hapi/joi');

const authloginSchema = Joi.object({
  username: Joi.string().min(5).required(),
  password: Joi.string().min(5).required()
  //string, vähintään 5merkkiä
});

module.exports = {
  authloginSchema,
};