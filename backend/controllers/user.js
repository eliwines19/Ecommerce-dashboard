const UserSchema = require("../models/UserModel");

exports.updateColorTheme = async (req, res) => {
    const { id } = req.params;
    const { colorTheme } = req.body;
    try {
        const user = await UserSchema.findById(id);
        user.colorTheme = colorTheme;
        await user.save();
        return res.status(200).json({ message: "Color Theme Successfully Updated" })
    } catch (error) {
        return res.status(500).json({ Error: error })
    }
}