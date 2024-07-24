const UserSchema = require("../models/UserModel");

exports.updateColorTheme = async (req, res) => {
    const { id } = req.params;
    const { colorTheme } = req.body;
    try {
        if(!colorTheme){
            return res.json({ error: 'No Color Theme Provided' })
        }
        const user = await UserSchema.findById(id);
        if(!user){
            return res.json({ error: "No user found. Refresh the page and try again" })
        }
        user.colorTheme = colorTheme;
        await user.save();
        return res.status(200).json({ message: "Color Theme Successfully Updated" })
    } catch (error) {
        return res.status(500).json({ Error: error })
    }
}