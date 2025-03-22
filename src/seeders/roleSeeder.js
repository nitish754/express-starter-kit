const { readFileSync } = require("fs");
// const { connectToDB } = require("../config/db");
const Role = require("../models/roleSchema");
const path = require("path");

const seedRole = async () => {
    // await connectToDB();

    // clear the roles collection
    await Role.deleteMany({});

    // insert default role and permission 
    const dataPath = path.join(__dirname, '../config/rolePermission.json')
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

    for (role of data) {

        await Role.create({
            name: role.name,
            description: role.description,
            permissions: role.permissions
        })

    }
    console.log('role seeded successfully');

    // process.exit(1);

    

}

module.exports = {
    seedRole
};  // export the function to be used in other files  //  //