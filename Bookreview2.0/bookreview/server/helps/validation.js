const Joi = require('@hapi/joi');

const authSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(), //.required tekisi pakollisen, otetaan pois hetkeksi
  password: Joi.string().min(5).required()
});

module.exports = {
  authSchema,
};