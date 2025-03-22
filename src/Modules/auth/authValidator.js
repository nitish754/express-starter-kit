const Joi = require('joi');
const User = require('../../models/userSchema');

// Login Schema
const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address'
        })
        .external(async (value) => {
            const user = await User.findOne({ email: value });
            if (!user) {
                const error = new Joi.ValidationError('Email is not registered');
                error.details = [{ message: 'Email is not registered' }];
                throw error;
            }
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long'
        })
});

// Forgot Password Schema
const forgotPasswordSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address'
        })
        .external(async (value) => {
            const user = await User.findOne({ email: value });
            if (!user) {
                const error = new Joi.ValidationError('Email is not registered');
                error.details = [{ message: 'Email is not registered' }];
                throw error;
            }
        })
});

// reset password schema

const resetPasswordSchema = Joi.object({
    newPassword: Joi.string().required().messages({
        'string.empty': 'Password is required'
    }),
    token: Joi.string().required().messages({
        'string.empty': 'Token is required'
    })
        .external(async (value) => {
            const user = await User.findOne({
                resetPasswordToken: value,
                resetPasswordExpires: { $gt: Date.now() }
            });
            if (!user) {
                const error = new Joi.ValidationError('Invalid token');
                error.details = [{ message: 'Invalid token' }];
                throw error;
            }
        })
})

// Validation Middleware
const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({ errors: error.details.map(err => err.message) });
        }
        console.error(error); // Log unexpected errors for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Exporting validation middlewares
module.exports = {
    validateLogin: validateRequest(loginSchema),
    validateForgotPassword: validateRequest(forgotPasswordSchema),
    resetPasswordSchema: validateRequest(resetPasswordSchema)
};
