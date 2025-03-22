const { model, Schema, ObjectId } = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../Modules/auth/authConfig");
const Role = require("./roleSchema");

const modelName = 'User'

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        role: {
            type: ObjectId,
            ref: "Role", // Reference to role with permissions
            required: true,
        },
        tenant: {
            type: ObjectId,
            ref: "Tenant", // Reference to the tenant (company)
            required: false,
            default: null
        },
        status: {
            type: String,
            enum: ["Active", "Inactive", "Pending", "Suspended"],
            default: "Active",
        },
        profileImage: {
            type: String, // URL or file path for the profile picture
            default: null,
        },
        createdBy: {
            type: ObjectId,
            ref: "User", // User who created this account (Company Admin or Superadmin),
            default: null
        },
        resetPasswordToken: {
            type: String,
            default: null
        },
        resetPasswordExpires: {
            type: Date,
            default: null
        },

    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = async function () {
    const role = await Role.findById(this.role);
    return jwt.sign({
        _id: this._id,
        name: `${this.firstName} ${this.lastName}`,
        email: this.email,
        role: this.role,
        tenant: this.tenant,
        permissions: role.permissions,

    }, JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN, algorithm: 'HS256' }
    )
}

userSchema.methods.generateRestToken = function (){
    const randString= crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(randString).digest('hex');
    return tokenHash;
}

userSchema.methods.getName = function (){
    return `${this.firstName} ${this.lastName}`;
}

const User = model(modelName, userSchema);

module.exports = User; // Export the User model