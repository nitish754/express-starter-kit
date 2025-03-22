const { Router } = require("express");
const { validateLogin, validateForgotPassword, resetPasswordSchema } = require("./authValidator");
const { Login, forgotPassword, resetPassword } = require("./authController");

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication endpoints
 *
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate user and return token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ernitish1993@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsIn..."
 *       401:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email or password."
 */
router.post('/login', validateLogin, Login);

/**
 * @swagger
 * /auth/send-reset-password-link:
 *   post:
 *     summary: Forgot Password
 *     description: Allows users to request a password reset link by providing their email.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ernitish1993@gmail.com"
 *     responses:
 *       200:
 *         description: Password reset link sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset link has been sent to your email."
 *       400:
 *         description: Validation error or missing email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email address."
 *       404:
 *         description: Email not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email not registered."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong. Please try again later."
 */
router.post('/send-reset-password-link', validateForgotPassword, forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Allows users to reset their password using a valid reset token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: Password reset token received via email.
 *               newPassword:
 *                 type: string
 *                 description: New password for the user.
 *     responses:
 *       200:
 *         description: Password has been successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password has been successfully updated
 *       400:
 *         description: Invalid or expired reset token.
 *       500:
 *         description: Internal server error.
 */

router.post('/reset-password', resetPasswordSchema, resetPassword);


module.exports = router;
