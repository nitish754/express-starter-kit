const mongoose =  require("mongoose");

const modelName = 'Role';


const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    permissions:{
        type : Array,
        default : []
    }
}, {
    timestamps: true
})

roleSchema.methods.getPermissions = async function () {
    return this.permissions;
}

const Role = mongoose.model(modelName, roleSchema);
module.exports = Role;  //export the model so it can be used in other files