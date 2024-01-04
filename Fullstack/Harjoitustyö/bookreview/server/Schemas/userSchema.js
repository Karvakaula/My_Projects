// käyttäjä schema

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  email: { type: String},
  profilePicture: String
});

userSchema.pre('save', async function (next) {
  const user = this;

 
  try {
    // varmistetaan että passwd on muokattu jotta tätä ei kutsuta kaikissa save tapauksissa
    if (user.isModified('password')) {
      const hashedPassword = await bcrypt.hash(user.password, 10); // 10 on salt roundit
      user.password = hashedPassword;
      console.log("hashed passwd" + user.password);
    }
    next();
  } catch (error) {
    return next(error);
  }
});
userSchema.methods.ValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}


const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
 