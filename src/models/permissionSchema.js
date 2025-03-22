// const mongoose = require('mongoose')
const { model, Schema } = require("mongoose");

const modelName = 'Permission'
const permissionSchema = new Schema(
    {
        name: { type: String, required: true , unique:true },
        display_name : {type : String, required : true},
        moduleName : {type: String, required: true},
        description: { type: String, default: null },
    },
    {
        timestamps:true
    }
)

const Permission = model(modelName,permissionSchema)

module.exports = Permission;