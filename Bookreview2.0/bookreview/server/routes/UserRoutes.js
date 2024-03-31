const express = require("express");
const router = express.Router();
const User = require("../Schemas/userSchema.js");
const fs = require("fs");
const path = require("path");

//const userController = require('../usercontrols.js');
const createError = require("http-errors");
const { authSchema } = require("../helps/validation.js");
const { signAccesstoken } = require("../helps/jwt_helper.js");
const { authloginSchema } = require("../helps/LoginValidation.js");

router.get("/image-endpoints", (req, res) => {
  try {
    // Read the files in the 'images' directory
    fs.readdir(path.join(__dirname, "../images"), (err, files) => {
      if (err) {
        throw err;
      }

      // Filter out directories and return only filenames
      const imageEndpoints = files.filter((file) =>
        fs.statSync(path.join(__dirname, "../images", file)).isFile()
      );
      console.log(imageEndpoints);
      // Send the list of image filenames as a response
      res.json(imageEndpoints);
    });
  } catch (error) {
    console.error("Error fetching image endpoints:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/register", async (req, res, next) => {
  try {
    // body tulee validatesync funktion läpi, tarkistaa että kaikki vaadittavat kentät löytyy
    const result = await authSchema.validateAsync(req.body);
    console.log(result.username);

    // tarkistetaan käyttäjänimi ettei ole jo olemassa
    const doesUsernameExist = await User.findOne({ username: result.username });
    console.log("doesexist?", doesUsernameExist);
    if (doesUsernameExist) {
      throw createError.Conflict(`${result.username} is already in use`);
    }

    /* Tarkistetaan emailin olemassa olo
        const doesEmailExist = await User.findOne({ email: result.email });
        if (doesEmailExist) {
            throw createError.Conflict(`${result.email} is already in use`);
            
        }
*/
    const newuser = new User(result);

    const savedUser = await newuser.save();
    const accessToken = await signAccesstoken(savedUser.id);
    res.json({ user: savedUser, accessToken });
    console.log(savedUser + " tallennettu ");
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    // tarkastetaan body validateAsyncillä
    const result = await authloginSchema.validateAsync(req.body);
    const user = await User.findOne({ username: result.username });
    if (!user) throw createError.NotFound("User not registerd");
    console.log("user", user);
    // tarkistetaan salasanan vastaavuus. kutsutaan methodia user schemasta.
    const isMatch = await user.ValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized("Username/password not valid");
    // luodaan tokeni kutsumalla signaccesstoken functiota
    const accessToken = await signAccesstoken(user.id);
    console.log(result);
    console.log("usname:", user.username);
    const username = user.username;
    const pic = user.profilePicture;
    const userId = user.id;
    console.log("userid", userId);
    res.json({ accessToken, username, userId });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid username or password"));
    next(error);
  }
});

router.get("/usercheck/:username", function (req, res) {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) {
      console.log(err);
    }
    var message;
    if (user) {
      console.log(user);
      message = "user exists";
      console.log(message);
    }
    res.json({ message: message });
  });
});

module.exports = router;
