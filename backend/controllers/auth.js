const UserSchema = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
          return res.json({ message: "User already exists" });
        }
        const user = await UserSchema.create({ email, password, username });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });
        res.status(201).json({ message: "User signed in successfully", success: true, user, token });
        next();
      } catch (error) {
        console.error(error);
      }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      return res.json({ message: "All fields required" })
    }
    const user = await UserSchema.findOne({ email })
    if(!user){
      return res.json({ message: "Incorrect email or password" })
    }
    const auth = await bcrypt.compare(password, user.password)
    if(!auth){
      return res.json({ message: "Incorrect email or password" })
    }
    const token = createSecretToken(user._id)
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true
    })
    res.status(201).json({ message: "User logged in successfully", success: true, token })
    next()
  } catch (error) {
    console.error(error)
  }
}