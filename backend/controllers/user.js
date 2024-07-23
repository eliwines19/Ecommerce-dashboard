const UserSchema = require("../models/UserModel");

exports.getColorTheme = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserSchema.findById(id)
        return res.status(200).json({ colorTheme: user.colorTheme })
    } catch (error) {
        return res.status(500).json({ Error: error })
    }
}