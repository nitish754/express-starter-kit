const User = require("../../models/userSchema");
const { RESET_PASSWORD_CONST } = require("./authConfig");
const { Mail } = require('../../services/MailGunEmailService');
const path = require('path');
const { loginUser, sendPasswordResetLink, updatePassword } = require("./authService");

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);

        res.json(result);

    } catch (err) {
        console.error('Error while login:', err);
        return res.status(500).json({ message: "Internal Server Error" });  // ✅ Use `return`
    }
};


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await sendPasswordResetLink(email);

        res.json(result);

    } catch (error) {
        console.error('Error while forgot password:', error);
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const result = await updatePassword(token,newPassword)

        res.json(result);
    } catch (err) {
        console.error('Error while reset password:', err);
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

module.exports = {
    Login,
    forgotPassword,
    resetPassword
}