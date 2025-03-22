const fs = require('fs');
const path = require('path');
const Role= require('../models/roleSchema.js');
const Permission = require('../models/permissionSchema.js');
// const { connectToDB } = require('../config/db.js');


const seedPermissionInDB = async () => {
    // await connectToDB();
    // Delete all existing roles
    await Role.deleteMany({});
    // Delete all existing permissions
    await Permission.deleteMany({});

    // Read permissions JSON file
    const permissionPath = path.join(__dirname, '../config/permissions.json');
    const permissionData = JSON.parse(fs.readFileSync(permissionPath, 'utf-8'));

    for(module of permissionData){
        for(per of module.permissions){
            const permission = await Permission.create({
                moduleName: module.module_name,
                name : per.name,
                display_name : per.display_name
            })
        }
    }
    
console.log("Permission seeded successfully")
// process.exit(1);
};

module.exports = {
    seedPermissionInDB
};

