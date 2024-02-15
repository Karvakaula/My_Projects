


const bcrypt = require('bcrypt');
const User = require('./Schemas/userSchema.js');

async function registerUser(username, password, email) {
    try {
      const newUser = new User({ username, password, email });
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
}

 // Tämä jäi kesken. jatketaan myöhemmin
async function loginUser(username, password) {
    try {
      const user = await User.findOne({ username });
  
      if (!user) {

        throw new Error('Invalid username or password');
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
     
        throw new Error('Invalid username or password');
      }
      return user;
    } catch (error) {
      throw error;
    }
}

module.exports = { registerUser, loginUser};
