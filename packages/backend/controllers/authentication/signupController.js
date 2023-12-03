const { createSecretToken } = require("../../util/secretToken");
const logger = require("pino")();
const User = require("../../models/userModel");

// Credit: @ https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
// Any further modifications and errors are mine and mine alone.

// SIGN UP CONTROLLER
module.exports.signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;

    // Check that the user does not already exist
    const existingUser = await User.findOne({ email });

    // Check if the user exists
    if (existingUser) {
      return res.json({ message: "User already exists." });
    }

    // Create a new user
    const user = await User.create({ email, password, username, createdAt });

    // Create a secret token
    const token = createSecretToken(user._id);

    // Save the user token
    // Credit: @ https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
    user.token = token;

    // Indicate that the action was a success
    res.status(201).json({
      message: "User signed in successfully.",
      success: true,
      token: token,
    });
    next();
  } catch (error) {
    logger.error(error);
  }
};
