const {ObjectId} = require('mongodb');
const User = require("../models/userSchema");
const Role = require('../models/roleSchema');

const userSeeder = async () => {
    try{
        // delete all users before seeding 
        await User.deleteMany({});
        const role = await Role.findOne({name : 'superadmin'})
        const user = await User.create({
            firstName : 'John',
            lastName : 'Doe',
            email : 'johndoe@gmail.com',
            password : 'password123',
            role : role._id,
            phone : '1234567890',
            tenant : null,
            status : 'Active',
            profileImage : null

        })

        console.log("Superadmin user seeded successfully")
    }catch(error){
        console.error(error);
    }
}

module.exports = {
    userSeeder
}