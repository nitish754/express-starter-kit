const { Schema, model,ObjectId } = require("mongoose");

const modelName = 'Tenant'

const tenantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        domain: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            zipCode: String,
        },
        industry: {
            type: String,
            trim: true,
        },
        logo: {
            type: String, // URL or file path to the company's logo
            default: null,
        },
        subscription: {
            plan: {
                type: String, // Free, Basic, Premium, Enterprise
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
            status: {
                type: String, // Active, Expired, Cancelled
                enum: ["Active", "Expired", "Cancelled"],
                default: "Active",
            },
        },
        companyAdmin: {
            type: ObjectId,
            ref: "User", // Reference to the user assigned as Company Admin
            required: true,
        },
        status: {
            type: String,
            enum: ["Active", "Inactive", "Pending", "Suspended"],
            default: "Pending",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // The Superadmin who created the tenant
            required: true,
        },
    },
    { timestamps: true }
)

const Tenant = model(modelName, tenantSchema);

module.exports = Tenant;





