const User = require("../../models/userSchema");
const { Mail } = require("../../services/MailGunEmailService");
const { RESET_PASSWORD_CONST } = require("./authConfig");
const path = require('path')
const {sendRestPasswordLinkJob, testProcessReportJob} = require('../../queue/queueJobs')

const loginUser = async (email, password) => {
    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid Email address");
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        throw new Error("Invalid Password");
    }

    // Generate JWT token safely
    const token = await user.generateToken();
    if (!token) throw new Error("Failed to generate token");

    return {
        message: 'Login success',
        token
    }

}

const sendPasswordResetLink = async (email) => {
    const user = await User.findOne({ email });
    const resetToken = user.generateRestToken();
    const resetTokenExpiresIn = Date.now() + RESET_PASSWORD_CONST.RESET_PASSWORD_TOKEN_EXPIRES_IN_MIN;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiresIn;

    // update in users 
    await user.save();

    // structure reset password link
    const resetPasswordLink = `${RESET_PASSWORD_CONST.FRONTEND_URL}/reset-password/${resetToken}`;
    const templatePath = path.join(__dirname, "./views/emails", `ResetPassword.hbs`);

    // Add email task to the queue
    await sendRestPasswordLinkJob.add({
        to: email,
        subject: "Reset Your Password",
        templatePath,
        context: { name: user.getName(), resetLink: resetPasswordLink },
    });

    // process second job
    await testProcessReportJob.add({
        name : 'Report name'
    })

    // setImmediate(async () =>{
    //     try {
    //         console.log("sending email in queue")
    //         const emailService = Mail.CreateEmail();
    //         await emailService.sendTemplateEmail(
    //             RESET_PASSWORD_CONST.FROM_EMAIL,
    //             email,
    //             "Reset Your Password",
    //             templatePath,
    //             { name: user.getName(), resetLink: resetPasswordLink }
    //         );
    //         console.log(`Email sent to ${email}`);
    //     } catch (error) {
    //         console.error('Failed to send email:', error);
    //     }
    // })

    // // Create email service instance
    // const emailService = Mail.CreateEmail();
    // // Send password reset email
    // const mail = await emailService.sendTemplateEmail(
    //     RESET_PASSWORD_CONST.FROM_EMAIL,
    //     email,
    //     "Reset Your Password",
    //     templatePath,
    //     { name: user.getName(), resetLink: resetPasswordLink }
    // );
    // if (!mail) {
    //     throw new Error("Failed to send password reset email");
    // }
    return {
        message: 'Password reset link sent successfully'
    }
}

const updatePassword = async (token, password) => {
    // fetch users by token requested 
    const user = await User.findOne({ resetPasswordToken: token });
    user.password = password;

    user.save();

    return {
        message: 'Password reset successfully'
    }
}



module.exports = {
    loginUser,
    sendPasswordResetLink,
    updatePassword
}