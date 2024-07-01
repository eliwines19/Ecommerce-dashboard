const UserSchema = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        if(!email || !password){
          return res.json({ message: "All fields required" })
        }
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
          return res.json({ message: "Email already in use" });
        }
        const user = await UserSchema.create({ email, password, username });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          path: '/',
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
    // validatioms
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
    // validatioms
    const token = createSecretToken(user._id)
    res.cookie("token", token, {
      path: '/',
      secure: true,
      // withCredentials: true,
      httpOnly: true,
      sameSite: 'None'
    })
    res.status(201).json({ message: "User logged in successfully", success: true, token })
    next()
  } catch (error) {
    console.error(error)
  }
}